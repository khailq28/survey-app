import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import ShortTextIcon from "@material-ui/icons/ShortText";
import SubjectIcon from "@material-ui/icons/Subject";
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
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import socket from "../../socket";
import { Upload, Icon, message } from "antd";
import { ENDPOINT } from "../../constant";
import {
    changeTypeQuestion,
    changeTitleQuestion,
    setOptions,
    setQuestionImage,
} from "../../actions";

QuestionBody.propTypes = {
    question: PropTypes.object,
    changeTypeQuestion: PropTypes.func,
    changeTitleQuestion: PropTypes.func,
    setOptions: PropTypes.func,
    setQuestionImage: PropTypes.func,
};

QuestionBody.defaultProps = {
    question: null,
    changeTypeQuestion: null,
    changeTitleQuestion: null,
    setOptions: null,
    setQuestionImage: null,
};

const mapStateToProps = (state) => {
    return {
        // questions: state.survey.questions,
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        changeTypeQuestion: (value, index) => {
            dispatch(changeTypeQuestion(value, index));
        },

        changeTitleQuestion: (value, index) => {
            dispatch(changeTitleQuestion(value, index));
        },

        setOptions: (aOption, index) => {
            dispatch(setOptions(aOption, index));
        },

        setQuestionImage: (oImage, index) => {
            dispatch(setQuestionImage(oImage, index));
        },
    };
};

