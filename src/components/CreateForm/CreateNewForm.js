import React from "react";
import FormBody from "./FormBody";
import FormHeader from "./FormHeader";

function CreateNewForm(props) {
    return (
        <div>
            <FormHeader user={props.user} signOut={props.signOut} />
            <FormBody />
        </div>
    );
}

export default CreateNewForm;
