import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { signInAPI } from "../actions";
import { useHistory } from "react-router";
import Skeleton from "@material-ui/lab/Skeleton";

function Login(props) {
    var [loading, setLoading] = useState(false);
    var history = useHistory();

    useEffect(() => {
        if (props.checkLogin === "true") {
            var url = props.location.state ? props.location.state.url : "/home";

            history.replace(url);
        }
        if (props.checkLogin === "false") {
            setLoading(true);
        }
    });

    return (
        <Container>
            <CTA>
                <Content>
                    {loading ? (
                        <>
                            <Title>survey forms</Title>
                            <Google onClick={() => props.signIn()}>
                                <img src="/images/login/google.svg" alt="" />
                                &nbsp;<p>Đăng nhập bằng Google</p>
                            </Google>
                        </>
                    ) : (
                        <>
                            <Skeleton
                                animation="wave"
                                variant="text"
                                width="400px"
                                height="80px"
                            />
                            <Skeleton
                                animation="wave"
                                variant="text"
                                width="600px"
                                height="90px"
                            />
                        </>
                    )}
                </Content>
            </CTA>
            {loading ? <BgImage /> : ""}
        </Container>
    );
}

const Container = styled.div`
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 100vh;
    position: relative;
`;

const Content = styled.div`
    margin-bottom: 10vw;
    width: 100%;
    position: relative;
    min-height: 100vh;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 80px 40px;
    height: 100%;
    color: #f9f9f9;
`;

const BgImage = styled.div`
    height: 100%;
    width: 100%100vh;
    background-position: top;
    background-size: cover;
    background-repeat: no-repeat;
    background-image: url("/images/login/background.jpg");
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    z-index: -1;
`;

const CTA = styled.div`
    max-width: 650px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: auto;
    animation: slideUp 0.8s ease-in-out forwards;
    position: absolute;
`;

const Title = styled.div`
    margin-bottom: 12px;
    max-width: 600px;
    min-height: 1px;
    display: block;
    width: 100%;
    letter-spacing: 1.5px;
    font-size: 50px;
    font-weight: bold;
    text-transform: uppercase;

    @media only screen and (max-width: 768px) {
        font-size: 40px;
    }
`;

const Google = styled.button`
    margin-bottom: 12px;
    display: flex;
    justify-content: center;
    background-color: #fff;
    align-items: center;
    height: 56px;
    width: 100%;
    border-radius: 28px;
    box-shadow: inset 0 0 0 1px rgb(0 0 0 / 60%),
        inset 0 0 0 2px rgb(0 0 0 / 0%) inset 0 0 0 1px rgb(0 0 0 / 0);
    vertical-align: middle;
    z-index: 0;
    transition-duration: 167ms;
    font-size: 20px;
    color: f9f9f9;

    &:hover {
        background-color: #0063e5;
        color: rgba(0, 0, 0, 0.75);

        p {
            color: white;
        }
    }
`;

const mapStateToProps = (state) => {
    return {
        user: state.userState.user,
        checkLogin: state.userState.checkLogin,
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        signIn: () => {
            dispatch(signInAPI());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