function QuestionBody(props) {
    let { question, index } = props;
    // let question = questions[index];

    let [options, setOptions] = useState(question.options);
    let [questionText, setQuestionText] = useState(question.questionText);
    let [questionType, setQuestionType] = useState(question.questionType);
    var [shareImage, setShareImage] = useState(question.image);

    const typingTimeOutRef = useRef(null);

    useEffect(() => {
        setQuestionText(question.questionText);
        setQuestionType(question.questionType);
        setOptions(question.options);
        setShareImage(question.image);
    }, [
        question.questionText,
        question.questionType,
        question.options,
        question.image,
    ]);

    useEffect(() => {
        socket.on("SERVER_SEND_NEW_TYPE_QUESTION", (oData) => {
            if (index === oData.index && questionType !== oData.type) {
                setQuestionType(oData.type);
            }
            props.changeTypeQuestion(oData.type, oData.index);
        });
    }, [questionType]);

    let handleChangeSelect = (e) => {
        let target = e.target;
        let value = target.type === "checked" ? target.checked : target.value;
        props.changeTypeQuestion(value, index);
        setOptions([{ optionText: "", image: "", other: false }]);
        socket.emit("CLIENT_CHANGE_QUESTION_TYPE", {
            id: question._id,
            value,
            index,
        });
    };

    useEffect(() => {
        socket.on("SERVER_SEND_NEW_TITLE_QUESTION", (oData) => {
            if (index === oData.index && questionText !== oData.title) {
                setQuestionText(oData.title);
            }

            props.changeTitleQuestion(oData.title, oData.index);
        });
    }, [questionText]);

    let handleQuestionValue = (e) => {
        let target = e.target;
        let value = target.type === "checked" ? target.checked : target.value;
        setQuestionText(value);
        props.changeTitleQuestion(value, index);

        if (typingTimeOutRef.current) {
            clearTimeout(typingTimeOutRef.current);
        }

        typingTimeOutRef.current = setTimeout(() => {
            socket.emit("CLIENT_CHANGE_TITLE_QUESTION", {
                id: question._id,
                value,
                index,
            });
        }, 300);
    };

    let handleOptionValue = (e, j) => {
        let target = e.target;
        let value = target.type === "checked" ? target.checked : target.value;
        let optionTemp = [...options];
        optionTemp[j].optionText = value;

        setOptions(optionTemp);
        props.setOptions(optionTemp, index);

        if (typingTimeOutRef.current) {
            clearTimeout(typingTimeOutRef.current);
        }

        typingTimeOutRef.current = setTimeout(() => {
            socket.emit("CLIENT_SET_OPTIONS", {
                id: question._id,
                options: optionTemp,
                index,
            });
        }, 300);
    };

    useEffect(() => {
        socket.on("SERVER_SEND_NEW_OPTIONS", (oData) => {
            setOptions(oData.options);
            props.setOptions(oData.options, oData.index);
        });
    }, [options]);

    let handleAddOption = () => {
        let optionTemp = [...options];
        let length = optionTemp.length;
        if (optionTemp[length - 1].other) {
            optionTemp.splice(length - 1, 0, {
                optionText: "",
                image: "",
                other: false,
            });
        } else {
            optionTemp.push({ optionText: "", image: "", other: false });
        }
        optionTemp.forEach((option, i) => {
            if (option.optionText === "" && !option.other) {
                optionTemp.forEach((option2, j) => {
                    if (option2.optionText === "Tùy chọn " + (i + 1)) {
                        option2.optionText = "Tùy chọn " + (j + 1);
                    }
                });
                option.optionText = "Tùy chọn " + (i + 1);
            }
        });
        setOptions(optionTemp);
        props.setOptions(optionTemp, index);
        socket.emit("CLIENT_SET_OPTIONS", {
            id: question._id,
            options: optionTemp,
            index,
        });
    };

    let handleAddOther = () => {
        let optionTemp = [...options];
        optionTemp.push({ optionText: "", other: true });
        setOptions(optionTemp);
        props.setOptions(optionTemp, index);
        socket.emit("CLIENT_SET_OPTIONS", {
            id: question._id,
            options: optionTemp,
            index,
        });
    };

    let handleRemoveOption = (j) => {
        let optionTemp = [...options];
        if (optionTemp.length > 1) {
            optionTemp.splice(j, 1);
            optionTemp.forEach((option, i) => {
                if (option.optionText.slice(0, 8) === "Tùy chọn") {
                    option.optionText = "Tùy chọn " + (i + 1);
                }
            });
            setOptions(optionTemp);
            props.setOptions(optionTemp, index);
            socket.emit("CLIENT_SET_OPTIONS", {
                id: question._id,
                options: optionTemp,
                index,
            });
        }
    };

    const handleBlur = (e, option, j) => {
        let target = e.target;
        let value = target.type === "checked" ? target.checked : target.value;
        // truong hop chuoi rong
        if (!value) {
            value = "Tùy chọn " + (j + 1);
        }
        //  gia tri giong nhau
        let optionTemp = [...options];
        optionTemp.forEach((option, i) => {
            if (value === option.optionText && i !== j) {
                value = "Tùy chọn " + (j + 1);
            }
        });
        optionTemp[j].optionText = value;
        setOptions(optionTemp);
        props.setOptions(optionTemp, index);
    };

    // according
    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    };

    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }
        var itemgg = [...options];
        var lastItem = itemgg[itemgg.length - 1];
        itemgg.splice(itemgg.length - 1, 1);
        const itemF = reorder(
            itemgg,
            result.source.index,
            result.destination.index,
        );
        itemF.push(lastItem);
        setOptions(itemF);
        props.setOptions(itemF, index);
        socket.emit("CLIENT_SET_OPTIONS", {
            id: question._id,
            options: itemF,
            index,
        });
    };

    // upload file
    const propsUpload = {
        name: "photo",
        multiple: false,
        action: ENDPOINT + "/photo",
        onChange(info) {
            const { status } = info.file;
            if (status !== "uploading") {
                console.log(info.file, info.fileList);
            }

            if (status === "done") {
                message.success(
                    `${info.file.name} file uploaded successfully.`,
                );
            } else if (status === "error") {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    const handleChangeShareImg = (e) => {
        const image = e.target.files[0];
        if (image === "" || image === undefined) {
            alert("file phải là ảnh");
            return;
        }
        setShareImage(image);
        props.setQuestionImage(image, index);
        socket.emit("CLIENT_SEND_QUESTION_IMAGE", image);
    };

    let questionCheckOrRadio = question.options.map((option, j) => {
        if (option.other) {
            return (
                <div style={{ position: "relative", marginLeft: "38px" }}>
                    <input className="text" type={questionType} disabled />
                    <OptionInput
                        type="text"
                        placeholder="   Khác..."
                        disabled
                    ></OptionInput>
                    <CustomIconButton1
                        style={{ marginLeft: "62px" }}
                        aria-label="delete"
                        onClick={() => {
                            handleRemoveOption(j);
                        }}
                    >
                        <CloseIcon className="icon-option" />
                    </CustomIconButton1>
                </div>
            );
        } else {
            return (
                <Draggable key={j} draggableId={j + "id"} index={j}>
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                        >
                            <div>
                                <div
                                    style={{
                                        marginBottom: "0px",
                                        display: "flex",
                                    }}
                                >
                                    <CustomDivDrag>
                                        <CustomDragIndicatorIcon fontSize="small" />
                                    </CustomDivDrag>
                                    <Body>
                                        <div>
                                            <input
                                                className="text"
                                                type={question.questionType}
                                                disabled
                                            />
                                            <OptionInput
                                                type="text"
                                                placeholder="Lựa chọn"
                                                value={option.optionText}
                                                onFocus={(e) =>
                                                    e.target.select()
                                                }
                                                onChange={(e) =>
                                                    handleOptionValue(e, j)
                                                }
                                                onBlur={(e) =>
                                                    handleBlur(e, option, j)
                                                }
                                            ></OptionInput>

                                            <CustomIconButton1 aria-label="image">
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
                                    </Body>
                                </div>
                            </div>
                        </div>
                    )}
                </Draggable>
            );
        }
    });

    var idQuesImg = "imgQues" + index;
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
                        {/* <CustomIconButton>
                            <input
                                type="file"
                                accept="image/png, image/jpeg"
                                id={idQuesImg}
                                style={{ display: "none" }}
                                onChange={handleChangeShareImg}
                            />
                            <label htmlFor={idQuesImg}>
                                <CustomCropOriginalIcon />
                            </label>
                        </CustomIconButton> */}

                        <Upload {...propsUpload} accept="image/png, image/jpeg">
                            <div style={{ width: "100%" }}>
                                <p className="ant-upload-text">
                                    <CustomCropOriginalIcon />
                                </p>
                            </div>
                        </Upload>

                        <CustomSelect
                            defaultValue={questionType}
                            value={questionType}
                            onChange={handleChangeSelect}
                        >
                            <CustomMenuItem value="text">
                                <ShortTextIcon className="ele-icon" />
                                &nbsp;<span>Trả lời ngắn</span>
                            </CustomMenuItem>
                            <CustomMenuItem value="textarea">
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
                        </CustomSelect>
                    </Top>
                </CustomAccordionDetails>
            </Box>

            {/* {shareImage && <img style={{ width: "100%" }} src={shareImage} />} */}

            {question.questionType === "checkbox" ||
            question.questionType === "radio" ? (
                <div>
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="droppable">
                            {(provided, snapshot) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    {questionCheckOrRadio}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                    <Body style={{ marginLeft: "37px" }}>
                        <input
                            className="text"
                            type={question.questionType}
                            disabled
                        />
                        <CustomButtonAddOption onClick={handleAddOption}>
                            Thêm tùy chọn
                        </CustomButtonAddOption>
                        {!options[options.length - 1].other ? (
                            <div>
                                &nbsp;
                                <span style={{ textTransform: "none" }}>
                                    hoặc
                                </span>
                                &nbsp;
                                <CustomButtonAddOption onClick={handleAddOther}>
                                    Thêm "khác"
                                </CustomButtonAddOption>
                            </div>
                        ) : (
                            ""
                        )}
                    </Body>
                </div>
            ) : question.questionType === "text" ? (
                <Body>
                    <CustomText type="text">
                        Văn bản câu trả lời ngắn
                    </CustomText>
                </Body>
            ) : question.questionType === "textarea" ? (
                <Body>
                    <CustomText type="textarea">
                        Văn bản câu trả lời dài
                    </CustomText>
                </Body>
            ) : (
                ""
            )}
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

    & > span > .ant-upload-list.ant-upload-list-text {
        display: none;
    }
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
    cursor: pointer;
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

const CustomText = styled.div`
    padding: 5px 0;
    margin-bottom: 5px;
    font-size: 14px;
    color: var(--icon-color);
    border-bottom: 1px solid #bdbdbd;
    text-transform: none;
    width: ${(props) =>
        props.type === "text"
            ? "250px"
            : props.type === "textarea"
            ? "330px"
            : ""};
`;

const CustomDragIndicatorIcon = styled(DragIndicatorIcon)`
    color: var(--icon-color);
`;

const CustomDivDrag = styled.div`
    cursor: all-scroll;
    padding-left: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export default connect(mapStateToProps, mapDispatchToProps)(QuestionBody);
