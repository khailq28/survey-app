import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import CropOriginalIcon from "@material-ui/icons/CropOriginal";
import { setStatusDialogUploadOp } from "../../actions";
import { connect } from "react-redux";
import { ENDPOINT } from "../../constant";
import socket from "../../socket";

DialogUpload.propTypes = {
    setStatusDialogUploadOp: PropTypes.func,
    indexQues: PropTypes.number,
    indexOption: PropTypes.number,
    idForm: PropTypes.string,
    survey: PropTypes.object,
};

DialogUpload.defaultProps = {
    setStatusDialogUploadOp: null,
    indexQues: -1,
    indexOption: -1,
    idForm: null,
    survey: null,
};

const mapStateToProps = (state) => {
    return {
        dialogShow: state.tools.dialogUpload.show,
        indexQues: state.tools.dialogUpload.indexQues,
        indexOption: state.tools.dialogUpload.indexOption,
        idForm: state.survey._id,
        survey: state.survey,
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        setStatusDialogUploadOp: (indexQues, indexOption) => {
            dispatch(setStatusDialogUploadOp(indexQues, indexOption));
        },
    };
};

function DialogUpload(props) {
    var { survey, indexQues, indexOption } = props;

    const handleUploadQuesImg = (e) => {
        const image = e.target.files[0];
        if (image === "" || image === undefined) {
            alert("file phải là ảnh");
            return;
        }
        const formData = new FormData();
        formData.append("photo", image);
        formData.append("idForm", survey._id);
        formData.append("idQues", survey.questions[indexQues]._id);
        formData.append("indexQues", indexQues);
        formData.append("indexOption", indexOption);
        fetch(ENDPOINT + "/setOptionImage", {
            method: "POST",
            body: formData,
        })
            .then((response) => response.json())
            .then((result) => {
                props.setStatusDialogUploadOp(-1, -1);
                socket.emit("CLIENT_SET_OPTION_IMAGE", {
                    image: result.image,
                    id: indexQues,
                    indexOption: indexOption,
                    index: indexQues,
                    idForm: props.idForm,
                });
            })
            .catch();
    };

    return (
        <Background show={props.dialogShow}>
            <Dialog>
                <Title>
                    <input
                        type="file"
                        accept="image/png, image/jpeg"
                        id={"imgQues"}
                        style={{ display: "none" }}
                        onChange={(e) => handleUploadQuesImg(e)}
                    />
                    <CustomLabel htmlFor={"imgQues"}>
                        <CustomCropOriginalIcon />
                        <span>Chọn hình ảnh</span>
                    </CustomLabel>
                </Title>
                <IconButton
                    onClick={() => props.setStatusDialogUploadOp("", "")}
                >
                    <CloseIcon />
                </IconButton>
            </Dialog>
        </Background>
    );
}

const Background = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: 0.4s;
    background-color: rgba(14, 42, 71, 0.9);
    ${(props) =>
        props.show
            ? `
                z-index: 99;
                opacity: 1;
            `
            : `
                z-index: -1;
                opacity: 0;
            `}
`;

const Dialog = styled.div`
    background-color: white;
    width: 280px;
    height: 60px;
    border-radius: 20px;
    position: fixed;
    top: 50%;
    left: 50%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transform: translateX(-50%) translateY(-50%);
`;

const Title = styled.div`
    font-size: 16px;
    font-family: Roboto, Arial, sans-serif !important;
    font-weight: 600;
    letter-spacing: 0.3px;
    line-height: 16px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
`;

const CustomCropOriginalIcon = styled(CropOriginalIcon)`
    color: var(--basic-color);
    cursor: pointer;
`;

const CustomLabel = styled.label`
    margin-left: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid var(--icon-color);
    /* background-color: red; */
    width: auto;
    padding: 4px;
    cursor: pointer;
    box-sizing: border-box;

    & > span {
        color: var(--basic-color);
        font-weight: 600;
        margin-left: 5px;
    }

    &:hover {
        border: 3px solid var(--basic-color);
        transition-duration: 200ms;
    }
`;

export default connect(mapStateToProps, mapDispatchToProps)(DialogUpload);
