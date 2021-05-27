import React, { useState } from "react";
import PropTypes from "prop-types";
// import ShortTextIcon from "@material-ui/icons/ShortText";
import CropOriginalIcon from "@material-ui/icons/CropOriginal";
import { IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import styled from "styled-components";
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { connect } from "react-redux";
import {
    changeOption,
    changeTypeQuestion,
    changeTitleQuestion,
} from "../../actions";

QuestionBody.propTypes = {
    questions: PropTypes.array,
    changeOption: PropTypes.func,
    changeTypeQuestion: PropTypes.func,
    changeTitleQuestion: PropTypes.func,
};

QuestionBody.defaultProps = {
    questions: null,
    changeOption: null,
    changeTypeQuestion: null,
    changeTitleQuestion: null,
};

const mapStateToProps = (state) => {
    return { questions: state.survey.questions };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        changeOption: (value, i, j) => {
            dispatch(changeOption(value, i, j));
        },

        changeTypeQuestion: (value, index) => {
            dispatch(changeTypeQuestion(value, index));
        },

        changeTitleQuestion: (value, index) => {
            dispatch(changeTitleQuestion(value, index));
        },
    };
};

function QuestionBody(props) {
    let { questions, index } = props;
    let question = questions[index];

    let [option, setOption] = useState(question.options);
    let [questionText, setQuestionText] = useState(question.questionText);
    let [type, setType] = useState(question.questionType);

    var handleChangeSelect = (e) => {
        var target = e.target;
        var value = target.type === "checked" ? target.checked : target.value;
        props.changeTypeQuestion(value, index);
        setType(value);
    };

    var handleQuestionValue = (e) => {
        var target = e.target;
        var value = target.type === "checked" ? target.checked : target.value;
        setQuestionText(value);
        props.changeTitleQuestion(value, index);
    };

    let handleOptionValue = (e, j) => {
        let target = e.target;
        let value = target.type === "checked" ? target.checked : target.value;
        let optionTemp = [...option];
        optionTemp[j].optionText = value;

        setOption(optionTemp);
        props.changeOption(value, index, j);
    };

    let questionUI = question.options.map((op, j) => {
        return (
            <Body key={j}>
                {/* <Checkbox  color="primary" inputProps={{ 'aria-label': 'secondary checkbox' }} disabled/> */}
                {/* {question.questionType !== "text" ? (
                    <input
                        className="text"
                        type={question.questionType}
                        disabled
                    />
                ) : (
                    <ShortTextIcon className="text" />
                )} */}
                <input className="text" type={type} disabled />
                <div>
                    <OptionInput
                        type="text"
                        placeholder="Lựa chọn"
                        value={option[j].optionText}
                        onChange={(e) => handleOptionValue(e, j)}
                    ></OptionInput>
                </div>

                <CustomIconButton1
                    aria-label="image"
                    // onClick={() => {
                    //     removeOption(i, j);
                    // }}
                >
                    <CropOriginalIcon className="icon-option" />
                </CustomIconButton1>

                <CustomIconButton1
                    aria-label="delete"
                    // onClick={() => {
                    //     removeOption(i, j);
                    // }}
                >
                    <CloseIcon className="icon-option" />
                </CustomIconButton1>
            </Body>
        );
    });

    return (
        <div>
            <Box>
                <CustomAccordionDetails>
                    <Top>
                        <QuestionInput
                            type="text"
                            placeholder="Câu hỏi"
                            value={questionText}
                            onChange={handleQuestionValue}
                        ></QuestionInput>
                        <CustomIconButton>
                            <CustomCropOriginalIcon />
                        </CustomIconButton>

                        <CustomSelect
                            defaultValue={question.questionType}
                            onChange={handleChangeSelect}
                        >
                            <CustomMenuItem value="radio">
                                <RadioButtonCheckedIcon
                                    checked
                                    className="ele-icon"
                                />
                                &nbsp;<span>Trắc nghiệm</span>
                            </CustomMenuItem>
                            <CustomMenuItem value="checkbox">
                                <CheckBoxIcon checked className="ele-icon" />
                                &nbsp;<span>Hộp kiểm</span>
                            </CustomMenuItem>
                        </CustomSelect>
                    </Top>
                </CustomAccordionDetails>
            </Box>

            {questionUI}
        </div>
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
    width: 550px;
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
        width: 270px;
    }

    @media only screen and (max-width: 479px) {
        width: 170px;
    }
`;

const CustomIconButton1 = styled(IconButton)`
    .icon-option {
        color: var(--icon-color);
    }
`;

const Box = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`;

const CustomAccordionDetails = styled(AccordionDetails)`
    background-color: white;
    border-radius: 8px;
    text-transform: capitalize;
    display: flex;
    flex-direction: column;
    padding: 0px 10px 25px 10px;
    width: 100%;
`;

const Top = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

const QuestionInput = styled.input`
    box-sizing: border-box;
    margin-top: 10px;
    font-family: "Google Sans", Roboto, Arial, sans-serif;
    font-size: 15px;
    font-weight: 400;
    flex: 1;
    line-height: 40px;
    width: 40%;
    border: none;
    outline: none;
    color: black;
    height: 40px;
    margin-right: 10px;
    line-height: 10px;
    padding: 10px;
    border-bottom: 2px solid var(--icon-color);
    border-radius: 0 0 2px 2px;
    transition: border-bottom 0.2s ease-in-out;

    &:focus {
        border-bottom: 2px solid var(--basic-color);
        border-bottom-width: 3px;
    }
`;

const CustomCropOriginalIcon = styled(CropOriginalIcon)`
    color: var(--icon-color);
`;

const CustomSelect = styled(Select)`
    height: 40px;
    width: 30%;
    border: 0.5px solid;
    color: var(--icon-color);
    font-size: 13px;
    margin-left: 10px;
    margin-right: 10px;
    border: 1.5px solid #f4f4f9;
    border-radius: 3px;
    background: transparent;
    position: relative;

    .ele-icon {
        color: var(--icon-color);
        position: absolute;
        top: 5px;
    }

    span {
        margin-left: 22px;
        color: var(--icon-color);
    }
`;

const CustomMenuItem = styled(MenuItem)`
    height: 50px;
    .ele-icon {
        color: var(--icon-color);
    }
`;

const CustomIconButton = styled(IconButton)`
    padding: 2px !important;
`;

export default connect(mapStateToProps, mapDispatchToProps)(QuestionBody);
