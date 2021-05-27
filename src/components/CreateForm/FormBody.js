import React, { useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import {
    // Paper,
    Typography,
} from "@material-ui/core";
import PropTypes from "prop-types";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import QuestionBody from "./QuestionBody";
import QuestionFooter from "./QuestionFooter";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { addQuestion, copyQuestion, deleteQuestion } from "../../actions";

FormBody.propTypes = {
    questions: PropTypes.array,
    addQuestion: PropTypes.func,
    copyQuestion: PropTypes.func,
    deleteQuestion: PropTypes.func,
};

FormBody.defaultProps = {
    questions: null,
    addQuestion: null,
    copyQuestion: null,
    deleteQuestion: null,
};

const mapStateToProps = (state) => {
    return {
        questions: state.survey.questions,
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        addQuestion: () => {
            dispatch(addQuestion());
        },

        copyQuestion: (index) => {
            dispatch(copyQuestion(index));
        },

        deleteQuestion: (index) => {
            dispatch(deleteQuestion(index));
        },
    };
};

function FormBody(props) {
    let [questions, setQuestions] = useState(props.questions);
    let questionUI = questions.map((question, index) => {
        return (
            <Form key={index} show={question.open ? "true" : "false"}>
                <Accordion
                    // onChange={() => {
                    //     handleExpand(i);
                    // }}
                    expanded={question.open}
                >
                    <CustomAccordionSummary
                        aria-controls="panel1a-content"
                        elevation={1}
                        status={!question.open ? "false" : "true"}
                    >
                        {!question.open ? (
                            <SaveQuestion>
                                <CustomTypography>
                                    {index + 1}. {question.questionText}
                                </CustomTypography>

                                {question.options.map((op, j) => (
                                    <ListOption key={j}>
                                        {question.options[j].other ? (
                                            <CustomFormControlLabel
                                                disabled
                                                control={
                                                    <input
                                                        type={
                                                            question.questionType
                                                        }
                                                        color="primary"
                                                        style={{
                                                            marginRight: "10px",
                                                        }}
                                                        required={question.type}
                                                    />
                                                }
                                                label={
                                                    <CustomTypographyOption>
                                                        <span id="other">
                                                            Mục khác
                                                        </span>
                                                    </CustomTypographyOption>
                                                }
                                            />
                                        ) : (
                                            <CustomFormControlLabel
                                                disabled
                                                control={
                                                    <input
                                                        type={
                                                            question.questionType
                                                        }
                                                        color="primary"
                                                        style={{
                                                            marginRight: "10px",
                                                        }}
                                                        required={question.type}
                                                    />
                                                }
                                                label={
                                                    <CustomTypographyOption>
                                                        {
                                                            question.options[j]
                                                                .optionText
                                                        }
                                                    </CustomTypographyOption>
                                                }
                                            />
                                        )}
                                    </ListOption>
                                ))}
                            </SaveQuestion>
                        ) : (
                            ""
                        )}
                    </CustomAccordionSummary>

                    {/* <QuestionBox index={index} /> */}

                    {/* {question.options.map((option, j) => (
                        <QuestionBody
                            key={j}
                            question={question}
                            option={option}
                        />
                    ))} */}

                    <QuestionBody index={index} />

                    <QuestionFooter
                        index={index}
                        handleCopyQuestion={() => handleCopyQuestion(index)}
                        handleDeleteQuestion={() => handleDeleteQuestion(index)}
                    />
                </Accordion>
            </Form>
        );
    });

    let handleAddQuestion = () => {
        let questionsTemp = [...questions];
        questionsTemp.push({
            questionText: "",
            questionType: "text",
            options: [{ optionText: "" }],
            open: true,
            required: false,
        });
        setQuestions(questionsTemp);
        props.addQuestion();
    };

    let handleCopyQuestion = (index) => {
        let questionsTemp = [...questions];
        questionsTemp.push(questionsTemp[index]);
        setQuestions(questionsTemp);
        props.copyQuestion(index);
    };

    let handleDeleteQuestion = (index) => {
        let questionsTemp = [...questions];
        questionsTemp.splice(index, 1);
        setQuestions(questionsTemp);
        props.deleteQuestion(index);
    };

    return (
        <div>
            <CustomAddCircleOutlineIcon onClick={handleAddQuestion} />
            {questionUI}
        </div>
    );
}

const CustomAddCircleOutlineIcon = styled(AddCircleOutlineIcon)`
    color: var(--icon-color);
    font-size: 45px !important;
    cursor: pointer;
    z-index: 10;
    position: fixed;
    top: 113px !important;
    right: 325px !important;
    box-shadow: 0 0 0 1px rgb(0 0 0 / 20%), 0 0 0 rgb(0 0 0 / 25%);
    border-radius: 8px;
    background-color: #cee3f6;

    &:hover {
        color: var(--basic-color);
    }

    @media (max-width: 768px) {
        top: 60px !important;
        right: 10px !important;
        font-size: 35px !important;
    }
`;

const Form = styled.div`
    background-color: white;
    border-radius: 8px;
    padding: 10px;
    text-transform: capitalize;
    width: 750px;
    box-shadow: 0 0 0 1px rgb(0 0 0 / 20%), 0 0 0 rgb(0 0 0 / 25%);
    height: 100%;
    margin-bottom: 15px;
    ${(props) =>
        props.show === "true" ? `border-left:6px solid #4285f4;` : ``}

    @media (max-width: 768px) {
        width: 96%;
        margin-left: auto;
        margin-right: auto;
    }

    .MuiPaper-elevation1 {
        box-shadow: none !important;
    }
`;

const CustomAccordionSummary = styled(AccordionSummary)`
    width: 100%;
    ${(props) =>
        props.status === "true"
            ? `
        min-height: 0 !important;
        max-height: 0 !important;

        & > .Mui-expanded {
            min-height: 0 !important;
        }
    `
            : ""};
`;

const SaveQuestion = styled.div`
    background-color: white;
    border-radius: 8px;
    padding: 20px 2px;
    text-transform: capitalize;
    display: flex;
    flex-direction: column;
`;

const CustomTypography = styled(Typography)`
    font-size: 15px;
    font-weight: 400;
    letter-spacing: 1px;
    line-height: 24px;
    padding-bottom: 8px;
`;

const ListOption = styled.div`
    display: flex;
    border: none !important;
`;

const CustomFormControlLabel = styled(FormControlLabel)`
    margin-left: "5px";
    margin-bottom: "5px";
`;

const CustomTypographyOption = styled(Typography)`
    font-size: 13px;
    font-weight: 400;
    letter-spacing: 0.2px;
    line-height: 20px;
    color: #202124;
    font-family: Roboto, Arial, sans-serif;

    #other {
        color: var(--icon-color);
        text-transform: none;
    }
`;

export default connect(mapStateToProps, mapDispatchToProps)(FormBody);
