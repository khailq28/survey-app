import React from "react";
import styled from "styled-components";

function Login(props) {
    return (
        <Container>
            <CTA>
                <Content>
                    <Title>survey forms</Title>
                    <Google>
                        <img src="/images/login/google.svg" alt="" />
                        Đăng nhập bằng Google
                    </Google>
                    <Description>
                        Giảng viên hướng dẫn: <br />
                        THẦY MAI VĂN MẠNH
                        <br />
                        Người thực hiện: <br />
                        Lương Quang Khải - 51703108 <br />
                        Vữ Lưu Bá Huy - 51703104
                    </Description>
                </Content>
            </CTA>

            <BgImage />
        </Container>
    );
}

const Container = styled.div`
    overflow: hidden;
    display: flex;
    flex-direction: column;
    text-align: center;
    height: 100vh;
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
    margin: auto;
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
    }
`;

const Description = styled.p`
    color: hsla(0, 0%, 95.3%, 1);
    margin: 0 0 24px;
    line-height: 1.5;
    letter-spacing: 1.5px;
    font-size: 22px;
    max-width: 600px;
    min-height: 1px;
    display: block;
    width: 100%;
    @media only screen and (max-width: 768px) {
        font-size: 17px;
    }
`;

export default Login;
