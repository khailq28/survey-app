import React from "react";
import { connect } from "react-redux";
import { signOutAPI } from "../actions";
import FormHeader from "./FormHeader";

function CreateNewForm(props) {
    return (
        <div>
            <FormHeader user={props.user} signOut={props.signOut} />
        </div>
    );
}

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

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewForm);
