import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import PropTypes from "prop-types";

FormBody.propTypes = {
    questions: PropTypes.array,
};

FormBody.defaultProps = {
    questions: null,
};

function FormBody(props) {
    return <Form>adsfds</Form>;
}

const Form = styled.div`
    background-color: white;
    border-radius: 8px;
    padding: 25px 20px;
    text-transform: capitalize;
    width: 750px;
    box-shadow: 0 0 0 1px rgb(0 0 0 / 20%), 0 0 0 rgb(0 0 0 / 25%);
    height: 100%;
    margin-bottom: 15px;

    @media (max-width: 768px) {
        width: 80%;
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
