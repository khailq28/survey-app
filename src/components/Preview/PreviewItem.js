import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { connect } from "react-redux";
import { ENDPOINT } from "../../constant";
import TextareaAutosize from "react-textarea-autosize";

PreviewItem.propTypes = {
    question: PropTypes.object,
    index: PropTypes.number,
};

PreviewItem.defaultProps = {
    question: null,
    index: null,
};

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch, props) => {
    return {};
};

function PreviewItem(props) {
    var { question, index } = props;

    return (
        <Container>
            <Question>
                {index + 1}. {question.questionText}{" "}
                {question.required === true ? (
                    <span style={{ color: "red" }}>* (Bắt buộc)</span>
                ) : (
                    ""
                )}
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
                    disabled
                />
            ) : question.questionType === "textarea" ? (
                <TextareaInput
                    type="textarea"
                    rows={1}
                    placeholder="Văn bản câu trả lời dài"
                    disabled
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
                                        disabled
                                    />
                                    {option.other ? (
                                        <OtherInput
                                            type="text"
                                            placeholder="Khác"
                                            disabled
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

export default connect(mapStateToProps, mapDispatchToProps)(PreviewItem);
