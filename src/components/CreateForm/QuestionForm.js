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
`;

export default QuestionForm;
