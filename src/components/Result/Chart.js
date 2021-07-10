import React from "react";
import PropTypes from "prop-types";
import { Bar, Pie } from "react-chartjs-2";
import styled from "styled-components";

import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));

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
    const classes = useStyles();

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
                if (
                    data.labels[i] === ans.answer[0] ||
                    (data.labels[i] === "Khác" && ans.answer[0])
                ) {
                    data.datasets[i]++;
                }
            }
        });
    } else if (question.questionType === "checkbox") {
        question.options.forEach((option) => {
            data.labels.push(option.optionText ? option.optionText : "Khác");
            data.backgroundColor.push(random_bg_color());

            data.datasets.push(0);
        });

        question.answers.forEach((ans) => {
            for (var i = 0; i < data.datasets.length; i++) {
                for (var j = 0; j < ans.answer.length; j++) {
                    if (
                        data.labels[i] === ans.answer[j] ||
                        (data.labels[i] === "Khác" && ans.answer[j])
                    ) {
                        data.datasets[i]++;
                    }
                }
            }
        });
    }

    // kiem tra do dai chu
    for (var i = 0; i < data.datasets.length; i++) {
        data.labels[i] =
            data.labels[i].length > 25
                ? data.labels[i].slice(0, 25) + "..."
                : data.labels[i];
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

            <Answers>
                {question.questionType === "checkbox" ? (
                    <>
                        <CountAns>Các câu trả lời</CountAns>
                        <Bar
                            data={{
                                labels: data.labels,
                                datasets: [
                                    {
                                        label: "Số câu trả lời",
                                        // label: "",
                                        backgroundColor: data.backgroundColor,
                                        data: data.datasets,
                                        borderWidth: 1,
                                        borderColor: "rgb(0 0 0 / 70%)",
                                    },
                                ],
                            }}
                            options={{
                                legend: { display: false },
                            }}
                        />
                    </>
                ) : question.questionType === "radio" ? (
                    <>
                        <CountAns>Các câu trả lời</CountAns>
                        <div
                            style={{
                                width: "80%",
                                margin: "auto",
                            }}
                        >
                            <Pie
                                data={{
                                    labels: data.labels,
                                    datasets: [
                                        {
                                            label: "Số câu trả lời",
                                            // label: "",
                                            backgroundColor:
                                                data.backgroundColor,
                                            data: data.datasets,
                                            borderWidth: 1,
                                            borderColor: "rgb(0 0 0 / 70%)",
                                        },
                                    ],
                                }}
                                options={{
                                    legend: { display: false },
                                    indexAxis: "y",
                                }}
                            />
                        </div>
                    </>
                ) : (
                    <>
                        <div className={classes.root}>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography className={classes.heading}>
                                        <CountAns>Các câu trả lời</CountAns>
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        {question.answers.map((answer, j) => {
                                            if (answer.answer[0]) {
                                                return (
                                                    <Text key={j}>
                                                        {j + 1}.{" "}
                                                        {answer.answer[0]}
                                                    </Text>
                                                );
                                            }
                                        })}
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        </div>
                    </>
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
