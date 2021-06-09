import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import { Typography } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import QuestionBody from "./QuestionBody";
import QuestionFooter from "./QuestionFooter";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import { ENDPOINT } from "../../constant";
import {
    setQuestions,
    changeStatusOpenQuestion,
    setSurvey,
    changeStatusProgess,
} from "../../actions";
import { useHistory, useParams } from "react-router";
import socket from "../../socket";

FormBody.propTypes = {
    questions: PropTypes.array,
    setQuestions: PropTypes.func,
    changeStatusOpenQuestion: PropTypes.func,
    setSurvey: PropTypes.func,
    changeStatusProgess: PropTypes.func,
    user: PropTypes.object,
    idForm: PropTypes.string,
};

FormBody.defaultProps = {
    questions: null,
    setQuestions: null,
    changeStatusOpenQuestion: null,
    setSurvey: null,
    changeStatusProgess: null,
    user: null,
    idForm: null,
};

const mapStateToProps = (state) => {
    return {
        questions: state.survey.questions,
        user: state.userState.user,
        idForm: state.survey._id,
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        setQuestions: (questions) => {
            dispatch(setQuestions(questions));
        },

        changeStatusOpenQuestion: (index) => {
            dispatch(changeStatusOpenQuestion(index));
        },

        setSurvey: (oSurvey) => {
            dispatch(setSurvey(oSurvey));
        },

        changeStatusProgess: (bStatus) => {
            dispatch(changeStatusProgess(bStatus));
        },
    };
};

