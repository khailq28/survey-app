import React, { useEffect, useState } from "react";
import { IconButton } from "@material-ui/core";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import styled from "styled-components";
import Switch from "@material-ui/core/Switch";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { changeReruied } from "../../actions";
import socket from "../../socket";

QuestionFooter.propTypes = {
    question: PropTypes.object,
    changeReruied: PropTypes.func,
    handleCopyQuestion: PropTypes.func,
    handleDeleteQuestion: PropTypes.func,
};

QuestionFooter.defaultProps = {
    question: null,
    changeReruied: null,
    handleCopyQuestion: null,
    handleDeleteQuestion: null,
};

const mapStateToProps = (state) => {
    return {
        // questions: state.survey.questions,
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        // i: vi tri cau hoi
        changeReruied: (i) => {
            dispatch(changeReruied(i));
        },
    };
};

function QuestionFooter(props) {
    let { question, index } = props;
    // let question = questions[index];

    let [required, setRequired] = useState(question.required);

    useEffect(() => {
        setRequired(question.required);
    }, [question.required]);

    console.log(required);

    useEffect(() => {
        socket.on("SERVER_SEND_NEW_REQUIRED", (oData) => {
            props.changeReruied(oData.index);
            setRequired(oData.bRequire);
        });
    }, [required]);

    let handleSwitch = () => {
        let updateRequired = !required;
        setRequired(updateRequired);
        props.changeReruied(index);

        socket.emit("CLIENT_CHANGE_REQUIRE", {
            id: question._id,
            value: updateRequired,
            index,
        });
    };

    return (
        <Footer>
            <Right>
                <CustomIconButton
                    aria-label="Copy"
                    onClick={() => props.handleCopyQuestion(index)}
                >
                    <FileCopyOutlinedIcon className="icon" />
                </CustomIconButton>
                <CustomIconButton
                    aria-label="delete"
                    onClick={() => props.handleDeleteQuestion(index)}
                >
                    <DeleteOutlineOutlinedIcon className="icon" />
                </CustomIconButton>
                <span id="text">Required</span>
                &nbsp;
                <Switch
                    name="checkedA"
                    color="primary"
                    checked={required}
                    onClick={handleSwitch}
                />
                <CustomIconButton>
                    <MoreVertIcon />
                </CustomIconButton>
            </Right>
        </Footer>
    );
}

const Footer = styled.div`
    display: flex;
    justify-content: flex-end;
    border-top: 1px solid rgba(118, 118, 118, 0.3);
`;

const Right = styled.div`
    margin-top: 12px;
    display: flex;
    /* float: right !important; */
    align-items: center;
    justify-content: center;
    right: 0;

    #text {
        color: var(--icon-color);
        font-size: 13px;
        font-weight: 600;
    }
`;

const CustomIconButton = styled(IconButton)`
    .icon {
        color: var(--icon-color);
        font-size: 25px;
    }
`;

export default connect(mapStateToProps, mapDispatchToProps)(QuestionFooter);
