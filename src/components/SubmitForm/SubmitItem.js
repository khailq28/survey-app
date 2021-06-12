import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { connect } from "react-redux";
import { ENDPOINT } from "../../constant";
import TextareaAutosize from "react-textarea-autosize";
import { pushValueToSubmit, changeValueOtherCheckbox } from "../../actions";

SubmitItem.propTypes = {
    question: PropTypes.object,
    index: PropTypes.number,
    pushValueToSubmit: PropTypes.func,
    changeValueOtherCheckbox: PropTypes.func,
};

SubmitItem.defaultProps = {
    question: null,
    index: null,
    pushValueToSubmit: null,
    changeValueOtherCheckbox: null,
};

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        pushValueToSubmit: (typeQues, value, index) => {
            dispatch(pushValueToSubmit(typeQues, value, index));
        },

        changeValueOtherCheckbox: (value, index) => {
            dispatch(changeValueOtherCheckbox(value, index));
        },
    };
};

function SubmitItem(props) {
    var { question, index } = props;
    var [valueQues, setValueQues] = useState("");
    var [valueOther, setValueOther] = useState("");
    const typingTimeOutRef = useRef(null);

    const handleChange = (e, optionId) => {
        var target = e.target;
        var type = target.type;
        var value, checked;
        if (type === "checkbox") {
            checked = target.checked;
        }
        value = target.value !== "" ? target.value : valueOther;

        setValueQues(value);
        if (type === "radio") {
            setValueOther("");
        }

        if (typingTimeOutRef.current) {
            clearTimeout(typingTimeOutRef.current);
        }

        if (type === "checkbox") {
            props.pushValueToSubmit(type, { value, optionId, checked }, index);
        } else {
            typingTimeOutRef.current = setTimeout(() => {
                props.pushValueToSubmit(type, value, index);
            }, 500);
        }
    };

    const handleFocusOther = (id, e) => {
        document.getElementById(id).checked = true;
        e.target.select();

        if (document.getElementById(id).type === "checkbox") {
            props.pushValueToSubmit(
                document.getElementById(id).type,
                { value: valueOther, optionId: id, checked: true },
                index,
            );
        } else {
            props.pushValueToSubmit(
                document.getElementById(id).type,
                "",
                index,
            );
        }
    };

    const handleChangeOther = (e, optionId) => {
        var target = e.target;
        var value = target.value;

        setValueOther(value);
        if (typingTimeOutRef.current) {
            clearTimeout(typingTimeOutRef.current);
        }

        typingTimeOutRef.current = setTimeout(() => {
            if (document.getElementById(optionId).type === "checkbox") {
                props.changeValueOtherCheckbox({ value, optionId }, index);
            } else {
                props.pushValueToSubmit(null, value, index);
            }
        }, 500);
    };

    return (
        <Container>
            <Question>
                {index + 1}. {question.questionText}
            </Question>
            {question.image && (
                <QuestionImg>
                    <img
                        src={ENDPOINT + "/" + question.image.slice(7)}
                        alt=""
                    />
                </QuestionImg>
            )}

            {question.questionType === "text" ? (
                <TextInput
                    type="text"
                    placeholder="Văn bản câu trả lời ngắn"
                    required={question.required ? true : false}
                    value={valueQues}
                    onChange={handleChange}
                />
            ) : question.questionType === "textarea" ? (
                <TextareaInput
                    type="textarea"
                    rows={1}
                    placeholder="Văn bản câu trả lời dài"
                    required={question.required ? true : false}
                    value={valueQues}
                    onChange={handleChange}
                />
            ) : question.questionType === "radio" ||
              question.questionType === "checkbox" ? (
                <ListOption>
                    {question.options.map((option, j) => {
                        return (
                            <div key={j}>
                                <Option>
                                    <input
                                        type={question.questionType}
                                        name={question._id}
                                        id={option._id}
                                        value={option.optionText}
                                        onChange={(e) =>
                                            handleChange(e, option._id)
                                        }
                                    />
                                    {option.other ? (
                                        <OtherInput
                                            type="text"
                                            placeholder="Khác"
                                            onFocus={(e) =>
                                                handleFocusOther(option._id, e)
                                            }
                                            value={valueOther}
                                            onChange={(e) =>
                                                handleChangeOther(e, option._id)
                                            }
                                        />
                                    ) : (
                                        option.optionText
                                    )}
                                </Option>

                                {option.image && (
                                    <OptionImg
                                        src={
                                            ENDPOINT +
                                            "/" +
                                            option.image.slice(7)
                                        }
                                        alt=""
                                    />
                                )}
                            </div>
                        );
                    })}
                </ListOption>
            ) : (
                ""
            )}
        </Container>
    );
}

const Container = styled.div`
    background-color: white;
    border-radius: 6px;
    padding: 25px 20px;
    width: 750px;
    box-shadow: 0 0 0 2px rgb(0 0 0 / 20%), 0 0 0 rgb(0 0 0 / 25%);
    margin-top: 10px;

    @media (max-width: 768px) {
        width: 96%;
        margin-left: auto;
        margin-right: auto;
    }
`;

const Question = styled.div`
    text-transform: capitalize;
    font-weight: 600;
    word-wrap: break-word;
`;

const TextInput = styled.input`
    box-sizing: border-box;
    font-family: "Google Sans", Roboto, Arial, sans-serif;
    font-size: 16px;
    font-weight: 400;
    flex: 1;
    line-height: 30px;
    width: 60%;
    color: black;
    border: none;
    outline: none;
    border-bottom: 1px solid var(--icon-color);
    border-radius: 0 0 2px 2px;
    transition: border-bottom 0.2s ease-in-out;
    padding: 10px 0;

    &:focus {
        border-bottom: 1px solid var(--basic-color);
        border-bottom-width: 2px;
    }
`;

const OtherInput = styled.input`
    box-sizing: border-box;
    font-family: "Google Sans", Roboto, Arial, sans-serif;
    font-size: 16px;
    font-weight: 400;
    flex: 1;
    width: 60%;
    color: black;
    border: none;
    outline: none;
    border-bottom: 1px solid var(--icon-color);
    border-radius: 0 0 2px 2px;
    transition: border-bottom 0.2s ease-in-out;

    &:focus {
        border-bottom: 1px solid var(--basic-color);
        border-bottom-width: 2px;
    }
`;

const TextareaInput = styled(TextareaAutosize)`
    box-sizing: border-box;
    font-family: "Google Sans", Roboto, Arial, sans-serif;
    font-size: 16px;
    font-weight: 400;
    flex: 1;
    line-height: 30px;
    width: 60%;
    color: black;
    border: none;
    outline: none;
    border-bottom: 1px solid var(--icon-color);
    border-radius: 0 0 2px 2px;
    transition: border-bottom 0.2s ease-in-out;
    padding: 10px 0;
    resize: none;

    &:focus {
        border-bottom: 1px solid var(--basic-color);
        border-bottom-width: 2px;
    }
`;

const QuestionImg = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 0;

    & > img {
        width: 80%;
        box-shadow: 0 0 0 1px rgb(0 0 0 / 20%), 0 0 0 rgb(0 0 0 / 40%);
    }
`;

const ListOption = styled.div`
    padding-top: 10px;
`;

const Option = styled.div`
    padding: 10px 0;

    & > input {
        margin-right: 15px !important;
    }
`;

const OptionImg = styled.img`
    width: 270px;
    box-shadow: 0 0 0 1px rgb(0 0 0 / 20%), 0 0 0 rgb(0 0 0 / 40%);
`;

export default connect(mapStateToProps, mapDispatchToProps)(SubmitItem);
