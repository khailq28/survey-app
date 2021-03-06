import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useHistory, useParams } from "react-router";
import { connect } from "react-redux";
import {
    changeStatusProgess,
    setSurvey,
    createSubmitData,
} from "../../actions";
import socket from "../../socket";
import SubmitTitle from "../SubmitForm/SubmitTitle";
// import SubmitBody from "./SubmitBody";
import Skeleton from "@material-ui/lab/Skeleton";
import PreviewBody from "./PreviewBody";

PreviewForm.propTypes = {
    user: PropTypes.object,
    checkLogin: PropTypes.string,
    backgroundColor: PropTypes.string,
    setSurvey: PropTypes.func,
    changeStatusProgess: PropTypes.func,
};

PreviewForm.defaultProps = {
    user: null,
    checkLogin: "",
    backgroundColor: "",
    setSurvey: null,
    changeStatusProgess: null,
};

const mapStateToProps = (state) => {
    return {
        user: state.userState.user,
        checkLogin: state.userState.checkLogin,
        backgroundColor: state.survey.backgroundColor,
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        changeStatusProgess: (bStatus) => {
            dispatch(changeStatusProgess(bStatus));
        },

        setSurvey: (oSurvey) => {
            dispatch(setSurvey(oSurvey));
        },

        createSubmitData: (author, aId) => {
            dispatch(createSubmitData(author, aId));
        },
    };
};

function PreviewForm(props) {
    var { id } = useParams();
    var history = useHistory();
    var [loading, setLoading] = useState(false);

    useEffect(() => {
        if (props.checkLogin === "false") {
            history.push("/", { url: props.match.url });
        }
    });

    useEffect(() => {
        props.changeStatusProgess(true);
        if (props.user) {
            socket.emit("CLIENT_GET_DATA_SURVEY_SUBMIT", {
                id,
                author: props.user.email,
            });
        }

        socket.on("SERVER_SEND_SURVEY_SUBMIT", (oSurvey) => {
            props.setSurvey(oSurvey);
            props.changeStatusProgess(false);
            var arr = [];
            oSurvey.questions.forEach((question) => {
                arr.push({
                    questionId: question._id,
                    required: question.required,
                    type: question.questionType,
                });
            });
            if (props.user) {
                props.createSubmitData(props.user.email, arr);
            }
            setLoading(true);
        });

        socket.on("SERVER_SEND_MSG_NOT_FOUND", () => {
            history.replace("/notfound");
        });
    }, [props.user]);

    return (
        <Container backgroundColor={props.backgroundColor}>
            <Content>
                {loading ? (
                    <>
                        <SubmitTitle />
                        <PreviewBody />
                        {/* <SubmitBody /> */}
                    </>
                ) : (
                    <>
                        <SkeletonContent
                            animation="wave"
                            variant="rect"
                            width="750px"
                            height="150px"
                        />
                        <SkeletonContent
                            animation="wave"
                            variant="rect"
                            width="750px"
                            height="150px"
                        />
                        <SkeletonContent
                            animation="wave"
                            variant="rect"
                            width="750px"
                            height="150px"
                        />
                        <SkeletonContent
                            animation="wave"
                            variant="rect"
                            width="750px"
                            height="150px"
                        />
                        <SkeletonContent
                            animation="wave"
                            variant="rect"
                            width="100px"
                            height="40px"
                        />
                    </>
                )}
            </Content>
        </Container>
    );
}

const Container = styled.div`
    background-color: ${(props) =>
        props.backgroundColor ? props.backgroundColor : "while"};
    height: 100%;
    min-height: 100vh;
`;

const Content = styled.div`
    height: 100%;
    display: grid;
    justify-content: center;
    padding-top: 10px;
`;

const SkeletonContent = styled(Skeleton)`
    border-radius: 6px;
    box-shadow: 0 0 0 2px rgb(0 0 0 / 20%), 0 0 0 rgb(0 0 0 / 25%);
    margin-top: 10px;
`;

export default connect(mapStateToProps, mapDispatchToProps)(PreviewForm);
