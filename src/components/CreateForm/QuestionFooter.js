import React from "react";
import Button from "@material-ui/core/Button";
import AssignmentTurnedInOutlinedIcon from "@material-ui/icons/AssignmentTurnedInOutlined";
import { IconButton } from "@material-ui/core";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import styled from "styled-components";
import Switch from "@material-ui/core/Switch";
// import PropTypes from 'prop-types';

// QuestionFooter.propTypes = {

// };

function QuestionFooter(props) {
    return (
        <Footer>
            <Left>
                <CustomButton
                    size="small"
                    // onClick={() => {
                    //     addAnswer(i);
                    // }}
                >
                    <AssignmentTurnedInOutlinedIcon className="icon" />
                    &nbsp;<span>Đáp án</span>
                </CustomButton>
            </Left>

            <Right>
                <CustomIconButton
                    aria-label="Copy"
                    // onClick={() => {
                    //     copyQuestion(i);
                    // }}
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
                    // checked={ques.required}
                    // onClick={() => {
                    //     requiredQuestion(i);
                    // }}
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
    justify-content: space-between;
    border-top: 1px solid rgba(118, 118, 118, 0.3);
`;

const Left = styled.div`
    margin-top: 12px;
    margin-left: 10px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;

const CustomButton = styled(Button)`
    .icon {
        color: var(--basic-color);
        font-size: 25px;
    }

    span {
        color: var(--basic-color);
        font-weight: 600;
    }
`;

const Right = styled.div`
    margin-top: 12px;
    display: flex;
    justify-content: flex-end;
    align-items: center;

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

export default QuestionFooter;
