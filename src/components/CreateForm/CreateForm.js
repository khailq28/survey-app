import React, { useEffect, useState } from "react";
import styled from "styled-components";
import FormHeader from "./FormHeader";
import TabHeader from "./TabHeader";
import { useHistory } from "react-router";
import CircularProgress from "@material-ui/core/CircularProgress";
import { changeStatusProgess } from "../../actions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import DialogUpload from "./DialogUpload";

CreateForm.propTypes = {
    user: PropTypes.object,
    checkLogin: PropTypes.string,
    backgroundColor: PropTypes.string,
    changeStatusProgess: PropTypes.func,
    progress: PropTypes.bool,
};

CreateForm.defaultProps = {
    user: null,
    checkLogin: "",
    backgroundColor: null,
    changeStatusProgess: null,
    progress: null,
};

const mapStateToProps = (state) => {
    return {
        user: state.userState.user,
        checkLogin: state.userState.checkLogin,
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
    var history = useHistory();
    var [loading, setLoading] = useState(false);

    useEffect(() => {
        if (props.checkLogin === "false") {
            history.replace("/");
        }
    });

    const handleLoading = () => {
        setLoading(true);
    };

    return (
        <Container backgroundColor={props.backgroundColor}>
            <TabHeader loading={loading} handleLoading={handleLoading} />
            <FormHeader loading={loading} />
            <DialogUpload />

            <Background show={props.progress}>
                <ContainerProgress>
                    <CustomCircularProgress />
                </ContainerProgress>
            </Background>
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
