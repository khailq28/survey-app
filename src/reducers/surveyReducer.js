import * as actionType from "../actions/actionType";

var INITIAL_STATE = {
    author: "",
    title: "Mẫu Không tiêu đề",
    description: "",
    questions: [
        {
            id: "",
            questionText: "",
            questionType: "text",
            options: [{ optionText: "", other: false }],
            open: true,
            required: false,
            answers: [],
        },
    ],
    interfaceColor: "#673AB7",
    backgroundColor: "#F0EBF8",
    updateDate: "",
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
            state.questions[action.index].options = [
                { optionText: "", other: false },
            ];
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

        case actionType.CLEAN_SURVER_REDUCER:
            return {};
        default:
            return { ...state };
    }
};

export default surveyReducer;
