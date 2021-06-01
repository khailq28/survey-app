import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setTitleForm, setDescription } from "../../actions";
import socket from "../../socket";

FormTitle.propTypes = {
    title: PropTypes.string,
    setTitleForm: PropTypes.func,
    setDescription: PropTypes.func,
    description: PropTypes.string,
    interfaceColor: PropTypes.string,
};

FormTitle.defaultProps = {
    title: "Mẫu không tiêu đề",
    setTitleForm: null,
    setDescription: null,
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
    return {
        setTitleForm: (title) => {
            dispatch(setTitleForm(title));
        },

        setDescription: (description) => {
            dispatch(setDescription(description));
        },
    };
};

function FormTitle(props) {
    const typingTimeOutRef = useRef(null);

    useEffect(() => {
        socket.on("SERVER_SEND_NEW_TITLE", (sTitle) => {
            if (sTitle !== props.title) {
                props.setTitleForm(sTitle);
            }
        });
    }, [props.title]);

    useEffect(() => {
        socket.on("SERVER_SEND_NEW_DESCRIPTION", (sDescription) => {
            if (sDescription !== props.description)
                props.setDescription(sDescription);
        });
    }, [props.description]);

    // handle change Title
    var handleChangeTitle = (e) => {
        var target = e.target;
        var value = target.type === "checked" ? target.checked : target.value;
        value = value === "" ? "Mẫu không tiêu đề" : value;
        props.setTitleForm(value);

        if (typingTimeOutRef.current) {
            clearTimeout(typingTimeOutRef.current);
        }

        typingTimeOutRef.current = setTimeout(() => {
            socket.emit("CLIENT_CHANGE_TITLE_FORM", value);
        }, 300);
    };

    // handle change description
    var handleChangeDesc = (e) => {
        var target = e.target;
        var value = target.type === "checked" ? target.checked : target.value;
        props.setDescription(value);

        if (typingTimeOutRef.current) {
            clearTimeout(typingTimeOutRef.current);
        }

        typingTimeOutRef.current = setTimeout(() => {
            socket.emit("CLIENT_CHANGE_DESCRIPTION_FORM", value);
        }, 300);
    };

    return (
        <Title interfaceColor={props.interfaceColor}>
            <QuestionFormName
                type="'text"
                value={props.title}
                onFocus={(e) => e.target.select()}
                onChange={handleChangeTitle}
                // placeholder={documentName}
                // value={documentName}
                // onChange={(e) => {
                //     setDocName(e.target.value);
                // }}
            ></QuestionFormName>
            <QuestionFormDesc
                type="text"
                placeholder="Mô tả biểu mẫu"
                value={props.description}
                onChange={handleChangeDesc}
                // placeholder={documentDescription}
                // value={documentDescription}
                // onChange={(e) => {
                //     setDocDesc(e.target.value);
                // }}
            ></QuestionFormDesc>
        </Title>
    );
}

const Title = styled.div`
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

const QuestionFormName = styled.input`
    color: black;
    box-sizing: border-box;
    font-size: 32px;
    font-weight: 400;
    line-height: 40px;
    line-height: 135%;
    width: 100%;
    border: none;
    outline: none;
    border-bottom: 1px solid #f4f4f9;
    color: black;
    border-radius: 0px 0px 4px 4px;
    border-bottom: 0px solid var(--basic-color);
    transition: border-bottom 0.2s ease-in-out;

    &:focus {
        border-bottom-width: 3px;
    }
`;

const QuestionFormDesc = styled.input`
    box-sizing: border-box;
    margin-top: 10px;
    font-family: "Google Sans", Roboto, Arial, sans-serif;
    font-size: 14px;
    font-weight: 400;
    line-height: 40px;

    width: 100%;
    border: none;
    outline: none;
    border-bottom: 1px solid #f4f4f9;
    color: black;
    border-radius: 0px 0px 4px 4px;
    border-bottom: 0px solid var(--basic-color);
    transition: border-bottom 0.2s ease-in-out;

    &:focus {
        border-bottom-width: 3px;
    }
`;

export default connect(mapStateToProps, mapDispatchToProps)(FormTitle);
