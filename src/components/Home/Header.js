import React from "react";
import styled from "styled-components";
import SearchIcon from "@material-ui/icons/Search";
import { connect } from "react-redux";
import { signOutAPI } from "../../actions";
import { Redirect } from "react-router";
import PropTypes from "prop-types";

Header.propTypes = {
    user: PropTypes.object,
    signOut: PropTypes.func,
};

Header.defaultProps = {
    user: null,
    signOut: null,
};

function Header(props) {
    return (
        <Container>
            {!props.user && (
                <Redirect
                    to={{
                        pathname: "/",
                        state: props.match.url,
                    }}
                />
            )}
            <Content>
                <Logo>
                    <a href="/home">
                        <img src="/images/logo/logo.png" alt="" />
                    </a>
                </Logo>
                <Search>
                    <div>
                        <input type="text" placeholder="Search" />
                    </div>
                    <Icon>
                        <SearchIcon />
                    </Icon>
                </Search>

                <SignOut>
                    <User>
                        {props.user && props.user.photoURL ? (
                            <UserImg src={props.user.photoURL} alt="" />
                        ) : (
                            <UserImg src="/images/user.svg" alt="" />
                        )}
                    </User>

                    <DropDown onClick={() => props.signOut()}>
                        <span>Sign out</span>
                    </DropDown>
                </SignOut>
            </Content>
        </Container>
    );
}

const Container = styled.div`
    background-color: white;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    left: 0;
    position: fixed;
    top: 0;
    width: 100vw;
    z-index: 100;

    @media only screen and (min-width: 480px) and (max-width: 768px) {
        padding: 0 10px;
    }
    @media only screen and (max-width: 479px) {
        padding: 0 5px;
    }
`;

const Content = styled.div`
    display: flex;
    align-items: center;
    margin: 0 auto;
    min-height: 100%;
    max-width: 100%;
    justify-content: space-between;
`;

const Logo = styled.span`
    margin-right: 8px;
    display: inline-block;
    vertical-align: middle;
    padding-left: 2px;

    a > img {
        width: 40px;
        height: 40px;
    }

    @media (min-width: 1129px) {
        padding-left: 20px;
    }
`;

const Search = styled.div`
    opacity: 1;
    flex-grow: 1;
    position: relative;

    & > div {
        max-width: 280px;

        input {
            border: none;
            box-shadow: none;
            background-color: #eef3f8;
            border-radius: 2px;
            color: rgba(0, 0, 0, 0.9);
            width: 600px;
            padding: 0 8px 0 40px;
            line-height: 1.75;
            font-weight: 400;
            font-size: 14px;
            height: 34px;
            border-color: #dce6f1;
            vertical-align: text-top;

            @media (max-width: 768px) {
                width: 210px;
            }

            @media (max-width: 280px) {
                width: 140px;
            }
        }
    }
`;

const Icon = styled.div`
    width: 40px;
    position: absolute;
    z-index: 1;
    top: 5px;
    left: 2px;
    border-radius: 0 2px 2px 0;
    margin: 0;
    pointer-events: none;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const User = styled.div`
    align-items: center;
    background: transparent;
    display: flex;
    flex-direction: column;
    font-size: 12px;
    font-weight: 400;
    justify-content: center;
    line-height: 1.5;
    min-height: 52px;
    min-width: 80px;
    position: relative;
    text-decoration: none;

    span {
        color: rgba(0, 0, 0, 0.6);
        display: flex;
        align-items: center;
    }

    @media (max-width: 768px) {
        min-width: 70px;
    }
`;

const UserImg = styled.img`
    width: 40px;
    border-radius: 50%;
`;

const DropDown = styled.div`
    position: absolute;
    background: #dddddd;
    border: 1px solid rgba(151, 151, 151, 0.34);
    border-radius: 4px;
    width: 100px;
    height: 40px;
    font-size: 16px;
    transition-duration: 167ms;
    text-align: center;
    display: none;
    cursor: pointer;
    transform: 0.4s;

    &:after {
        content: "";
        width: 0px;
        height: 0px;
        border: 7px #ffffff00 solid;
        border-bottom-color: #dddddd;
        position: absolute;
        left: 68px;
        top: -14px;
        transform: 0.4s;
    }

    @media (min-width: 1129px) {
        left: 92%;

        &:after {
            left: 70px;
        }
    }

    @media only screen and (min-width: 769px) and (max-width: 1128px) {
        left: 88%;
        &:after {
            left: 55px;
        }
    }

    @media only screen and (max-width: 768px) and (max-width: 480px) {
        &:after {
            left: 70px;
        }
    }

    @media (max-width: 489px) {
        &:after {
            left: 55px;
        }
    }

    &:hover {
        background: blue;
        color: white;

        &:after {
            border-bottom-color: blue;
        }
    }

    @media only screen and (min-width: 768px) {
        top: 56px;
        right: 220px;
    }

    @media only screen and (min-width: 480px) and (max-width: 768px) {
        top: 56px;
        right: 25px;
    }

    @media only screen and (max-width: 479px) {
        top: 56px;
        right: 5px;
    }

    @media only screen and (min-width: 768px) and (min-height: 1366px) {
        top: 60px;
        right: 40px;
    }
`;

const SignOut = styled.div`
    padding: 2px;

    a > svg {
        width: 24px;
        border-radius: 50%;
    }

    a > img {
        width: 24px;
        height: 24px;
        border-radius: 50%;
    }

    span {
        display: flex;
        align-items: center;
    }

    &:hover {
        ${DropDown} {
            align-items: center;
            display: flex;
            justify-content: center;
        }
    }
`;

const mapStateToProps = (state) => {
    return {
        user: state.userState.user,
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        signOut: () => {
            dispatch(signOutAPI());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
