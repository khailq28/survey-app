import React, { useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { connect } from "react-redux";
import socket from "../../socket";
import SubmitItem from "./SubmitItem";
import Button from "@material-ui/core/Button";

SubmitBody.propTypes = {
    questions: PropTypes.array,
    user: PropTypes.object,
};

SubmitBody.defaultProps = {
    user: null,
    questions: null,
};

const mapStateToProps = (state) => {
    return {
        user: state.userState.user,
        questions: state.survey.questions,
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {};
};

function SubmitBody(props) {
    const onHandleSubmit = (e) => {
        e.preventDefault();
        console.log("submitForm");
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
