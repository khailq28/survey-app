import React from "react";
import PropTypes from "prop-types";
import ShortTextIcon from "@material-ui/icons/ShortText";
import CropOriginalIcon from "@material-ui/icons/CropOriginal";
import { IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import styled from "styled-components";

QuestionBody.propTypes = {
    question: PropTypes.object,
    option: PropTypes.object,
};

QuestionBody.defaultProps = {
    question: null,
    option: null,
};

function QuestionBody(props) {
    var { question, option } = props;
    return (
        <Body>
            {/* <Checkbox  color="primary" inputProps={{ 'aria-label': 'secondary checkbox' }} disabled/> */}
            {question.questionType != "text" ? (
                <input className="text" type={question.questionType} />
            ) : (
                <ShortTextIcon className="text" />
            )}
            <div>
                <OptionInput
                    type="text"
                    placeholder="option"
                    value={option.optionText}
                    // onChange={(e) => {
                    //     handleOptionValue(e.target.value, i, j);
                    // }}
                ></OptionInput>
            </div>

            <CustomIconButton
                aria-label="delete"
                // onClick={() => {
                //     removeOption(i, j);
                // }}
            >
                <CropOriginalIcon className="icon-option" />
            </CustomIconButton>

            <CustomIconButton
                aria-label="delete"
                // onClick={() => {
                //     removeOption(i, j);
                // }}
            >
                <CloseIcon className="icon-option" />
            </CustomIconButton>
        </Body>
    );
}

const Body = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    margin-left: 15px;

    .text {
        margin-right: 15px;
    }
`;

const OptionInput = styled.input`
    outline: none;
    border: none;
    height: 40px;
    width: 570px;
    font-family: Roboto, Arial, sans-serif;
    font-size: 13px;
    font-weight: 400;
    letter-spacing: 0.2px;
    color: #202124;

    border-bottom: 0px solid var(--basic-color);
    border-radius: 0 0 2px 2px;
    transition: border-bottom-width 0.2s ease-in-out;

    &:focus {
        border-bottom-width: 2px;
    }

    @media only screen and (min-width: 480px) and (max-width: 768px) {
        width: 200px;
    }

    @media only screen and (max-width: 479px) {
        width: 100px;
    }

    @media only screen and (min-width: 768px) and (min-height: 1366px) {
        width: 80px;
    }
`;

const CustomIconButton = styled(IconButton)`
    .icon-option {
        color: var(--icon-color);
    }
`;

export default QuestionBody;
