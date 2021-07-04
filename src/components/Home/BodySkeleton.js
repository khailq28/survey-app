import React from "react";
import styled from "styled-components";
import Skeleton from "@material-ui/lab/Skeleton";

function BodySkeleton(props) {
    return (
        <Body>
            <CustomAddButtonSkeleton
                animation="wave"
                variant="text"
                width="290px"
                height="150px"
            />

            <BodyContent>
                <Top>
                    <Left>
                        <Skeleton
                            animation="wave"
                            variant="text"
                            width="200px"
                            height="40px"
                        />
                    </Left>

                    <Right>
                        <Skeleton
                            animation="wave"
                            variant="text"
                            width="40px"
                            height="40px"
                        />
                        <Skeleton
                            animation="wave"
                            variant="text"
                            width="40px"
                            height="40px"
                        />
                    </Right>
                </Top>
                <Content>
                    <Skeleton
                        animation="wave"
                        variant="rect"
                        width="100%"
                        height="200px"
                    />
                    <Skeleton
                        animation="wave"
                        variant="rect"
                        width="100%"
                        height="200px"
                    />
                    <Skeleton
                        animation="wave"
                        variant="rect"
                        width="100%"
                        height="200px"
                    />
                    <Skeleton
                        animation="wave"
                        variant="rect"
                        width="100%"
                        height="200px"
                    />
                    <Skeleton
                        animation="wave"
                        variant="rect"
                        width="100%"
                        height="200px"
                    />
                    <Skeleton
                        animation="wave"
                        variant="rect"
                        width="100%"
                        height="200px"
                    />
                    <Skeleton
                        animation="wave"
                        variant="rect"
                        width="100%"
                        height="200px"
                    />
                    <Skeleton
                        animation="wave"
                        variant="rect"
                        width="100%"
                        height="200px"
                    />
                    <Skeleton
                        animation="wave"
                        variant="rect"
                        width="100%"
                        height="200px"
                    />
                    <Skeleton
                        animation="wave"
                        variant="rect"
                        width="100%"
                        height="200px"
                    />
                </Content>
            </BodyContent>
        </Body>
    );
}

const Body = styled.div`
    max-width: 1128px;
    align-items: center;
    margin: 0 auto;
    min-height: 100%;
`;

const CustomAddButtonSkeleton = styled(Skeleton)`
    /* padding: 10px 0; */
    border: 1px solid transparent !important;
    border-radius: 8px !important;
`;

const BodyContent = styled.div`
    background-color: white;
    width: 100%;
    margin-left: 3px;
    border-radius: 15px;
    position: relative;
    box-sizing: border-box;
    border: none;
    box-shadow: 0 0 0 1px rgb(0 0 0 / 20%), 0 0 0 rgb(0 0 0 / 40%);
`;

const Top = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 10px;
    margin: 5px 5px 0 5px;
`;

const Left = styled.div`
    display: inline-block;
`;

const Right = styled.div`
    display: flex;
    margin-right: 2px;
    border-left: 1px rgb(0 0 0 / 20%) solid;
`;

const Content = styled.div`
    border-top: 1px rgb(0 0 0 / 20%) solid;
    display: grid;
    grid-gap: 20px;
    gap: 20px;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    width: 100%;
    box-sizing: border-box;
    padding: 8px;

    @media (max-width: 768px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
`;

export default BodySkeleton;
