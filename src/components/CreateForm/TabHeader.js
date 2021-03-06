import React, { useEffect } from "react";
import styled from "styled-components";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PropTypes from "prop-types";
import QuestionForm from "./QuestionForm";
import Result from "../Result/Result";
import Skeleton from "@material-ui/lab/Skeleton";
import { connect } from "react-redux";
import Badge from "@material-ui/core/Badge";
import socket from "../../socket";
import { setQuestions, setSubmiter } from "../../actions";

const mapStateToProps = (state) => {
    return { submiter: state.survey.submiter, idForm: state.survey._id };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        setQuestions: (questions) => {
            dispatch(setQuestions(questions));
        },

        setSubmiter: (submiter) => {
            dispatch(setSubmiter(submiter));
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
    handleLoading: PropTypes.func,
    loading: PropTypes.bool,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

TabHeader.propTypes = {
    submiter: PropTypes.array,
    idForm: PropTypes.string,
    setQuestions: PropTypes.func,
    setSubmiter: PropTypes.func,
};

TabHeader.defaultProps = {
    submiter: null,
    idForm: "",
    setQuestions: null,
    setSubmiter: null,
};

function TabHeader(props) {
    const [value, setValue] = React.useState(0);

    var { idForm } = props;
    useEffect(() => {
        socket.on("SERVER_SEND_NEW_ANSWER", (oQuestions) => {
            if (idForm === oQuestions.idForm) {
                props.setQuestions(oQuestions.questions);
                props.setSubmiter(oQuestions.submiter);
            }
        });
    }, [idForm]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Container>
            <CustomPaper>
                <CustomTabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                >
                    {props.loading ? (
                        <CustomTab label="C??u h???i" {...a11yProps(0)} />
                    ) : (
                        <Skeleton
                            animation="wave"
                            variant="text"
                            width="70px"
                            height="30px"
                        />
                    )}
                    {props.loading ? (
                        <CustomTab
                            label={
                                <div>
                                    C??u tr??? l???i{" "}
                                    <Badge
                                        style={{ marginLeft: "10px" }}
                                        badgeContent={props.submiter.length}
                                        color="primary"
                                    ></Badge>
                                </div>
                            }
                            {...a11yProps(1)}
                        />
                    ) : (
                        <Skeleton
                            animation="wave"
                            variant="text"
                            width="70px"
                            height="30px"
                        />
                    )}
                </CustomTabs>
            </CustomPaper>
            <TabPanel value={value} index={0}>
                <QuestionForm
                    loading={props.loading}
                    handleLoading={props.handleLoading}
                />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Result />
            </TabPanel>
        </Container>
    );
}

const Container = styled.div`
    margin-top: 50px;
`;

const CustomPaper = styled(Paper)`
    flex-grow: 1 !important;
    position: fixed !important;
    width: 100%;
    z-index: 10;
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

export default connect(mapStateToProps, mapDispatchToProps)(TabHeader);
