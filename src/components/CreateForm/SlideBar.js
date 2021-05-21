import React from "react";
import styled from "styled-components";
import CloseIcon from "@material-ui/icons/Close";
import ColorLensOutlinedIcon from "@material-ui/icons/ColorLensOutlined";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import SendOutlinedIcon from "@material-ui/icons/SendOutlined";
import { IconButton } from "@material-ui/core";
import { connect } from "react-redux";
import { setStatusSlideBar } from "../../actions";

import PropTypes from "prop-types";

SlideBar.propTypes = {
    slideBar: PropTypes.object,
    setStatusSlideBar: PropTypes.func,
};

SlideBar.defaultProps = {
    slideBar: null,
    setStatusSlideBar: null,
};

function SlideBar(props) {
    var { status, title } = props.slideBar;

    var header =
        title == "layout" ? (
            <SlideLeft>
                <ColorLensOutlinedIcon className="icon" />
                &nbsp;<p> Tùy chọn giao diện</p>
            </SlideLeft>
        ) : title == "send" ? (
            <SlideLeft>
                <SendOutlinedIcon className="icon" />
                &nbsp;<p>Gửi</p>
            </SlideLeft>
        ) : title == "setting" ? (
            <SlideLeft>
                <SettingsOutlinedIcon className="icon" />
                &nbsp;<p> Cài đặt</p>
            </SlideLeft>
        ) : (
            ""
        );

    return (
        <Slide show={status}>
            <SlideHeader>
                {header}
                <SlideRight>
                    <IconButton
                        onClick={() =>
                            props.setStatusSlideBar({
                                status: false,
                                title: "",
                            })
                        }
                    >
                        <CustomClose />
                    </IconButton>
                </SlideRight>
            </SlideHeader>
        </Slide>
    );

    var showHeader = (title) => {
        return title;
    };
}

const Slide = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    background-color: #e6f7ff;
    width: 300px;
    z-index: 10;
    box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
    transform: ${(props) =>
        props.show ? "translateX(0)" : "translateX(100%)"};
    transition: transform 0.4s;
`;

const SlideHeader = styled.div`
    justify-content: space-between;
    align-items: center;
    display: flex;
    padding: 4px 6px;
    box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
    /* border-bottom: 1px solid var(--icon-color); */
`;
const SlideLeft = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    & > .icon {
        color: var(--icon-color);
    }

    & > p {
        font-weight: 600;
        font-size: 15px;
    }
`;
const SlideRight = styled.div``;
const CustomClose = styled(CloseIcon)``;

const mapStateToProps = (state) => {
    return {
        slideBar: state.slideBar,
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        setStatusSlideBar: (oStatus) => {
            dispatch(setStatusSlideBar(oStatus));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SlideBar);
