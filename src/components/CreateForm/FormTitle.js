import React from "react";
import styled from "styled-components";

function FormTitle(props) {
    return (
        <Title className="question_form_top">
            <QuestionFormName
                type="text"
                defaultValue="Mẫu không tiêu đề"
                // placeholder={documentName}
                // value={documentName}
                // onChange={(e) => {
                //     setDocName(e.target.value);
                // }}
            ></QuestionFormName>
            <QuestionFormDesc
                type="text"
                placeholder="Mô tả biểu mẫu"
                // placeholder={documentDescription}
                // value={documentDescription}
                // onChange={(e) => {
                //     setDocDesc(e.target.value);
                // }}
            ></QuestionFormDesc>
        </Title>
    );
}

const Title = styled.div`
    background-color: white;
    border-top: 8px solid rgb(103, 58, 183);
    border-radius: 8px;
    padding: 25px 20px;
    text-transform: capitalize;
`;

const QuestionFormName = styled.input`
    color: black;
    box-sizing: border-box;
    font-size: 32px;
    font-weight: 400;
    line-height: 40px;
    line-height: 135%;
    width: 100%;
    border: none;
    outline: none;
    border-bottom: 1px solid #f4f4f9;
    color: black;
    border-radius: 0px 0px 4px 4px;
    border-bottom: 0px solid rgb(103, 58, 183);
    transition: border-bottom 0.2s ease-in-out;

    &:focus {
        border-bottom-width: 3px;
    }
`;

const QuestionFormDesc = styled.input`
    box-sizing: border-box;
    margin-top: 10px;
    font-family: "Google Sans", Roboto, Arial, sans-serif;
    font-size: 13px;
    font-weight: 400;
    line-height: 40px;

    width: 100%;
    border: none;
    outline: none;
    border-bottom: 1px solid #f4f4f9;
    color: black;
    border-radius: 0px 0px 4px 4px;
    border-bottom: 0px solid rgb(103, 58, 183);
    transition: border-bottom 0.2s ease-in-out;

    &:focus {
        border-bottom-width: 3px;
    }
`;

export default FormTitle;
