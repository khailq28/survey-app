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
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import {
    changeOption,
    changeTypeQuestion,
    changeTitleQuestion,
    addOption,
    addOptionOther,
    removeOption,
} from "../../actions";

QuestionBody.propTypes = {
    questions: PropTypes.array,
    changeOption: PropTypes.func,
    changeTypeQuestion: PropTypes.func,
    changeTitleQuestion: PropTypes.func,
    addOption: PropTypes.func,
    addOptionOther: PropTypes.func,
    removeOption: PropTypes.func,
};

QuestionBody.defaultProps = {
    questions: null,
    changeOption: null,
    changeTypeQuestion: null,
    changeTitleQuestion: null,
    addOption: null,
    addOptionOther: null,
    removeOption: null,
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

        addOption: (index) => {
            dispatch(addOption(index));
        },

        addOptionOther: (index) => {
            dispatch(addOptionOther(index));
        },

        removeOption: (i, j) => {
            dispatch(removeOption(i, j));
        },
    };
};

function QuestionBody(props) {
    let { questions, index } = props;
    let question = questions[index];

    let [options, setOptions] = useState(question.options);
    let [questionText, setQuestionText] = useState(question.questionText);
    let [type, setType] = useState(question.questionType);

    let handleChangeSelect = (e) => {
        let target = e.target;
        let value = target.type === "checked" ? target.checked : target.value;
        props.changeTypeQuestion(value, index);
        setType(value);
    };

    let handleQuestionValue = (e) => {
        let target = e.target;
        let value = target.type === "checked" ? target.checked : target.value;
        setQuestionText(value);
        props.changeTitleQuestion(value, index);
    };

    let handleOptionValue = (e, j) => {
        let target = e.target;
        let value = target.type === "checked" ? target.checked : target.value;
        let optionTemp = [...options];
        optionTemp[j].optionText = value;

        setOptions(optionTemp);
        props.changeOption(value, index, j);
    };

    let handleAddOption = () => {
        let optionTemp = [...options];
        let length = optionTemp.length;
        if (optionTemp[length - 1].other) {
            optionTemp.splice(length - 1, 0, {
                optionText: "",
            });
        } else {
            optionTemp.push({ optionText: "" });
        }
        setOptions(optionTemp);
        props.addOption(index);
    };

    let handleAddOther = () => {
        let optionTemp = [...options];
        optionTemp.push({ other: true });
        setOptions(optionTemp);
        props.addOptionOther(index);
    };

    let handleRemoveOption = (j) => {
        let optionTemp = [...options];
        if (optionTemp.length > 1) {
            optionTemp.splice(j, 1);
            setOptions(optionTemp);
            props.removeOption(index, j);
        }
    };

    let questionUI = question.options.map((option, j) => {
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
                {option.other ? (
                    <div style={{ position: "relative" }}>
                        <input className="text" type={type} disabled />
                        <OptionInput
                            type="text"
                            placeholder="Khác..."
                            disabled
                        ></OptionInput>
                        <CustomIconButton1
                            aria-label="delete"
                            style={{ position: "absolute", right: "-96px" }}
                            onClick={() => {
                                handleRemoveOption(j);
                            }}
                        >
                            <CloseIcon className="icon-option" />
                        </CustomIconButton1>
                    </div>
                ) : (
                    <div>
                        <input className="text" type={type} disabled />
                        <OptionInput
                            type="text"
                            placeholder="Lựa chọn"
                            value={option.optionText}
                            onChange={(e) => handleOptionValue(e, j)}
                        ></OptionInput>

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
                            onClick={() => {
                                handleRemoveOption(j);
                            }}
                        >
                            <CloseIcon className="icon-option" />
                        </CustomIconButton1>
                    </div>
                )}
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

            <Body>
                <input className="text" type={type} disabled />
                <CustomButtonAddOption onClick={handleAddOption}>
                    Thêm tùy chọn
                </CustomButtonAddOption>
                {!options[options.length - 1].other ? (
                    <div>
                        &nbsp;
                        <span style={{ textTransform: "none" }}>hoặc</span>
                        &nbsp;
                        <CustomButtonAddOther onClick={handleAddOther}>
                            Thêm "khác"
                        </CustomButtonAddOther>
                    </div>
                ) : (
                    ""
                )}
            </Body>
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

const CustomButtonAddOption = styled(Button)`
    text-transform: none !important;
    color: var(--icon-color) !important;
    font-size: 13px !important;
    font-weight: 400 !important;
`;

const CustomButtonAddOther = styled(Button)`
    text-transform: none !important;
    color: var(--basic-color) !important;
    font-size: 13px !important;
    font-weight: 600 !important;
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
