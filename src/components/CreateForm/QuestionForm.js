import React from "react";
import styled from "styled-components";
import FormBody from "./FormBody";
import FormTitle from "./FormTitle";

function QuestionForm(props) {
    return (
        <Container>
            <FormTitle />

            <Box>
                <FormBody />
            </Box>
        </Container>
    );
}

const Container = styled.div`
    height: 100%;
    display: grid;
    padding-top: 70px;
    align-items: center;
    justify-content: center;
`;

const Box = styled.div`
    margin-bottom: 15px;

    .add_question {
        background-color: white;
        border-radius: 8px;
        padding: 25px 22px;
        text-transform: capitalize;
        display: flex;
        flex-direction: column;
        /* padding-bottom:10px; */
        padding-top: 0px;
        width: 93%;
        margin-left: 10px;
    }
`;

export default QuestionForm;
