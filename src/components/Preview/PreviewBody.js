import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { connect } from "react-redux";
import PreviewItem from "./PreviewItem";
import Button from "@material-ui/core/Button";
import { validateForm } from "../../actions";

PreviewBody.propTypes = {
    submitData: PropTypes.array,
};

PreviewBody.defaultProps = {
    questions: [],
};

const mapStateToProps = (state) => {
    return {
        questions: state.survey.questions,
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        validateForm: () => {
            dispatch(validateForm());
        },
    };
};

function PreviewBody(props) {
    return (
        <form style={{ marginBottom: "20px" }}>
            {props.questions.map((question, index) => {
                return (
                    <PreviewItem
                        key={index}
                        question={question}
                        index={index}
                    />
                );
            })}
        </form>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(PreviewBody);
