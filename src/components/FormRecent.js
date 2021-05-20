import React from "react";
import styled from "styled-components";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import StorageIcon from "@material-ui/icons/Storage";
import Slide from "react-reveal/Slide";

function FormRecent(props) {
    return (
        <Slide up>
            <Card>
                <img src="/images/home/t-shirt.png" alt="" />
                <Body>
                    <Title>abc</Title>
                    <Content>
                        <ContentBody
                            style={{ fontSize: "12px", color: "grey" }}
                        >
                            <StorageButton /> Đã mở 6/5/2021
                        </ContentBody>

                        <MoreVertButton />
                    </Content>
                </Body>
            </Card>
        </Slide>
    );
}

const Card = styled.div`
    display: flex;
    flex-direction: column;
    box-sizing: border-box;

    width: 100%;

    &:hover {
        border: 1px solid #6e2594;
    }

    img {
        box-sizing: border-box;
        height: 150px;
        width: 100%px;
    }
`;
const Body = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 18px;
`;

const Title = styled.h5`
    overflow: ellipsis;
`;

const Content = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 5px;
`;

const ContentBody = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;
const StorageButton = styled(StorageIcon)`
    color: white;
    font-size: 20px;
    background-color: #6e2594;
    padding: 3px;
    margin-right: 3px;
    border-radius: 2px;
`;
const MoreVertButton = styled(MoreVertIcon)`
    color: grey;
    font-size: 20px;
`;

export default FormRecent;
