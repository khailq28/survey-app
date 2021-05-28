import React from "react";
import styled from "styled-components";
import CloseIcon from "@material-ui/icons/Close";
import ColorLensOutlinedIcon from "@material-ui/icons/ColorLensOutlined";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import SendOutlinedIcon from "@material-ui/icons/SendOutlined";
import { IconButton } from "@material-ui/core";
import { connect } from "react-redux";
import {
    setStatusSlideBar,
    setInterfaceColor,
    setBackgroundColor,
} from "../../actions";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

import PropTypes from "prop-types";

SlideBar.propTypes = {
    slideBar: PropTypes.object,
    setStatusSlideBar: PropTypes.func,
    colorList: PropTypes.array,
    setInterfaceColor: PropTypes.func,
    setBackgroundColor: PropTypes.func,
    interfaceColor: PropTypes.string,
    backgroundColor: PropTypes.string,
};

SlideBar.defaultProps = {
    slideBar: null,
    setStatusSlideBar: null,
    colorList: null,
    setInterfaceColor: null,
    setBackgroundColor: null,
    interfaceColor: null,
    backgroundColor: null,
};

const mapStateToProps = (state) => {
    return {
        slideBar: state.slideBar,
        colorList: state.color,
        interfaceColor: state.survey.interfaceColor,
        backgroundColor: state.survey.backgroundColor,
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        setStatusSlideBar: (oStatus) => {
            dispatch(setStatusSlideBar(oStatus));
        },

        setInterfaceColor: (interFaceColor) => {
            dispatch(setInterfaceColor(interFaceColor));
        },

        setBackgroundColor: (backgroundColor) => {
            dispatch(setBackgroundColor(backgroundColor));
        },
    };
};

function SlideBar(props) {
    var { status, title } = props.slideBar;

    var { colorList } = props;

    var bgColorTemp;
    colorList.forEach((color, index) => {
        if (props.interfaceColor === color.interface) {
            bgColorTemp = index;
        }
    });

    var header =
        title === "layout" ? (
            <SlideLeft>
                <ColorLensOutlinedIcon className="icon" />
                &nbsp;<p> Tùy chọn giao diện</p>
            </SlideLeft>
        ) : title === "send" ? (
            <SlideLeft>
                <SendOutlinedIcon className="icon" />
                &nbsp;<p>Gửi</p>
            </SlideLeft>
        ) : title === "setting" ? (
            <SlideLeft>
                <SettingsOutlinedIcon className="icon" />
                &nbsp;<p> Cài đặt</p>
            </SlideLeft>
        ) : (
            ""
        );

    const handleChooseInterfaceColor = (index) => {
        props.setInterfaceColor(props.colorList[index].interface);
        props.setBackgroundColor(props.colorList[index].background[0].color);
    };

    const handleChooseBackgoundColor = (color) => {
        props.setBackgroundColor(color);
    };

    var body =
        title === "layout" ? (
            <>
                <Box>
                    <Title>màu giao diện</Title>
                    <Content>
                        {colorList.map((color, index) => (
                            <CustomCheckCircleIcon
                                key={index}
                                interface={color.interface}
                                onClick={() =>
                                    handleChooseInterfaceColor(index)
                                }
                                active={
                                    props.interfaceColor === color.interface
                                        ? "interface"
                                        : ""
                                }
                            />
                        ))}
                    </Content>
                </Box>
                <Box>
                    <Title>màu nền</Title>
                    <Content>
                        {colorList[bgColorTemp].background.map(
                            (color, index) => (
                                <CustomCheckCircleIcon
                                    key={index}
                                    interface={color.color}
                                    onClick={() =>
                                        handleChooseBackgoundColor(color.color)
                                    }
                                    active={
                                        props.backgroundColor === color.color
                                            ? "background"
                                            : ""
                                    }
                                />
                            ),
                        )}
                    </Content>
                </Box>
            </>
        ) : title === "send" ? (
            ""
        ) : title === "setting" ? (
            ""
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

            {body}
        </Slide>
    );
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

const Box = styled.div`
    border-bottom: 1px solid rgb(0 0 0 / 25%);
    padding: 20px 15px;
`;

const Title = styled.div`
    text-transform: uppercase;
    font-size: 14px;
    font-family: Roboto, Arial, sans-serif !important;
    font-weight: 400;
    letter-spacing: 0.3px;
    line-height: 16px;
    margin-bottom: 20px;
`;

const Content = styled.div`
    display: grid;
    grid-gap: 10px;
    grid-template-columns: repeat(6, minmax(0, 1fr));
    width: 100%;
    box-sizing: border-box;
    align-items: center;
    justify-content: center;
`;

const CustomCheckCircleIcon = styled(CheckCircleIcon)`
    background-color: ${(props) => props.interface};
    color: ${(props) => props.interface};
    border-radius: 50%;
    font-size: 33px !important;
    margin: 0 !important;
    padding: 0 !important;
    cursor: pointer;
    border: 0.5px solid rgb(0 0 0 / 25%);
    box-sizing: border-box;
    transition: 0.4s;

    ${(props) =>
        props.active === "interface"
            ? `background-color: rgb(0 0 0 / 15%);`
            : props.active === "background"
            ? `background-color: rgb(0 0 0 / 50%);`
            : ""}
`;

export default connect(mapStateToProps, mapDispatchToProps)(SlideBar);
