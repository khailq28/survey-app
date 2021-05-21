import React from "react";
import styled from "styled-components";
import FormTitle from "./FormTitle";

function QuestionForm(props) {
    return (
        <Container>
            <Questiontitle>
                <Section>
                    <FormTitle />
                </Section>
            </Questiontitle>
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

const Questiontitle = styled.div`
    background-color: #f4f4f9;
    height: 100%;
    border-radius: 8px;
    padding-bottom: 30px;
    width: 750px;
    box-shadow: 0 0 0 1px rgb(0 0 0 / 20%), 0 0 0 rgb(0 0 0 / 25%);

    @media (max-width: 768px) {
        width: 100%;
    }
`;

const Section = styled.div`
    /* margin: auto; */
    width: 100%;
`;

export default QuestionForm;
