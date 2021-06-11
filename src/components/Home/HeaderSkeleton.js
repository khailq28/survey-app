import React from "react";
import styled from "styled-components";
import Skeleton from "@material-ui/lab/Skeleton";

function HeaderSkeleton(props) {
    return (
        <Header>
            <div style={{ display: "flex", alignItems: "center" }}>
                <Skeleton
                    animation="wave"
                    variant="text"
                    width="40px"
                    height="90px"
                    style={{ marginLeft: 10 }}
                />
                <SearchSkeleton
                    animation="wave"
                    variant="text"
                    width="700px"
                    height="70px"
                />
            </div>

            <Skeleton
                animation="wave"
                variant="circle"
                width="50px"
                height="50px"
                style={{ marginRight: 10 }}
            />
        </Header>
    );
}

const Header = styled.div`
    display: flex;
    align-items: center;
    margin: 0 auto;
    justify-content: space-between;
    border-bottom: solid 1px rgb(0 0 0 / 20%);
`;

const SearchSkeleton = styled(Skeleton)`
    opacity: 1;
    flex-grow: 1;
    max-width: 280px !important;

    @media (max-width: 768px) {
        width: 210px !important;
    }

    @media (max-width: 280px) {
        width: 140px !important;
    }
`;

export default HeaderSkeleton;
