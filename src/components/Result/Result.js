import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Switch from "@material-ui/core/Switch";
import { connect } from "react-redux";
import { changeStatusForm } from "../../actions";
import socket from "../../socket";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import DetailResult from "./DetailResult";
import ChartList from "./ChartList";
import ExportCSV from "./ExportCSV";

Result.propTypes = {
    status: PropTypes.bool,
    idForm: PropTypes.string,
    submiter: PropTypes.array,
    survey: PropTypes.object,
};

Result.defaultProps = {
    status: null,
    idForm: null,
    survey: null,
    submiter: [],
};

const mapStateToProps = (state) => {
    return {
        status: state.survey.status,
        idForm: state.survey._id,
        submiter: state.survey.submiter,
        survey: state.survey,
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        changeStatusForm: () => {
            dispatch(changeStatusForm());
        },
    };
};

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <div>{children}</div>}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

function Result(props) {
    var { idForm } = props;
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleSwitch = () => {
        props.changeStatusForm();
        socket.emit("CLIENT_CHANGE_STATUS", {
            idForm,
            value: !props.status,
        });
    };

    useEffect(() => {
        socket.on("SERVER_SEND_NEW_STATUS", () => {
            props.changeStatusForm();
        });
    }, []);

    return (
        <Container>
            <Box style={{ paddingBottom: "0px" }}>
                <Header>
                    <Left>{props.submiter.length} câu trả lời</Left>

                    <ExportCSV survey={props.survey} />
                </Header>
                <CloseForm style={{ textAlign: "right" }}>
                    Chấp nhận phản hồi
                    <Switch
                        name="status"
                        color="primary"
                        checked={props.status}
                        onClick={handleSwitch}
                    />
                </CloseForm>
                <CustomPaper>
                    <CustomTabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                    >
                        <CustomTab label="Bảng tóm tắt" {...a11yProps(0)} />
                        <CustomTab label="Cá nhân" {...a11yProps(1)} />
                    </CustomTabs>
                </CustomPaper>
            </Box>

            <div>
                <TabPanel value={value} index={0}>
                    <ChartList />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <DetailResult />
                </TabPanel>
            </div>
        </Container>
    );
}

const Container = styled.div`
    height: 100%;
    width: 100vw;
    display: grid;
    padding-top: 70px;
    align-items: center;
    justify-content: center;
`;

const Box = styled.div`
    background-color: white;
    border-radius: 6px;
    padding: 25px 20px;
    width: 750px;
    box-shadow: 0 0 0 2px rgb(0 0 0 / 20%), 0 0 0 rgb(0 0 0 / 25%);

    @media (max-width: 768px) {
        width: 90vw;
        margin-left: auto;
        margin-right: auto;
    }
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Left = styled.div`
    color: black;
    box-sizing: border-box;
    font-size: 26px;
    font-weight: 400;
    line-height: 135%;
`;

const CloseForm = styled.div`
    color: var(--icon-color);
    box-sizing: border-box;
    font-size: 13px;
    line-height: 135%;
`;

const CustomPaper = styled(Paper)`
    box-shadow: none !important;
`;

const CustomTabs = styled(Tabs)`
    height: 5 !important;
    .PrivateTabIndicator-root-1 {
        height: 3px;
        border-radius: 4px 4px 0 0;
    }
`;

const CustomTab = styled(Tab)`
    font-size: 12 !important;
    color: "#5f6368" !important;
    text-transform: capitalize !important;
    height: 5 !important;
    font-weight: 600 !important;
`;

export default connect(mapStateToProps, mapDispatchToProps)(Result);
