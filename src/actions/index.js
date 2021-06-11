import { auth, provider } from "../firebase";
import * as actionType from "./actionType";

// user
export const setUser = (payload) => ({
    type: actionType.SET_USER,
    user: payload,
});

export const setStatusLogin = (status) => ({
    type: actionType.SET_STATUS_LOGIN,
    status,
});

export function signInAPI() {
    return (dispatch) => {
        auth.signInWithPopup(provider)
            .then((payload) => {
                dispatch(setUser(payload.user));
                dispatch(cleanAllSurveys());
                dispatch(cleanSurvey());
            })
            .catch((error) => {
                alert(error.message);
            });
    };
}

export function cleanAllSurveys() {
    return {
        type: actionType.CLEAN_ALL_SURVEY_REDUCER,
    };
}

export function cleanSurvey() {
    return {
        type: actionType.CLEAN_SURVER_REDUCER,
    };
}

export function getUserAuth() {
    return (dispatch) => {
        auth.onAuthStateChanged(async (user) => {
            console.log("getuser");
            if (user) {
                dispatch(setUser(user));
                dispatch(setStatusLogin("true"));
            } else {
                dispatch(setStatusLogin("false"));
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

// tool
export function setStatusSlideBar(oStatus) {
    return {
        type: actionType.SET_STATUS_SLIDE_BAR,
        oStatus,
    };
}

export function changeStatusProgess(status) {
    return {
        type: actionType.CHANGE_STATUS_PROPGRESS,
        status,
    };
}

export function setStatusDialog(id) {
    return {
        type: actionType.SET_STATUS_DIALOG,
        id,
    };
}

export function setStatusDialogUploadOp(indexQues, indexOption) {
    return {
        type: actionType.SET_STATUS_DIALOG_UPLOAD_OPTION_IMAGE,
        indexQues,
        indexOption,
    };
}

export function sortListSurveys() {
    return {
        type: actionType.SORT,
    };
}

export function setViewMode() {
    return {
        type: actionType.SET_VIEW_MODE,
    };
}

export function searchSurvey(keyword) {
    return {
        type: actionType.SEARCH,
        keyword,
    };
}

// home
export function setSurveysHome(aSurvey) {
    return {
        type: actionType.SET_SURVER_IN_HOME_PAGE,
        aSurvey,
    };
}

export function setSurvey(oSurvey) {
    return {
        type: actionType.SET_SURVEY,
        oSurvey,
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

export function setOptions(options, index) {
    return {
        type: actionType.SET_OPTION,
        options,
        index,
    };
}

export function changeReruied(i) {
    return {
        type: actionType.CHANGE_REQUIRED,
        i, //vi tri cua cau hoi
    };
}

export function setQuestions(questions) {
    return {
        type: actionType.SET_QUESTIONS,
        questions,
    };
}

export function setQuestionImage(image, index) {
    return {
        type: actionType.SET_QUESTION_IMAGE,
        image,
        index,
    };
}

export function setOptionImage(image, indexQues, indexOption) {
    return {
        type: actionType.SET_OPTION_IMAGE,
        image,
        indexQues,
        indexOption,
    };
}

export function changeStatusOpenQuestion(i) {
    return {
        type: actionType.CHANGE_STATUS_OPEN_QUESTION,
        i, //vi tri cua cau hoi
    };
}

export function setInterfaceColor(interfaceColor) {
    return {
        type: actionType.SET_INTERFACE_COLOR,
        interfaceColor,
    };
}

export function setBackgroundColor(backgroundColor) {
    return {
        type: actionType.SET_BACKGROUND_COLOR,
        backgroundColor,
    };
}

export function createSubmitData(author, aId) {
    return {
        type: actionType.CREATE_SUBMIT_FORM,
        author,
        aId,
    };
}

export function pushValueToSubmit(typeQues, value, index) {
    return {
        type: actionType.PUSH_VALUE_TO_SUBMIT_REDUCER,
        typeQues,
        value,
        index,
    };
}
