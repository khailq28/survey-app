import React from "react";
import styled from "styled-components";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

function TabPanel(props) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
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

export default TabPanel;
