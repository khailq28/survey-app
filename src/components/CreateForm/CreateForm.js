import React from "react";
import styled from "styled-components";
import { Prompt } from "react-router-dom";
import FormHeader from "./FormHeader";
import TabHeader from "./TabHeader";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import PropTypes from "prop-types";

CreateForm.propTypes = {
    user: PropTypes.object,
    backgroundColor: PropTypes.string,
};

CreateForm.defaultProps = {
    user: null,
    backgroundColor: null,
};

const mapStateToProps = (state) => {
    return {
        user: state.userState.user,
        backgroundColor: state.survey.backgroundColor,
    };
};

function CreateForm(props) {
    return (
        <Container backgroundColor={props.backgroundColor}>
            {!props.user && (
                <Redirect
                    to={{
                        pathname: "/",
                        state: {
                            from: props.match.url,
                        },
                    }}
                />
            )}
            <FormHeader />
            <TabHeader />
            <Prompt when={true} message={() => `Bạn chắc chắn muốn thoát?`} />
        </Container>
    );
}

const Container = styled.div`
    background-color: ${(props) =>
        props.backgroundColor ? props.backgroundColor : "while"};
    height: 100%;
`;

export default connect(mapStateToProps, null)(CreateForm);
