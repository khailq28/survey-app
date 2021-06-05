import React, { useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Redirect, useParams } from "react-router";
import { connect } from "react-redux";
import { changeStatusProgess, setSurvey } from "../../actions";
import socket from "../../socket";
import SubmitTitle from "./SubmitTitle";

SubmitForm.propTypes = {
    user: PropTypes.object,
    backgroundColor: PropTypes.string,
    setSurvey: PropTypes.func,
    changeStatusProgess: PropTypes.func,
};

SubmitForm.defaultProps = {
    user: null,
    backgroundColor: "",
    setSurvey: null,
    changeStatusProgess: null,
};

const mapStateToProps = (state) => {
    return {
        user: state.userState.user,
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
    };
};

function SubmitForm(props) {
    var { id } = useParams();

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
            props.changeStatusProgess(false);
        });
    }, []);

    return (
        <Container backgroundColor={props.backgroundColor}>
            <Content>
                {!props.user && (
                    <Redirect
                        to={{
                            pathname: "/",
                            state: props.match.url,
                        }}
                    />
                )}
                <SubmitTitle />
                <div>hahah</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(SubmitForm);
