import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
    setTitleForm,
    setDescription,
    changeStatusProgess,
} from "../../actions";
import socket from "../../socket";
import TextareaAutosize from "react-textarea-autosize";

FormTitle.propTypes = {
    survey: PropTypes.object,
    title: PropTypes.string,
    setTitleForm: PropTypes.func,
    setDescription: PropTypes.func,
    changeStatusProgess: PropTypes.func,
    description: PropTypes.string,
    interfaceColor: PropTypes.string,
};

FormTitle.defaultProps = {
    title: "Mẫu không tiêu đề",
    setTitleForm: null,
    setDescription: null,
    changeStatusProgess: null,
    description: "",
    interfaceColor: null,
    survey: null,
};

const mapStateToProps = (state) => {
    return {
        survey: state.survey,
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

        changeStatusProgess: (bStatus) => {
            dispatch(changeStatusProgess(bStatus));
        },
    };
};

function FormTitle(props) {
    const typingTimeOutRef = useRef(null);
    var [title, setTitle] = useState(props.title);
    var [description, setDescription] = useState(props.description);
    useEffect(() => {
        socket.on("SERVER_SEND_NEW_TITLE", (oData) => {
            if (
                oData.value !== props.title &&
                oData.idForm === props.survey._id
            ) {
                props.setTitleForm(oData.value);
            }
            props.changeStatusProgess(false);
        });
        setTitle(props.title);
    }, [props.title]);

    useEffect(() => {
        socket.on("SERVER_SEND_NEW_DESCRIPTION", (oData) => {
            if (
                oData.value !== props.description &&
                oData.idForm === props.survey._id
            ) {
                props.setDescription(oData.value);
            }
            props.changeStatusProgess(false);
        });
        setDescription(props.description);
    }, [props.description]);

    // handle change Title
    var handleChangeTitle = (e) => {
        var target = e.target;
        var value = target.type === "checked" ? target.checked : target.value;
        value = value === "" ? "Mẫu không tiêu đề" : value;
        setTitle(value);

        if (typingTimeOutRef.current) {
            clearTimeout(typingTimeOutRef.current);
        }

        typingTimeOutRef.current = setTimeout(() => {
            props.setTitleForm(value);
            props.changeStatusProgess(true);
            socket.emit("CLIENT_CHANGE_TITLE_FORM", {
                value,
                idForm: props.survey._id,
            });
        }, 500);
    };

    // handle change description
    var handleChangeDesc = (e) => {
        var target = e.target;
        var value = target.type === "checked" ? target.checked : target.value;
        setDescription(value);
        if (typingTimeOutRef.current) {
            clearTimeout(typingTimeOutRef.current);
        }

        typingTimeOutRef.current = setTimeout(() => {
            props.setDescription(value);
            props.changeStatusProgess(true);
            socket.emit("CLIENT_CHANGE_DESCRIPTION_FORM", {
                value,
                idForm: props.survey._id,
            });
        }, 1000);
    };

    return (
        <Title interfaceColor={props.interfaceColor}>
            <QuestionFormName
                type="text"
                value={title}
                onFocus={(e) => e.target.select()}
                onChange={handleChangeTitle}
                placeholder="Mẫu không tiêu đề"
            ></QuestionFormName>
            <QuestionFormDesc
                type="text"
                placeholder="Mô tả biểu mẫu"
                value={description}
                onChange={handleChangeDesc}
                // onBlur={handleBlurDesc}
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
    /* height: 100%; */

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

const QuestionFormDesc = styled(TextareaAutosize)`
    box-sizing: border-box;
    margin-top: 10px;
    font-family: "Google Sans", Roboto, Arial, sans-serif;
    font-size: 14px;
    font-weight: 400;
    line-height: 40px;
    resize: none;
    white-space: pre-wrap;

    width: 100%;
    border: none;
    outline: none;
    border-bottom: 1px solid #f4f4f9;
    border-radius: 0px 0px 4px 4px;
    border-bottom: 0px solid var(--basic-color);
    transition: border-bottom 0.2s ease-in-out;

    &:focus {
        border-bottom-width: 3px;
    }
`;

export default connect(mapStateToProps, mapDispatchToProps)(FormTitle);
