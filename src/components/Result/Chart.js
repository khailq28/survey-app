import React from "react";
import PropTypes from "prop-types";
import { Bar } from "react-chartjs-2";
import styled from "styled-components";

Chart.propTypes = {
    index: PropTypes.number,
    question: PropTypes.object,
};

const random_bg_color = () => {
    var x = Math.floor(Math.random() * 256);
    var y = Math.floor(Math.random() * 256);
    var z = Math.floor(Math.random() * 256);

    return "rgb(" + x + "," + y + "," + z + ")";
};

function Chart(props) {
    const { index, question } = props;
    console.log(question.answers);

    var data = {
        labels: [],
        datasets: [],
        backgroundColor: [],
    };

    if (question.questionType === "radio") {
        question.options.forEach((option) => {
            data.labels.push(option.optionText ? option.optionText : "Khác");
            data.backgroundColor.push(random_bg_color());
            data.datasets.push(0);
        });

        question.answers.forEach((ans) => {
            for (var i = 0; i < data.datasets.length; i++) {
                if (data.labels[i] === ans.answer[0]) {
                    data.datasets[i]++;
                }
            }
        });
    }

    return (
        <Box>
            <Question>
                {index + 1}. {question.questionText}{" "}
                {question.required === true ? (
                    <span style={{ color: "red" }}>* (Bắt buộc)</span>
                ) : (
                    ""
                )}
            </Question>
            <CountAns>{question.answers.length} câu trả lời</CountAns>

            <Answers>
                {question.questionType === "checkbox" ? (
                    ""
                ) : question.questionType === "radio" ? (
                    <Bar
                        data={{
                            labels: data.labels,
                            datasets: [
                                {
                                    // label: "Đếm",
                                    label: "",
                                    backgroundColor: data.backgroundColor,
                                    data: data.datasets,
                                },
                            ],
                        }}
                        options={{
                            legend: { display: false },
                            indexAxis: "y",
                        }}
                    />
                ) : (
                    question.answers.map((answer, j) => (
                        <Text key={j}>
                            {j + 1}. {answer.answer[0]}
                        </Text>
                    ))
                )}
            </Answers>
        </Box>
    );
}

const Box = styled.div`
    background-color: white;
    border-radius: 6px;
    padding: 25px 20px;
    width: 750px;
    box-shadow: 0 0 0 2px rgb(0 0 0 / 20%), 0 0 0 rgb(0 0 0 / 25%);
    margin-top: 10px;

    @media (max-width: 768px) {
        width: 90vw;
        margin-left: auto;
        margin-right: auto;
    }
`;

const Question = styled.div`
    text-transform: capitalize;
    font-weight: 600;
    word-wrap: break-word;
`;

const CountAns = styled.div`
    font-size: 14px;
    font-weight: 400;
    word-wrap: break-word;
    color: var(--icon-color);
    padding: 5px 0;
`;

const Answers = styled.div`
    padding: 10px 0;
`;

const Text = styled.div`
    word-wrap: break-word;
    white-space: pre-wrap;
    font-size: 15px;
    padding: 2px;
`;

export default Chart;
