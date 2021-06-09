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
import { ENDPOINT } from "../../constant";
import {
    changeTypeQuestion,
    changeTitleQuestion,
    setOptions,
    setQuestionImage,
    setStatusDialogUploadOp,
    setOptionImage,
} from "../../actions";

QuestionBody.propTypes = {
    survey: PropTypes.object,
    idForm: PropTypes.string,
    question: PropTypes.object,
    changeTypeQuestion: PropTypes.func,
    changeTitleQuestion: PropTypes.func,
    setOptions: PropTypes.func,
    setQuestionImage: PropTypes.func,
    setStatusDialogUploadOp: PropTypes.func,
    setOptionImage: PropTypes.func,
};

QuestionBody.defaultProps = {
    survey: null,
    idForm: null,
    question: null,
    changeTypeQuestion: null,
    changeTitleQuestion: null,
    setOptions: null,
    setQuestionImage: null,
    setStatusDialogUploadOp: null,
    setOptionImage: null,
};

const mapStateToProps = (state) => {
    return {
        survey: state.survey,
        idForm: state.survey._id,
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

        setQuestionImage: (sImage, index) => {
            dispatch(setQuestionImage(sImage, index));
        },

        setStatusDialogUploadOp: (indexQues, indexOption) => {
            dispatch(setStatusDialogUploadOp(indexQues, indexOption));
        },

        setOptionImage: (image, indexQues, indexOption) => {
            dispatch(setOptionImage(image, indexQues, indexOption));
        },
    };
};

