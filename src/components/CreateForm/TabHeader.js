import React from "react";
import styled from "styled-components";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PropTypes from "prop-types";
import QuestionForm from "./QuestionForm";

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

function TabHeader(props) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div>
            <CustomPaper>
                <CustomTabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                >
                    <CustomTab label="Câu hỏi" />
                    <CustomTab label="Câu trả lời" />
                </CustomTabs>
            </CustomPaper>
            <TabPanel value={value} index={0}>
                <QuestionForm />
            </TabPanel>
            <TabPanel value={value} index={1}>
                tab2
            </TabPanel>
        </div>
    );
}

const CustomPaper = styled(Paper)`
    flex-grow: 1 !important;
`;
const CustomTabs = styled(Tabs)`
    height: 10 !important;
`;
const CustomTab = styled(Tab)`
    font-size: 12 !important;
    color: "#5f6368" !important;
    text-transform: capitalize !important;
    height: 10 !important;
    font-weight: 600 !important;
`;

export default TabHeader;
