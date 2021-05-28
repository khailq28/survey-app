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

export function changeTypeQuestion(value, index) {
    return {
        type: actionType.CHANGE_TYPE_QUESTION,
        value,
        index, //vi tri cua doi tuong
    };
}

export function changeTitleQuestion(value, index) {
    return {
        type: actionType.CHANGE_TITLE_QUESTION,
        value,
        index, //vi tri cua doi tuong
    };
}

export function changeOption(value, i, j) {
    return {
        type: actionType.CHANGE_OPTION,
        value,
        i, //vi tri cua cau hoi
        j, //vi tri cua cau tra loi
    };
}

export function addOption(index) {
    return {
        type: actionType.ADD_OPTION,
        index, //vi tri cua cau hoi
    };
}

export function addOptionOther(index) {
    return {
        type: actionType.ADD_OPTION_OTHER,
        index, //vi tri cua cau hoi
    };
}

export function removeOption(i, j) {
    return {
        type: actionType.REMOVE_OPTION,
        i, //vi tri cua cau hoi
        j, //vi tri cua cau tra loi
    };
}

export function changeReruied(i) {
    return {
        type: actionType.CHANGE_REQUIRED,
        i, //vi tri cua cau hoi
    };
}

export function addQuestion(questions) {
    return {
        type: actionType.ADD_QUESTION,
        questions,
    };
}

export function copyQuestion(questions) {
    return {
        type: actionType.COPY_QUESTION,
        questions,
    };
}

export function deleteQuestion(questions) {
    return {
        type: actionType.REMOVE_QUESTION,
        questions,
    };
}

export function changeStatusOpenQuestion(i) {
    return {
        type: actionType.CHANGE_STATUS_OPEN_QUESTION,
        i, //vi tri cua cau hoi
    };
}
