import React from "react";
import styled from "styled-components";
// import { Prompt } from "react-router-dom";
import FormHeader from "./FormHeader";
import TabHeader from "./TabHeader";
import { Redirect } from "react-router";
import CircularProgress from "@material-ui/core/CircularProgress";
import { changeStatusProgess } from "../../actions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import DialogUpload from "./DialogUpload";

CreateForm.propTypes = {
    user: PropTypes.object,
    backgroundColor: PropTypes.string,
    changeStatusProgess: PropTypes.func,
    progress: PropTypes.bool,
};

CreateForm.defaultProps = {
    user: null,
    backgroundColor: null,
    changeStatusProgess: null,
    progress: null,
};

const mapStateToProps = (state) => {
    return {
        user: state.userState.user,
        backgroundColor: state.survey.backgroundColor,
        progress: state.tools.progress.show,
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        changeStatusProgess: (bStatus) => {
            dispatch(changeStatusProgess(bStatus));
        },
    };
};

function CreateForm(props) {
    return (
        <Container backgroundColor={props.backgroundColor}>
            {!props.user && (
                <Redirect
                    to={{
                        pathname: "/",
                        state: props.match.url,
                    }}
                />
            )}

            <TabHeader />
            <FormHeader />
            <DialogUpload />

            <Background show={props.progress}>
                <ContainerProgress>
                    <CustomCircularProgress />
                </ContainerProgress>
            </Background>
            {/* <Prompt when={true} message={() => `Bạn chắc chắn muốn thoát?`} /> */}
        </Container>
    );
}

const Container = styled.div`
    background-color: ${(props) =>
        props.backgroundColor ? props.backgroundColor : "while"};
    height: 100%;
    min-height: 100vh;
    padding-bottom: 30px;
    position: relative;
`;

const Background = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: 0.4s;
    ${(props) =>
        props.show
            ? `
                z-index: 99;
                opacity: 1;
            `
            : `
                z-index: -1;
                opacity: 0;
            `}
`;

const ContainerProgress = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    justify-content: center;
    transform: translateX(-50%) translateY(-50%);
`;

const CustomCircularProgress = styled(CircularProgress)`
    color: #0040f5 !important;
    width: 70px !important;
    height: 70px !important;
`;

export default connect(mapStateToProps, mapDispatchToProps)(CreateForm);
