import React, { useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { connect } from "react-redux";
import socket from "../../socket";
import SubmitItem from "./SubmitItem";
import Button from "@material-ui/core/Button";
import { validateForm } from "../../actions";

SubmitBody.propTypes = {
    questions: PropTypes.array,
    submitData: PropTypes.array,
    user: PropTypes.object,
};

SubmitBody.defaultProps = {
    user: null,
    questions: [],
    submitData: [],
};

const mapStateToProps = (state) => {
    return {
        user: state.userState.user,
        questions: state.survey.questions,
        submitData: state.submit,
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        validateForm: () => {
            dispatch(validateForm());
        },
    };
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
                console.log("submitForm");
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
