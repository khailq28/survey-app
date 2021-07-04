import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CloseIcon from "@material-ui/icons/Close";
import ColorLensOutlinedIcon from "@material-ui/icons/ColorLensOutlined";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import SendOutlinedIcon from "@material-ui/icons/SendOutlined";
import { IconButton } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import {
    setStatusSlideBar,
    setInterfaceColor,
    setBackgroundColor,
    changeStatusTimeStart,
    changeStatusTimeEnd,
    changeValueTimeStart,
    changeValueTimeEnd,
} from "../../actions";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import socket from "../../socket";
import PropTypes from "prop-types";
import moment from "moment";

SlideBar.propTypes = {
    idForm: PropTypes.string,
    slideBar: PropTypes.object,
    timer: PropTypes.object,
    setStatusSlideBar: PropTypes.func,
    colorList: PropTypes.array,
    setInterfaceColor: PropTypes.func,
    setBackgroundColor: PropTypes.func,
    changeStatusTimeStart: PropTypes.func,
    changeStatusTimeEnd: PropTypes.func,
    interfaceColor: PropTypes.string,
    backgroundColor: PropTypes.string,
};

SlideBar.defaultProps = {
    idForm: null,
    slideBar: null,
    timer: null,
    setStatusSlideBar: null,
    colorList: null,
    setInterfaceColor: null,
    setBackgroundColor: null,
    changeStatusTimeStart: null,
    changeStatusTimeEnd: null,
    interfaceColor: null,
    backgroundColor: null,
};

const mapStateToProps = (state) => {
    return {
        idForm: state.survey._id,
        timer: state.survey.timer,
        slideBar: state.tools.slideBar,
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

        changeStatusTimeStart: (bValue) => {
            dispatch(changeStatusTimeStart(bValue));
        },

        changeStatusTimeEnd: (bValue) => {
            dispatch(changeStatusTimeEnd(bValue));
        },

        changeValueTimeStart: (sValue) => {
            dispatch(changeValueTimeStart(sValue));
        },

        changeValueTimeEnd: (sValue) => {
            dispatch(changeValueTimeEnd(sValue));
        },
    };
};