function FormBody(props) {
    var { idForm } = props;
    // set state
    let { id } = useParams();
    var history = useHistory();
    const [questions, setQuestions] = useState(props.questions);

    useEffect(() => {
        socket.on("SERVER_SEND_NEW_QUESTIONS", (oQuestions) => {
            if (
                questions !== oQuestions.questions &&
                idForm === oQuestions.idForm
            ) {
                setQuestions(oQuestions.questions);
                props.setQuestions(oQuestions.questions);
            }
        });
    }, [idForm]);

    useEffect(() => {
        props.changeStatusProgess(true);
        if (props.user) {
            socket.emit("CLIENT_GET_DATA_SURVEY", {
                id,
                author: props.user.email,
            });
        }

        socket.on("SERVER_SEND_SURVEY_TO_CREATE_FORM_PAGE", (oSurvey) => {
            props.setSurvey(oSurvey);
            setQuestions(oSurvey.questions);
            props.changeStatusProgess(false);
        });

        socket.on("SERVER_SEND_MESSAGE_NO_ACCESS", () => {
            history.replace("/notfound");
        });
    }, []);

    var [changeAccordion, setChangeAccordion] = useState(false);

    useEffect(() => {
        socket.on("SERVER_CHANGED_STATUS_OPEN_QUESTION", (oSurvey) => {
            if (idForm === oSurvey.idForm) {
                props.setSurvey(oSurvey.survey);
                setQuestions(oSurvey.survey.questions);
            }
        });
    }, [changeAccordion, idForm]);

    const handleChangeAccordion = (index) => {
        var temp = [...questions];
        temp.forEach((question, i) => {
            question.open = false;
        });

        temp[index].open = true;
        setQuestions(temp);
        props.changeStatusOpenQuestion(index);
        socket.emit("CLIENT_CHANGE_OPEN_QUESTION", {
            idQuestion: questions[index]._id,
            idForm,
        });

        setChangeAccordion(!changeAccordion);
    };

    const handleAddQuestion = () => {
        var questionsTemp = [...questions];
        questionsTemp.forEach((question, index) => {
            question.open = false;
        });
        questionsTemp.push({
            questionText: "",
            questionType: "text",
            image: "",
            options: [
                {
                    optionText: "Tùy chọn 1",
                    image: "",
                    other: false,
                },
            ],
            open: true,
            required: false,
            answers: [],
        });
        setQuestions(questionsTemp);
        props.setQuestions(questionsTemp);
        socket.emit("CLIENT_SET_QUESTIONS", {
            questions: questionsTemp,
            idForm,
        });
        if (props.user) {
            socket.emit("CLIENT_GET_DATA_SURVEY", {
                id,
                author: props.user.email,
            });
        }
    };

    const handleCopyQuestion = (index) => {
        var questionsTemp = [...questions];
        questionsTemp.forEach((question) => {
            question.open = false;
        });
        questionsTemp.push({
            questionText: questionsTemp[index].questionText,
            questionType: questionsTemp[index].questionType,
            image: questionsTemp[index].image,
            options: questionsTemp[index].options,
            open: true,
            required: questionsTemp[index].required,
        });

        setQuestions(questionsTemp);
        props.setQuestions(questionsTemp);
        socket.emit("CLIENT_SET_QUESTIONS", {
            questions: questionsTemp,
            idForm,
        });
    };

    const handleDeleteQuestion = (index) => {
        var questionsTemp = [...questions];
        questionsTemp.splice(index, 1);
        setQuestions(questionsTemp);
        props.setQuestions(questionsTemp);
        socket.emit("CLIENT_SET_QUESTIONS", {
            questions: questionsTemp,
            idForm,
        });
    };

    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }
        var itemgg = [...questions];
        const itemF = reorder(
            itemgg,
            result.source.index,
            result.destination.index,
        );
        setQuestions(itemF);
        props.setQuestions(itemF);
        socket.emit("CLIENT_SET_QUESTIONS", {
            questions: itemF,
            idForm,
        });
    };

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    };

    // RENDER
    var questionUI = questions.map((question, i) => {
        return (
            <Draggable key={i} draggableId={i + "id"} index={i}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        <div>
                            <div style={{ marginBottom: "0px" }}>
                                <CustomDivDrag>
                                    <CustomDragIndicatorIcon fontSize="small" />
                                </CustomDivDrag>
                                <Form show={question.open}>
                                    <Accordion
                                        expanded={question.open}
                                        onChange={() =>
                                            handleChangeAccordion(i)
                                        }
                                    >
                                        <CustomAccordionSummary
                                            aria-controls="panel1a-content"
                                            elevation={1}
                                            status={
                                                question.open ? "true" : "false"
                                            }
                                        >
                                            {!question.open ? (
                                                <SaveQuestion>
                                                    <CustomTypography>
                                                        {i + 1}.{" "}
                                                        {question.questionText}
                                                    </CustomTypography>
                                                    <div
                                                        style={{
                                                            width: "100%",
                                                            display: "flex",
                                                            alignItems:
                                                                "center",
                                                            justifyContent:
                                                                "center",
                                                            marginBottom: "4px",
                                                        }}
                                                    >
                                                        {question.image && (
                                                            <QuestionImg
                                                                src={
                                                                    ENDPOINT +
                                                                    "/" +
                                                                    question.image.slice(
                                                                        7,
                                                                    )
                                                                }
                                                                alt=""
                                                            />
                                                        )}
                                                    </div>

                                                    {question.questionType ===
                                                        "radio" ||
                                                    question.questionType ===
                                                        "checkbox" ? (
                                                        question.options.map(
                                                            (op, j) => (
                                                                <div key={j}>
                                                                    <ListOption>
                                                                        {question
                                                                            .options[
                                                                            j
                                                                        ]
                                                                            .other ? (
                                                                            <CustomFormControlLabel
                                                                                disabled
                                                                                control={
                                                                                    <input
                                                                                        type={
                                                                                            question.questionType
                                                                                        }
                                                                                        color="primary"
                                                                                        style={{
                                                                                            margin: "13px",
                                                                                        }}
                                                                                        required={
                                                                                            question.type
                                                                                        }
                                                                                    />
                                                                                }
                                                                                label={
                                                                                    <CustomTypographyOption>
                                                                                        <span id="other">
                                                                                            Mục
                                                                                            khác
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
                                                                                            margin: "13px",
                                                                                        }}
                                                                                        required={
                                                                                            question.type
                                                                                        }
                                                                                    />
                                                                                }
                                                                                label={
                                                                                    <CustomTypographyOption>
                                                                                        {
                                                                                            question
                                                                                                .options[
                                                                                                j
                                                                                            ]
                                                                                                .optionText
                                                                                        }
                                                                                    </CustomTypographyOption>
                                                                                }
                                                                            />
                                                                        )}
                                                                    </ListOption>
                                                                    {question
                                                                        .options[
                                                                        j
                                                                    ].image && (
                                                                        <OptionImg
                                                                            src={
                                                                                ENDPOINT +
                                                                                "/" +
                                                                                question.options[
                                                                                    j
                                                                                ].image.slice(
                                                                                    7,
                                                                                )
                                                                            }
                                                                            alt=""
                                                                        />
                                                                    )}
                                                                </div>
                                                            ),
                                                        )
                                                    ) : question.questionType ===
                                                      "text" ? (
                                                        <CustomText type="text">
                                                            Văn bản câu trả lời
                                                            ngắn
                                                        </CustomText>
                                                    ) : question.questionType ===
                                                      "textarea" ? (
                                                        <CustomText type="textarea">
                                                            Văn bản câu trả lời
                                                            dài
                                                        </CustomText>
                                                    ) : (
                                                        ""
                                                    )}
                                                </SaveQuestion>
                                            ) : (
                                                ""
                                            )}
                                        </CustomAccordionSummary>

                                        <QuestionBody
                                            index={i}
                                            question={question}
                                        />

                                        <QuestionFooter
                                            index={i}
                                            question={question}
                                            handleCopyQuestion={() =>
                                                handleCopyQuestion(i)
                                            }
                                            handleDeleteQuestion={() =>
                                                handleDeleteQuestion(i)
                                            }
                                        />
                                    </Accordion>
                                </Form>
                            </div>
                        </div>
                    </div>
                )}
            </Draggable>
        );
    });

    return (
        <div>
            <CustomAddCircleOutlineIcon onClick={handleAddQuestion} />

            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {questionUI}

                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
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
    background-color: #d3cef6;

    &:hover {
        color: var(--basic-color);
        font-size: 50px !important;
    }

    @media (max-width: 768px) {
        /* bottom: 1% !important; */
        right: 10% !important;
        font-size: 35px !important;
    }
`;

const Form = styled.div`
    background-color: white;
    border-radius: 6px;
    /* padding: 10px; */
    text-transform: capitalize;
    width: 750px;
    box-shadow: 0 0 0 2px rgb(0 0 0 / 20%), 0 0 0 rgb(0 0 0 / 25%);
    height: 100%;
    /* margin-bottom: 15px; */
    ${(props) => (props.show ? `border-left:6px solid #4285f4;` : ``)}

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
        min-height: 15px !important;
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
    margin-left: 10px;
    margin-bottom: 5px;
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

const CustomText = styled.div`
    padding: 5px 0;
    margin-bottom: 5px;
    font-size: 14px;
    color: var(--icon-color);
    border-bottom: 1px solid #bdbdbd;
    text-transform: none;
    width: ${(props) =>
        props.type === "text"
            ? "250px"
            : props.type === "textarea"
            ? "330px"
            : ""};
`;

const CustomDragIndicatorIcon = styled(DragIndicatorIcon)`
    transform: rotate(-90deg);
    color: var(--icon-color);
`;

const CustomDivDrag = styled.div`
    width: 100%;
    margin-bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const OptionImg = styled.img`
    width: 250px;
    box-shadow: 0 0 0 1px rgb(0 0 0 / 20%), 0 0 0 rgb(0 0 0 / 40%);
    margin-left: 30px;
`;

const QuestionImg = styled.img`
    width: 80%;
    box-shadow: 0 0 0 1px rgb(0 0 0 / 20%), 0 0 0 rgb(0 0 0 / 40%);
`;

export default connect(mapStateToProps, mapDispatchToProps)(FormBody);
