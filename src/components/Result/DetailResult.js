import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { connect } from "react-redux";
import {} from "../../actions";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import IconButton from "@material-ui/core/IconButton";
import SubmitTitle from "../SubmitForm/SubmitTitle";
import DetailBody from "./DetailBody";
import socket from "../../socket";

DetailResult.propTypes = {
    submiter: PropTypes.array,
    survey: PropTypes.object,
};

DetailResult.defaultProps = { submiter: null, survey: null };

const mapStateToProps = (state) => {
    return { submiter: state.survey.submiter, survey: state.survey };
};

const mapDispatchToProps = (dispatch, props) => {
    return {};
};

function DetailResult(props) {
    var [value, setValue] = useState(0);

    const typingTimeOutRef = useRef(null);

    useEffect(() => {
        if (props.submiter.length > 0) {
            setValue(1);
        } else {
            setValue(0);
        }
    }, []);

    useEffect(() => {
        setValue(1);
    }, [props.survey]);

    const handleChange = (e) => {
        if (e.nativeEvent.data >= 0 && e.nativeEvent.data <= 9) {
            var iPage = e.target.value
                ? parseInt(e.target.value)
                : e.target.value;
            if (
                (iPage < 1 && iPage !== "") ||
                (iPage > props.submiter.length && iPage !== "")
            ) {
                setValue(1);
            } else {
                setValue(iPage);
            }

            if (typingTimeOutRef.current) {
                clearTimeout(typingTimeOutRef.current);
            }

            typingTimeOutRef.current = setTimeout(() => {
                // setValue(e.target.value);
            }, 500);
        }
    };

    const handleBack = () => {
        if (parseInt(value) > 1) setValue(parseInt(value) - 1);
    };

    const handleNext = () => {
        if (parseInt(value) < props.submiter.length)
            setValue(parseInt(value) + 1);
    };

    const handleDeleteResult = (name) => {
        var arrAns = [];
        var oData = {};
        props.survey.questions.forEach((ques, i) => {
            ques.answers.forEach((ans, j) => {
                if (ans.user === name) {
                    arrAns.push({ idQues: ques._id, idAns: ans._id });
                    return true;
                }
            });
        });

        props.survey.submiter.forEach((sub, i) => {
            if (sub.name === name) {
                oData.idSub = sub._id;
                return true;
            }
        });

        oData.idForm = props.survey._id;
        oData.answers = arrAns;

        socket.emit("CLIENT_DELETE_RESULT", oData);
    };

    return (
        <>
            <Box style={{ marginTop: "10px" }}>
                <div style={{ textTransform: "none" }}>
                    <span style={{ fontSize: "18px" }}>Email người làm: </span>

                    <span style={{ color: "blue", fontSize: "18px" }}>
                        {props.submiter.length > 0 && value > 0 && value !== ""
                            ? props.submiter[value - 1].name
                            : ""}
                    </span>
                </div>
                <Tool>
                    <Left>
                        <IconButton
                            onClick={handleBack}
                            disabled={
                                (value === 1 && value !== "") ||
                                (value === 0 && value !== "")
                                    ? true
                                    : false
                            }
                        >
                            <ArrowBackIosIcon />
                        </IconButton>
                        <input
                            type="number"
                            value={value}
                            onChange={handleChange}
                            onFocus={(e) => e.target.select()}
                        />
                        <span>/</span>
                        <span>{props.submiter.length}</span>
                        <IconButton
                            onClick={handleNext}
                            disabled={
                                (value === props.submiter.length &&
                                    value !== "") ||
                                (value === 0 && value !== "")
                                    ? true
                                    : false
                            }
                        >
                            <ArrowForwardIosIcon />
                        </IconButton>
                    </Left>
                    <Right>
                        <IconButton
                            onClick={() =>
                                handleDeleteResult(
                                    props.submiter[value - 1].name,
                                )
                            }
                        >
                            <DeleteOutlineIcon />
                        </IconButton>
                    </Right>
                </Tool>
            </Box>

            <SubmitTitle />
            {value ? <DetailBody index={value - 1} /> : ""}


            <Created>Đã gửi lúc {props.submiter.length > 0 && value > 0 && value !== ""
                            ? props.submiter[value - 1].created
                            : ""}</Created>
        </>
    );
}

const Created = styled.div`
    padding-top: 5px;
    color: var(--icon-color);
    text-align: right;
`;

const Box = styled.div`
    background-color: white;
    border-radius: 6px;
    padding: 25px 20px;
    width: 750px;
    box-shadow: 0 0 0 2px rgb(0 0 0 / 20%), 0 0 0 rgb(0 0 0 / 25%);
    margin-top: 10px;
    margin-bottom: 10px;

    @media (max-width: 768px) {
        width: 96%;
        margin-left: auto;
        margin-right: auto;
    }
`;

const Tool = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 5px;
`;

const Left = styled.div`
    color: black;
    box-sizing: border-box;
    font-size: 14px;
    font-weight: 400;
    line-height: 135%;

    & > span {
        margin-left: 10px;
        font-size: 16px;
    }

    & > input {
        font-size: 16px;
        border: none;
        box-shadow: none;
        background-color: #eef3f8;
        border-radius: 2px;
        border-color: #dce6f1;
        width: 30px;
        text-align: right;
    }
`;

const Right = styled.div`
    color: var(--icon-color);
    box-sizing: border-box;
    font-size: 14px;
    line-height: 135%;
`;

export default connect(mapStateToProps, mapDispatchToProps)(DetailResult);
