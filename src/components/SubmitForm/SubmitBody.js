import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { connect } from "react-redux";
import socket from "../../socket";
import SubmitItem from "./SubmitItem";
import Button from "@material-ui/core/Button";
import { validateForm, cleanSubmit } from "../../actions";

SubmitBody.propTypes = {
    questions: PropTypes.array,
    submitData: PropTypes.array,
    user: PropTypes.object,
    surveyId: PropTypes.string,
};

SubmitBody.defaultProps = {
    user: null,
    questions: [],
    submitData: [],
    surveyId: "",
};

const mapStateToProps = (state) => {
    return {
        user: state.userState.user,
        questions: state.survey.questions,
        submitData: state.submit,
        surveyId: state.survey._id,
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        validateForm: () => {
            dispatch(validateForm());
        },

        cleanSubmit: () => {
            dispatch(cleanSubmit());
        },
    };
};

const formatDate = () => {
    var date = new Date();
    var hour = `0${date.getHours()}`.slice(-2);
    var minute = `0${date.getMinutes()}`.slice(-2);
    var day = `0${date.getDate()}`.slice(-2);
    var mounth = `0${date.getMonth() + 1}`.slice(-2);
    var year = date.getFullYear();

    return `${hour}:${minute} ${day}/${mounth}/${year}`;
};

function SubmitBody(props) {
    const onHandleSubmit = (e) => {
        e.preventDefault();
        props.validateForm();

        if (props.submitData.length > 0) {
            var check = false;
            props.submitData.forEach((element, index) => {
                if (element.validate) {
                    check = true;
                }
            });
            if (!check) {
                socket.emit("CLIENT_SUBMIT_FORM", {
                    surveyId: props.surveyId,
                    author: props.user.email,
                    created: formatDate(),
                    content: props.submitData,
                });

                props.cleanSubmit();
            }
        }
    };

    return (
        <form onSubmit={onHandleSubmit}>
            {props.questions.map((question, index) => {
                return (
                    <SubmitItem key={index} question={question} index={index} />
                );
            })}
            <CustomButton type="submit" variant="contained" color="primary">
                Lưu lại
            </CustomButton>
        </form>
    );
}

const CustomButton = styled(Button)`
    margin-top: 10px !important;
    margin-bottom: 50px !important;
`;

export default connect(mapStateToProps, mapDispatchToProps)(SubmitBody);
