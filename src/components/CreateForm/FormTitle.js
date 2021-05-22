import React from "react";
import styled from "styled-components";

function FormTitle(props) {
    return (
        <Title>
            <QuestionFormName
                type="text"
                defaultValue="Mẫu không tiêu đề"
                onFocus={(e) => e.target.select()}
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
    border-top: 8px solid var(--basic-color);
    background-color: white;
    border-radius: 8px;
    padding: 25px 20px;
    text-transform: capitalize;
    width: 750px;
    box-shadow: 0 0 0 1px rgb(0 0 0 / 20%), 0 0 0 rgb(0 0 0 / 25%);
    height: 100%;
    margin-bottom: 15px;

    @media (max-width: 768px) {
        width: 80%;
    }
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
    border-bottom: 0px solid var(--basic-color);
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
    border-bottom: 0px solid var(--basic-color);
    transition: border-bottom 0.2s ease-in-out;

    &:focus {
        border-bottom-width: 3px;
    }
`;

export default FormTitle;
