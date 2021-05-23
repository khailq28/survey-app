import React from "react";
import styled from "styled-components";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import {
    // Paper,
    Typography,
} from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import PropTypes from "prop-types";
import QuestionBox from "./QuestionBox";
import QuestionBody from "./QuestionBody";
import QuestionFooter from "./QuestionFooter";

Question.propTypes = {
    question: PropTypes.object,
    index: PropTypes.number,
};

Question.defaultProps = {
    question: null,
    index: null,
};

function Question(props) {
    var { question, index } = props;
    return (
        <Accordion
            // onChange={() => {
            //     handleExpand(i);
            // }}
            expanded={question.open}
            className={question.open ? "add_border" : ""}
        >
            <CustomAccordionSummary
                aria-controls="panel1a-content"
                elevation={1}
                status={!question.open ? false : true}
            >
                {!question.open ? (
                    <SaveQuestion>
                        <CustomTypography>
                            {index + 1}. {question.questionText}
                        </CustomTypography>

                        {question.options.map((op, j) => (
                            <ListOption key={j}>
                                <CustomFormControlLabel
                                    disabled
                                    control={
                                        <input
                                            type={question.questionType}
                                            color="primary"
                                            style={{
                                                marginRight: "3px",
                                            }}
                                            required={question.type}
                                        />
                                    }
                                    label={
                                        <CustomTypographyOption>
                                            {question.options[j].optionText}
                                        </CustomTypographyOption>
                                    }
                                />
                            </ListOption>
                        ))}
                    </SaveQuestion>
                ) : (
                    ""
                )}
            </CustomAccordionSummary>

            <QuestionBox />

            {question.options.map((option, j) => (
                <QuestionBody key={j} question={question} option={option} />
            ))}

            <QuestionFooter />
        </Accordion>
    );
}

const CustomAccordionSummary = styled(AccordionSummary)`
    width: 100%;
    ${(props) =>
        props.status
            ? `
        min-height: 0 !important;
        max-height: 0 !important;

        & > .Mui-expanded {
            min-height: 0 !important;
        }
    `
            : ""};
`;

const SaveQuestion = styled.div`
    background-color: white;
    border-radius: 8px;
    padding: 20px 2px;
    text-transform: capitalize;
    display: flex;
    flex-direction: column;
`;

const CustomTypography = styled(Typography)`
    font-size: 15px;
    font-weight: 400;
    letter-spacing: 1px;
    line-height: 24px;
    padding-bottom: 8px;
`;

const ListOption = styled.div`
    display: flex;
    border: none !important;
`;

const CustomFormControlLabel = styled(FormControlLabel)`
    margin-left: "5px";
    margin-bottom: "5px";
`;

const CustomTypographyOption = styled(Typography)`
    font-size: 13px;
    font-weight: 400;
    letter-spacing: 0.2px;
    line-height: 20px;
    color: #202124;
    font-family: Roboto, Arial, sans-serif;
`;

export default Question;
