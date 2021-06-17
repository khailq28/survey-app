import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { signOutAPI } from "../../actions";

SubmitHeader.propTypes = {
    user: PropTypes.object,
};

SubmitHeader.defaultProps = { user: null };

const mapStateToProps = (state) => {
    return { user: state.userState.user };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        signOut: () => {
            dispatch(signOutAPI());
        },
    };
};

function SubmitHeader(props) {
    console.log(props.user);
    return (
        <div style={{ marginBottom: "10px" }}>
            <Container>
                <Left>
                    {props.user && props.user.photoURL ? (
                        <UserImg src={props.user.photoURL} alt="" />
                    ) : (
                        <UserImg src="/images/user.svg" alt="" />
                    )}
                    <span>{props.user.email}</span>
                </Left>
                <Right onClick={() => props.signOut()}>Sign out</Right>
            </Container>
        </div>
    );
}

const Container = styled.div`
    background-color: white;
    padding: 10px 20px;
    width: 750px;
    box-shadow: 0 0 0 2px rgb(0 0 0 / 20%), 0 0 0 rgb(0 0 0 / 25%);
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (max-width: 768px) {
        width: 96%;
        margin-left: auto;
        margin-right: auto;
    }
`;

const Left = styled.div`
    display: flex;
    align-items: center;

    & > span {
        margin-left: 5px;
        font-size: 16px;
        color: blue;
    }
`;

const Right = styled.div`
    background-color: #fff;
    border-radius: 6px;
    padding: 5px;
    box-shadow: 0 0 0 2px rgb(0 0 0 / 20%), 0 0 0 rgb(0 0 0 / 25%);
    cursor: pointer;

    &:hover {
        background-color: #0063e5;
        color: white;
    }
`;

const UserImg = styled.img`
    width: 40px;
    border-radius: 50%;
`;

export default connect(mapStateToProps, mapDispatchToProps)(SubmitHeader);