function QuestionBody(props) {
    var { question, index, idForm } = props;
    // var question = questions[index];

    var [options, setOptions] = useState(question.options);
    var [questionText, setQuestionText] = useState(question.questionText);
    var [questionType, setQuestionType] = useState(question.questionType);
    var [shareImage, setShareImage] = useState(question.image);

    useEffect(() => {
        setOptions(question.options);
        setQuestionText(question.questionText);
        setQuestionType(question.questionType);
        setShareImage(question.image);
    }, [question]);

    const typingTimeOutRef = useRef(null);

    useEffect(() => {
        socket.on("SERVER_SEND_MSG_QUESTION_IMAGE", (oImage) => {
            if (idForm === oImage.idForm && index === oImage.index) {
                setShareImage(oImage.image);
                props.setQuestionImage(oImage.image, oImage.index);
            }
        });
    }, [idForm, props.survey]);

    useEffect(() => {
        socket.on("SERVER_SEND_NEW_TYPE_QUESTION", (oData) => {
            if (
                index === oData.index &&
                questionType !== oData.type &&
                idForm === oData.idForm
            ) {
                setOptions(oData.options);
                props.setOptions(oData.options, oData.index);
                setQuestionType(oData.type);
                props.changeTypeQuestion(oData.type, oData.index);
            }
        });
    }, [question.questionType, idForm]);

    var handleChangeSelect = (e) => {
        var target = e.target;
        var value = target.type === "checked" ? target.checked : target.value;
        setQuestionType(value);
        props.changeTypeQuestion(value, index);
        setOptions([{ optionText: "Tùy chọn 1", image: "", other: false }]);
        props.setOptions(
            [{ optionText: "Tùy chọn 1", image: "", other: false }],
            index,
        );
        socket.emit("CLIENT_CHANGE_QUESTION_TYPE", {
            id: question._id,
            value,
            index,
            idForm,
        });
    };

    useEffect(() => {
        socket.on("SERVER_SEND_NEW_TITLE_QUESTION", (oData) => {
            if (
                index === oData.index &&
                questionText !== oData.title &&
                idForm === oData.idForm
            ) {
                // console.log("sss");
                setQuestionText(oData.title);
                props.changeTitleQuestion(oData.title, oData.index);
            }
        });
    }, [question.questionText, idForm]);

    var handleQuestionValue = (e) => {
        var target = e.target;
        var value = target.type === "checked" ? target.checked : target.value;
        setQuestionText(value);

        if (typingTimeOutRef.current) {
            clearTimeout(typingTimeOutRef.current);
        }

        typingTimeOutRef.current = setTimeout(() => {
            props.changeTitleQuestion(value, index);
            socket.emit("CLIENT_CHANGE_TITLE_QUESTION", {
                id: question._id,
                value,
                index,
                idForm,
            });
        }, 1000);
    };

    var handleOptionValue = (e, j) => {
        var target = e.target;
        var value = target.type === "checked" ? target.checked : target.value;
        var optionTemp = [...options];
        optionTemp[j].optionText = value;

        setOptions(optionTemp);

        if (typingTimeOutRef.current) {
            clearTimeout(typingTimeOutRef.current);
        }

        typingTimeOutRef.current = setTimeout(() => {
            props.setOptions(optionTemp, index);
            socket.emit("CLIENT_SET_OPTIONS", {
                id: question._id,
                options: optionTemp,
                index,
                idForm,
            });
        }, 300);
    };

    useEffect(() => {
        socket.on("SERVER_SEND_NEW_OPTIONS", (oData) => {
            if (idForm === oData.idForm) {
                setOptions(oData.options);
                props.setOptions(oData.options, oData.index);
            }
        });
    }, [question.options, idForm]);

    var handleAddOption = () => {
        var optionTemp = [...options];
        var length = optionTemp.length;
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
            idForm,
        });
    };

    var handleAddOther = () => {
        var optionTemp = [...options];
        optionTemp.push({ optionText: "", other: true });
        setOptions(optionTemp);
        props.setOptions(optionTemp, index);
        socket.emit("CLIENT_SET_OPTIONS", {
            id: question._id,
            options: optionTemp,
            index,
            idForm,
        });
    };

    var handleRemoveOption = (j) => {
        var optionTemp = [...options];
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
                idForm,
            });
        }
    };

    const handleBlur = (e, option, j) => {
        var target = e.target;
        var value = target.type === "checked" ? target.checked : target.value;
        // truong hop chuoi rong
        if (!value) {
            value = "Tùy chọn " + (j + 1);
        }
        //  gia tri giong nhau
        var optionTemp = [...options];
        optionTemp.forEach((option, i) => {
            if (value === option.optionText && i !== j) {
                value = "Tùy chọn " + (j + 1);
            }
        });
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
        // console.log(optionTemp);
        // // optionTemp[j].optionText = value;
        setOptions(optionTemp);
        socket.emit("CLIENT_SET_OPTIONS", {
            id: question._id,
            options: optionTemp,
            index,
            idForm,
        });
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
            idForm,
        });
    };

    // upload file
    const handleUploadQuesImg = (e) => {
        const image = e.target.files[0];
        if (image === "" || image === undefined) {
            alert("file phải là ảnh");
            return;
        }

        const formData = new FormData();

        formData.append("photo", image);
        formData.append("idForm", props.survey._id);
        formData.append("idQues", question._id);
        formData.append("index", index);

        fetch(ENDPOINT + "/setQuestionImage", {
            method: "POST",
            body: formData,
        })
            .then((response) => response.json())
            .then((result) => {
                socket.emit("CLIENT_SET_QUESTION_IMAGE", {
                    idForm: props.survey._id,
                    image: result.image,
                    index,
                });
            })
            .catch();
    };

    const handleClickUploadOption = (i, j) => {
        props.setStatusDialogUploadOp(i, j);
    };

    const handleDeleteQuesImg = () => {
        socket.emit("CLIENT_DELETE_QUESTION_IMAGE", {
            sIdQuestion: question._id,
            path: question.image,
            index,
            idForm,
        });
    };

    const handleDeleteOpImg = (j) => {
        socket.emit("CLIENT_DELETE_OPTION_IMAGE", {
            idForm,
            sIdQuestion: question._id,
            sIdOption: question.options[j]._id,
            path: question.options[j].image,
            indexQues: index,
            indexOption: j,
        });
    };

    var questionCheckOrRadio = (i, aOptions) => {
        var result = aOptions.map((op, j) => {
            return op.other ? (
                <div
                    key={j}
                    style={{ position: "relative", marginLeft: "38px" }}
                >
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
            ) : (
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
                                    <div>
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
                                                    value={op.optionText}
                                                    onFocus={(e) =>
                                                        e.target.select()
                                                    }
                                                    onChange={(e) =>
                                                        handleOptionValue(e, j)
                                                    }
                                                    onBlur={(e) =>
                                                        handleBlur(e, op, j)
                                                    }
                                                ></OptionInput>

                                                <CustomIconButton1
                                                    onClick={() =>
                                                        handleClickUploadOption(
                                                            i,
                                                            j,
                                                        )
                                                    }
                                                >
                                                    <CustomCropOriginalIcon />
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
                                        {op.image && (
                                            <OptionImage
                                                onClick={() =>
                                                    handleDeleteOpImg(j)
                                                }
                                            >
                                                <img
                                                    src={
                                                        ENDPOINT +
                                                        "/" +
                                                        op.image.slice(7)
                                                    }
                                                    alt=""
                                                />
                                                <div>
                                                    <CloseIcon />
                                                </div>
                                            </OptionImage>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </Draggable>
            );
        });
        return result;
    };

    return (
        <div>
            <Box>
                <CustomAccordionDetails>
                    <Top>
                        <QuestionInput
                            type="text"
                            placeholder="Câu hỏi"
                            value={questionText}
                            onFocus={(e) => e.target.select()}
                            onChange={handleQuestionValue}
                        ></QuestionInput>
                        <CustomIconButton>
                            <input
                                type="file"
                                accept="image/png, image/jpeg"
                                id={"imgQues" + index}
                                style={{ display: "none" }}
                                onChange={handleUploadQuesImg}
                            />
                            <label htmlFor={"imgQues" + index}>
                                <CustomCropOriginalIcon />
                            </label>
                        </CustomIconButton>

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

            {shareImage && (
                <QuestionImage onClick={handleDeleteQuesImg}>
                    <img src={ENDPOINT + "/" + shareImage.slice(7)} alt="" />
                    <div>
                        <CloseIcon />
                    </div>
                </QuestionImage>
            )}

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
                                    {questionCheckOrRadio(
                                        index,
                                        question.options,
                                    )}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                    <Body style={{ marginLeft: "39px" }}>
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
    font-size: 14px;
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

const QuestionImage = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;

    & > img {
        width: 80%;
        box-shadow: 0 0 0 1px rgb(0 0 0 / 20%), 0 0 0 rgb(0 0 0 / 40%);
    }

    & > div {
        border: 1.5px solid rgb(181 154 63 / 95%);
        border-radius: 50%;
        background-color: #68645f69;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        margin-left: 5px;
    }
`;

const OptionImage = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    margin-left: 20px;

    & > img {
        width: 270px;
        box-shadow: 0 0 0 1px rgb(0 0 0 / 20%), 0 0 0 rgb(0 0 0 / 40%);
    }

    & > div {
        border: 1.5px solid rgb(181 154 63 / 95%);
        border-radius: 50%;
        background-color: #68645f69;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        margin-left: 5px;
    }
`;

export default connect(mapStateToProps, mapDispatchToProps)(QuestionBody);
