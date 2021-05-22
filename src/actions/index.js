import { auth, provider } from "../firebase";
import * as actionType from "./actionType";

export const setUser = (payload) => ({
    type: actionType.SET_USER,
    user: payload,
});

export function signInAPI() {
    return (dispatch) => {
        auth.signInWithPopup(provider)
            .then((payload) => {
                dispatch(setUser(payload.user));
            })
            .catch((error) => {
                alert(error.message);
            });
    };
}

export function getUserAuth() {
    return (dispatch) => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                dispatch(setUser(user));
            }
        });
    };
}

export function signOutAPI() {
    return (dispatch) => {
        auth.signOut()
            .then(() => {
                dispatch(setUser(null));
            })
            .catch((error) => {
                console.log(error.message);
            });
    };
}

export function setStatusSlideBar(oStatus) {
    return {
        type: actionType.SET_STATUS_SLIDE_BAR,
        oStatus,
    };
}

export function setIdForm(id) {
    return {
        type: actionType.SET_ID_FORM,
        id,
    };
}

export function setTitleForm(title) {
    return {
        type: actionType.SET_TITLE_FORM,
        title,
    };
}

export function setDescription(description) {
    return {
        type: actionType.SET_DESCRIPTION,
        description,
    };
}

export function setAuthor(author) {
    return {
        type: actionType.SET_AUTHOR,
        author,
    };
}
