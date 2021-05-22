import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Question from "./Question";

FormBody.propTypes = {
    questions: PropTypes.array,
};

FormBody.defaultProps = {
    questions: null,
};

function FormBody(props) {
    var questionUI = props.questions.map((question, index) => {
        return (
            <Form key={index}>
                <Question question={question} index={index} />
            </Form>
        );
    });

    return <div>{questionUI}</div>;
}

const Form = styled.div`
    background-color: white;
    border-radius: 8px;
    padding: 10px;
    text-transform: capitalize;
    width: 750px;
    box-shadow: 0 0 0 1px rgb(0 0 0 / 20%), 0 0 0 rgb(0 0 0 / 25%);
    height: 100%;
    margin-bottom: 15px;

    @media (max-width: 768px) {
        width: 80%;
    }

    .MuiPaper-elevation1 {
        box-shadow: none !important;
    }
`;

const mapStateToProps = (state) => {
    return {
        questions: state.survey.questions,
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(FormBody);
