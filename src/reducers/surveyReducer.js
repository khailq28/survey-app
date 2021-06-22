import * as actionType from "../actions/actionType";

var INITIAL_STATE = {
    _id: "",
    author: "",
    title: "Mẫu Không tiêu đề",
    description: "",
    image: "",
    questions: [],
    interfaceColor: "#673AB7",
    backgroundColor: "#F0EBF8",
    updateDate: "",
    status: false,
    submiter: [],
};

const surveyReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionType.SET_SURVEY:
            state = action.oSurvey;
            return { ...state };

        case actionType.SET_TITLE_FORM:
            state.title = action.title;
            return { ...state };

        case actionType.SET_DESCRIPTION:
            state.description = action.description;
            return { ...state };

        case actionType.CHANGE_TYPE_QUESTION:
            state.questions[action.index].questionType = action.value;
            // state.questions[action.index].options = [
            //     { optionText: "Tùy chọn 1", image: "", other: false },
            // ];
            return { ...state };

        case actionType.CHANGE_TITLE_QUESTION:
            state.questions[action.index].questionText = action.value;
            return { ...state };

        case actionType.SET_OPTION:
            state.questions[action.index].options = action.options;
            return { ...state };

        case actionType.CHANGE_REQUIRED:
            state.questions[action.i].required =
                !state.questions[action.i].required;
            return { ...state };

        case actionType.SET_QUESTIONS:
            console.log("set");
            state.questions = action.questions;
            return { ...state };

        case actionType.CHANGE_STATUS_OPEN_QUESTION:
            state.questions.forEach((question, index) => {
                question.open = false;
            });
            state.questions[action.i].open = true;
            return { ...state };

        case actionType.SET_INTERFACE_COLOR:
            state.interfaceColor = action.interfaceColor;
            return { ...state };

        case actionType.SET_BACKGROUND_COLOR:
            state.backgroundColor = action.backgroundColor;
            return { ...state };

        case actionType.SET_QUESTION_IMAGE:
            state.questions[action.index].image = action.image;
            return { ...state };

        case actionType.SET_OPTION_IMAGE:
            state.questions[action.indexQues].options[
                action.indexOption
            ].image = action.image;
            return { ...state };

        case actionType.CHANGE_STATUS_FORM:
            state.status = !state.status;
            return { ...state };

        case actionType.SET_SUBMITER:
            state.submiter = action.submiter;
            return { ...state };

        case actionType.CLEAN_SURVER_REDUCER:
            return {};
        default:
            return { ...state };
    }
};

export default surveyReducer;
