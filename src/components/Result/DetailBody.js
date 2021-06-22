import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { ENDPOINT } from "../../constant";
import PreviewItem from "../Preview/PreviewItem";

DetailBody.propTypes = {
    submiter: PropTypes.array,
    questions: PropTypes.array,
    index: PropTypes.number,
};

DetailBody.defaultProps = {
    submiter: null,
    questions: null,
    index: 0,
};

const mapStateToProps = (state) => {
    return {
        submiter: state.survey.submiter,
        questions: state.survey.questions,
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {};
};

function DetailBody(props) {
    const { index, questions, submiter } = props;
    return (
        <>
            {questions.map((question, i) => (
                <div key={i}>
                    <PreviewItem question={question} index={i} />
                    <Box>
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
                            ? question.answers.map((answer) => {
                                  if (submiter[index].name === answer.user)
                                      return (
                                          <>
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
                                          </>
                                      );
                              })
                            : question.questionType === "radio"
                            ? question.answers.map((answer) => {
                                  if (submiter[index].name === answer.user)
                                      return (
                                          <div
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
                            ? question.answers.map((answer, x) =>
                                  submiter[index].name === answer.user ? (
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
                                  ),
                              )
                            : ""}
                    </Box>
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
    box-shadow: 0 0 0 2px rgb(0 0 0 / 20%), 0 0 0 rgb(0 0 0 / 25%);
    margin-top: 10px;

    @media (max-width: 768px) {
        width: 96vw;
    }
`;

const Text = styled.div`
    text-transform: capitalize;
    word-wrap: break-word;
    white-space: pre-wrap;
    font-size: 15px;
    padding: 2px;
`;

export default connect(mapStateToProps, mapDispatchToProps)(DetailBody);
