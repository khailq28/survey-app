import React, { useState } from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import ShortTextIcon from "@material-ui/icons/ShortText";
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import BackupIcon from "@material-ui/icons/Backup";
import LinearScaleIcon from "@material-ui/icons/LinearScale";
import AppsIcon from "@material-ui/icons/Apps";
import EventIcon from "@material-ui/icons/Event";
import ScheduleIcon from "@material-ui/icons/Schedule";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import CropOriginalIcon from "@material-ui/icons/CropOriginal";
import styled from "styled-components";
import SubjectIcon from "@material-ui/icons/Subject";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import ArrowDropDownCircleIcon from "@material-ui/icons/ArrowDropDownCircle";
import { IconButton } from "@material-ui/core";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { changeTypeQuestion, changeTitleQuestion } from "../../actions";

QuestionBox.propTypes = {
    questions: PropTypes.array,
    index: PropTypes.number,
    changeTypeQuestion: PropTypes.func,
};

QuestionBox.defaultProps = {
    questions: null,
    index: null,
    changeTypeQuestion: null,
};

const mapStateToProps = (state) => {
    return { questions: state.survey.questions };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        changeTypeQuestion: (value, index) => {
            dispatch(changeTypeQuestion(value, index));
        },

        changeTitleQuestion: (value, index) => {
            dispatch(changeTitleQuestion(value, index));
        },
    };
};

function QuestionBox(props) {
    let { questions, index } = props;
    let question = questions[index];

    let [questionText, setQuestionText] = useState(question.questionText);

    var handleChangeSelect = (e) => {
        var target = e.target;
        var value = target.type === "checked" ? target.checked : target.value;
        props.changeTypeQuestion(value, index);
    };

    var handleQuestionValue = (e) => {
        var target = e.target;
        var value = target.type === "checked" ? target.checked : target.value;
        setQuestionText(value);
        props.changeTitleQuestion(value, index);
    };

    return (
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
                        <CustomMenuItem value="short">
                            <ShortTextIcon className="ele-icon" />
                            &nbsp;<span>Trả lời ngắn</span>
                        </CustomMenuItem>
                        <CustomMenuItem value="param">
                            <SubjectIcon className="ele-icon" />
                            &nbsp;<span>Đoạn</span>
                        </CustomMenuItem>
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
                        <CustomMenuItem value="30">
                            <ArrowDropDownCircleIcon className="ele-icon" />
                            &nbsp;<span>Menu thả xuống</span>
                        </CustomMenuItem>
                        <CustomMenuItem value="40">
                            <BackupIcon className="ele-icon" />
                            &nbsp;<span>Tải tệp lên</span>
                        </CustomMenuItem>
                        <CustomMenuItem value="50">
                            <LinearScaleIcon className="ele-icon" />
                            &nbsp;<span>Phạm vi tuyến tính</span>
                        </CustomMenuItem>
                        <CustomMenuItem value="60">
                            <AppsIcon className="ele-icon" />
                            &nbsp;<span>Lưới hộp kiểm</span>
                        </CustomMenuItem>
                        <CustomMenuItem
                            value="date"
                            // onClick={(e) => {
                            //     setType(e.target.id);
                            // }}
                        >
                            <EventIcon className="ele-icon" />
                            &nbsp;<span>Ngày</span>
                        </CustomMenuItem>
                        <CustomMenuItem
                            value="time"
                            // onClick={(e) => {
                            //     setType(e.target.id);
                            // }}
                        >
                            <ScheduleIcon className="ele-icon" />
                            &nbsp;<span>Giờ</span>
                        </CustomMenuItem>
                    </CustomSelect>
                </Top>
            </CustomAccordionDetails>
        </Box>
    );
}

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

export default connect(mapStateToProps, mapDispatchToProps)(QuestionBox);
