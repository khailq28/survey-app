import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { ENDPOINT } from "../../constant";
import TextareaAutosize from "react-textarea-autosize";

DetailBody.propTypes = {
    submiter: PropTypes.array,
    surver: PropTypes.object,
    index: PropTypes.number,
};

DetailBody.defaultProps = {
    submiter: null,
    surver: null,
    index: 0,
};

const mapStateToProps = (state) => {
    return {
        submiter: state.survey.submiter,
        surver: state.survey,
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {};
};

function DetailBody(props) {
    const { index, submiter } = props;
    var [questions, setQuestions] = useState(props.surver.questions);

    useEffect(() => {
        setQuestions(props.surver.questions);
    }, [props.surver]);

    return (
        <>
            {questions.map((question, i) => (
                <div key={i}>
                    <BoxQues>
                        <Question>
                            {i + 1}. {question.questionText}{" "}
                            {question.required === true ? (
                                <span style={{ color: "red" }}>
                                    * (Bắt buộc)
                                </span>
                            ) : (
                                ""
                            )}
                        </Question>
                        {question.image && (
                            <QuestionImg>
                                <img
                                    src={
                                        ENDPOINT + "/" + question.image.slice(7)
                                    }
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
                    </BoxQues>

                    <BoxAns>
                        <Text
                            style={{
                                fontWeight: "600",
                                fontSize: "16px",
                                color: "gray",
                            }}
                        >
                            Câu trả lời:
                        </Text>
                        {question.questionType === "text" ||
                        question.questionType === "textarea"
                            ? question.answers.map((answer, z) => {
                                  if (
                                      submiter.length > 0 &&
                                      submiter[index].name === answer.user
                                  )
                                      return (
                                          <div key={z}>
                                              {answer.answer[0] ? (
                                                  <Text>
                                                      {answer.answer[0]}
                                                  </Text>
                                              ) : (
                                                  <Text
                                                      style={{ color: "red" }}
                                                  >
                                                      Không có câu trả lời!
                                                  </Text>
                                              )}
                                          </div>
                                      );
                              })
                            : question.questionType === "radio"
                            ? question.answers.map((answer, y) => {
                                  if (submiter[index].name === answer.user)
                                      return (
                                          <div
                                              key={y}
                                              style={{
                                                  display: "flex",
                                                  paddingTop: "5px",
                                                  paddingBottom: "5px",
                                              }}
                                          >
                                              <input
                                                  type={question.questionType}
                                                  name={question._id}
                                                  checked={true}
                                                  disabled
                                              />
                                              {answer.answer[0] ? (
                                                  <Text>
                                                      {answer.answer[0]}
                                                  </Text>
                                              ) : (
                                                  <Text
                                                      style={{ color: "red" }}
                                                  >
                                                      Không có câu trả lời!
                                                  </Text>
                                              )}
                                          </div>
                                      );
                              })
                            : question.questionType === "checkbox"
                            ? question.answers.map((answer, x) => (
                                  <div key={x}>
                                      {submiter[index].name === answer.user ? (
                                          answer.answer.length > 0 ? (
                                              answer.answer.map((ans, j) => (
                                                  <div
                                                      key={j}
                                                      style={{
                                                          display: "flex",
                                                          paddingTop: "5px",
                                                          paddingBottom: "5px",
                                                      }}
                                                  >
                                                      <input
                                                          type={
                                                              question.questionType
                                                          }
                                                          name={question._id}
                                                          checked={true}
                                                          disabled
                                                      />
                                                      <Text>{ans}</Text>
                                                  </div>
                                              ))
                                          ) : (
                                              <Text style={{ color: "red" }}>
                                                  Không có câu trả lời!
                                              </Text>
                                          )
                                      ) : (
                                          ""
                                      )}
                                  </div>
                              ))
                            : ""}
                    </BoxAns>
                </div>
            ))}
        </>
    );
}

const Box = styled.div`
    background-color: white;
    border-radius: 6px;
    padding: 25px 20px;
    width: 750px;
    margin-top: 10px;

    @media (max-width: 768px) {
        width: 96%;
        margin-left: auto;
        margin-right: auto;
    }
`;

const BoxQues = styled(Box)`
    border-radius: 6px 6px 0 0;
    box-shadow: 0 0 0 2px rgb(0 0 0 / 20%);
`;

const BoxAns = styled(Box)`
    margin-top: 0;
    border-radius: 0 0 6px 6px;
    box-shadow: 0 0 0 2px rgb(0 0 0 / 20%);
`;

const Text = styled.div`
    text-transform: capitalize;
    word-wrap: break-word;
    white-space: pre-wrap;
    font-size: 15px;
    padding: 2px;
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailBody);
