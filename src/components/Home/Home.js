import React from "react";
import styled from "styled-components";
import HomeBody from "./HomeBody";
import Header from "./Header";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from "react-router";
import { IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

Home.propTypes = {
    user: PropTypes.object,
};

Home.defaultProps = {
    user: null,
};

const mapStateToProps = (state) => {
    return {
        user: state.userState.user,
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {};
};

function Home(props) {
    return (
        <>
            {!props.user && (
                <Redirect
                    to={{
                        pathname: "/",
                        state: props.match.url,
                    }}
                />
            )}
            <BackgroundDialog>
                <Dialog>
                    <DialogHeader>
                        <Title>Bạn có chắc chắn muốn xóa biểu mẫu?</Title>
                        <IconButton>
                            <CloseIcon />
                        </IconButton>
                    </DialogHeader>
                    <DialogBody>
                        <YesButton>Có</YesButton>
                        <NoButton>Không</NoButton>
                    </DialogBody>
                </Dialog>
            </BackgroundDialog>
            <Header />
            <HomeBody />
        </>
    );
}

const BackgroundDialog = styled.div`
    z-index: 99;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(14, 42, 71, 0.9);
`;

const Dialog = styled.div`
    background-color: white;
    width: 40%;
    height: 120px;
    border-radius: 20px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);

    @media (max-width: 768px) {
        width: 100%;
    }
`;

const DialogHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
    padding-left: 15px;
`;

const Title = styled.div`
    font-size: 16px;
    font-family: Roboto, Arial, sans-serif !important;
    font-weight: 600;
    letter-spacing: 0.3px;
    line-height: 16px;
`;

const DialogBody = styled.div`
    display: inline-flex;
    padding: 10px;
    width: 100%;
    align-items: center;
    justify-content: center;
`;

const YesButton = styled.div`
    width: 40%;
    height: 40px;
    margin: 0px 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 0.3px;
    color: white;
    border-radius: 8px;
    cursor: pointer;
    background-color: blue;

    &:hover {
        border: 4px solid rgba(249, 249, 249, 0.8);
        transition-duration: 300ms;
    }
`;

const NoButton = styled(YesButton)`
    background-color: red;
`;

export default connect(mapStateToProps, mapDispatchToProps)(Home);