const formatDate = () => {
    var date = new Date();
    var hour = `0${date.getHours()}`.slice(-2);
    var minute = `0${date.getMinutes()}`.slice(-2);
    var day = `0${date.getDate()}`.slice(-2);
    var month = `0${date.getMonth() + 1}`.slice(-2);
    var year = date.getFullYear();

    return `${year}-${month}-${day}T${hour}:${minute}`;
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

    useEffect(() => {
        socket.on("SERVER_SEND_NEW_BACKGROUND_COLOR", (oColor) => {
            if (oColor.idForm === props.idForm && props.idForm !== "") {
                props.setBackgroundColor(oColor.color);
            }
        });
    }, [props.backgroundColor, props.idForm]);

    useEffect(() => {
        socket.on("SERVER_SEND_NEW_INTERFACE_COLOR", (oColor) => {
            if (oColor.idForm === props.idForm && props.idForm !== "") {
                props.setInterfaceColor(oColor.color);
            }
        });
    }, [props.interFaceColor, props.idForm]);

    const handleChooseInterfaceColor = (index) => {
        props.setInterfaceColor(props.colorList[index].interface);
        props.setBackgroundColor(props.colorList[index].background[0].color);
        socket.emit("CLIENT_CHANGE_INTERFACE_COLOR", {
            color: props.colorList[index].interface,
            idForm: props.idForm,
        });
        socket.emit("CLIENT_CHANGE_BACKGROUND_COLOR", {
            color: props.colorList[index].background[0].color,
            idForm: props.idForm,
        });
    };

    const handleChooseBackgoundColor = (color) => {
        props.setBackgroundColor(color);
        socket.emit("CLIENT_CHANGE_BACKGROUND_COLOR", {
            color,
            idForm: props.idForm,
        });
    };

    const alertTimeout = (mymsg, mymsecs) => {
        var myelement = document.createElement("div");
        myelement.classList.add("alert");
        myelement.classList.add("show");
        myelement.innerHTML = mymsg;

        setTimeout(function () {
            myelement.classList.remove("show");
            myelement.classList.add("hide");
            // myelement.parentNode.removeChild(myelement);
        }, mymsecs - 800);

        setTimeout(function () {
            myelement.parentNode.removeChild(myelement);
        }, mymsecs);
        document.body.appendChild(myelement);
    };

    const handleCopy = (str) => {
        // https://www.30secondsofcode.org/blog/s/copy-text-to-clipboard-with-javascript
        const el = document.createElement("textarea");
        el.value = str;
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
        alertTimeout("Copied link", 3500);

        // alert("Copied link: " + str);
    };

    // setting func
    const [statusStart, setStatusStart] = useState(false);
    const [timeStart, setTimeStart] = useState(formatDate());
    const [statusEnd, setStatusEnd] = useState(false);
    const [timeEnd, setTimeEnd] = useState(formatDate());

    useEffect(() => {
        setStatusStart(props.timer.start.status);
        setStatusEnd(props.timer.end.status);
        setTimeStart(
            props.timer.start.value ? props.timer.start.value : formatDate(),
        );
        setTimeEnd(
            props.timer.end.value ? props.timer.end.value : formatDate(),
        );
    }, [props.idForm]);

    useEffect(() => {
        socket.on("SERVER_SEND_NEW_STATUS_TIME_START", (status) => {
            props.changeStatusTimeStart(status);
            setStatusStart(status);
        });

        socket.on("SERVER_SEND_NEW_STATUS_TIME_END", (status) => {
            props.changeStatusTimeEnd(status);
            setStatusEnd(status);
        });

        socket.on("SERVER_SEND_NEW_VALUE_TIME_START", (value) => {
            setTimeStart(value);
            props.changeValueTimeStart(value);
        });

        socket.on("SERVER_SEND_NEW_VALUE_TIME_END", (value) => {
            setTimeEnd(value);
            props.changeValueTimeEnd(value);
        });
    }, []);

    const handleChangeStartStatus = (e) => {
        setStatusStart(e.target.checked);
        socket.emit("CLIENT_CHANGE_STATUS_TIME_START", {
            status: e.target.checked,
            idForm: props.idForm,
        });
        props.changeStatusTimeStart(e.target.checked);
    };

    const handleChangeEndStatus = (e) => {
        setStatusEnd(e.target.checked);
        socket.emit("CLIENT_CHANGE_STATUS_TIME_END", {
            status: e.target.checked,
            idForm: props.idForm,
        });
        props.changeStatusTimeEnd(e.target.checked);
    };

    const handleChangeEndTime = (e) => {
        setTimeEnd(e.target.value);
        props.changeValueTimeEnd(e.target.value);
        socket.emit("CLIENT_CHANGE_VALUE_TIME_END", {
            value: e.target.value,
            idForm: props.idForm,
        });
    };

    const handleChangeStartTime = (e) => {
        setTimeStart(e.target.value);
        props.changeValueTimeStart(e.target.value);
        socket.emit("CLIENT_CHANGE_VALUE_TIME_START", {
            value: e.target.value,
            idForm: props.idForm,
        });
    };

    // render
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
            <Box>
                <Link
                    href={window.location.origin + "/form/" + props.idForm}
                    target="_blank"
                    id={props.idForm}
                >
                    {window.location.origin + "/form/" + props.idForm}
                </Link>
                <div style={{ marginTop: "10px" }}>
                    <CopyButton
                        variant="contained"
                        color="primary"
                        onClick={() =>
                            handleCopy(
                                window.location.origin +
                                    "/form/" +
                                    props.idForm,
                            )
                        }
                    >
                        Copy
                    </CopyButton>
                </div>
            </Box>
        ) : title === "setting" ? (
            <>
                <Timer>
                    <input
                        type="checkbox"
                        name="start"
                        value={statusStart}
                        checked={statusStart}
                        onChange={(e) => handleChangeStartStatus(e)}
                    />{" "}
                    Hẹn giờ mở khảo sát
                </Timer>
                <Timer>
                    <DatetimeInput
                        type="datetime-local"
                        disabled={!statusStart}
                        min={formatDate()}
                        value={timeStart}
                        onChange={(e) => handleChangeStartTime(e)}
                    />
                </Timer>
                <Timer>
                    <input
                        type="checkbox"
                        name="start"
                        value={statusEnd}
                        checked={statusEnd}
                        onChange={(e) => handleChangeEndStatus(e)}
                    />{" "}
                    Hẹn giờ đóng khảo sát
                </Timer>
                <Timer>
                    <DatetimeInput
                        type="datetime-local"
                        disabled={!statusEnd}
                        min={formatDate()}
                        value={timeEnd}
                        onChange={(e) => handleChangeEndTime(e)}
                    />
                </Timer>
            </>
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

const Link = styled.a`
    word-wrap: break-word;

    &:hover {
        color: blue;
    }

    &:active {
        color: blueviolet;
    }
`;

const CopyButton = styled(Button)``;

const Timer = styled.div`
    padding-top: 10px;
    padding-left: 10px;
`;

const DatetimeInput = styled.input`
    margin-left: 25px;
`;

export default connect(mapStateToProps, mapDispatchToProps)(SlideBar);
