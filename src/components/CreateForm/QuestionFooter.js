import React, { useState } from "react";
import { IconButton } from "@material-ui/core";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import styled from "styled-components";
import Switch from "@material-ui/core/Switch";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { changeReruied } from "../../actions";

QuestionFooter.propTypes = {
    questions: PropTypes.array,
    changeReruied: PropTypes.func,
    copyQuestion: PropTypes.func,
};

QuestionFooter.defaultProps = {
    questions: null,
    changeReruied: null,
    copyQuestion: null,
};

const mapStateToProps = (state) => {
    return {
        questions: state.survey.questions,
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
    let { questions, index } = props;
    let question = questions[index];

    let [required, setRequired] = useState(question.required);

    let handleSwitch = () => {
        let updateRequired = !required;
        setRequired(updateRequired);
        props.changeReruied(index);
    };

    let handleCopyQuestion = () => {
        props.copyQuestion(index);
    };

    return (
        <Footer>
            <Right>
                <CustomIconButton
                    aria-label="Copy"
                    onClick={handleCopyQuestion}
                >
                    <FileCopyOutlinedIcon className="icon" />
                </CustomIconButton>
                <CustomIconButton
                    aria-label="delete"
                    // onClick={() => {
                    //     deleteQuestion(i);
                    // }}
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
