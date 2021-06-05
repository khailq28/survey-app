import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import socket from "../../socket";

SubmitTitle.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    interfaceColor: PropTypes.string,
};

SubmitTitle.defaultProps = {
    title: "Mẫu không tiêu đề",
    description: "",
    interfaceColor: null,
};

const mapStateToProps = (state) => {
    return {
        title: state.survey.title,
        description: state.survey.description,
        interfaceColor: state.survey.interfaceColor,
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {};
};

function SubmitTitle(props) {
    return (
        <Container interfaceColor={props.interfaceColor}>
            <Title>{props.title}</Title>
            <Description>{props.description}</Description>
        </Container>
    );
}

const Container = styled.div`
    border-top: 10px solid
        ${(props) => (props.interfaceColor ? props.interfaceColor : "")};
    background-color: white;
    border-radius: 6px;
    padding: 25px 20px;
    text-transform: capitalize;
    width: 750px;
    box-shadow: 0 0 0 2px rgb(0 0 0 / 20%), 0 0 0 rgb(0 0 0 / 25%);
    height: 100%;

    @media (max-width: 768px) {
        width: 96%;
        margin-left: auto;
        margin-right: auto;
    }
`;

const Title = styled.div`
    color: black;
    font-size: 32px;
    font-weight: 400;
    line-height: 135%;
    width: 100%;
    border: none;
    outline: none;
`;

const Description = styled.div`
    margin-top: 10px;
    font-family: "Google Sans", Roboto, Arial, sans-serif;
    font-size: 14px;
    font-weight: 400;
    line-height: 40px;
    width: 100%;
    outline: none;
    color: var(--icon-color);
    margin-left: 3px;
`;

export default connect(mapStateToProps, mapDispatchToProps)(SubmitTitle);
