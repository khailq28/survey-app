import * as actionType from "../actions/actionType";

var INITIAL_STATE = {
    id: "",
    author: "",
    title: "Mẫu Không tiêu đề",
    description: "",
    questions: [
        {
            questionText: "asdf?",
            questionType: "radio",
            options: [
                { optionText: "a" },
                { optionText: "b" },
                { optionText: "c" },
            ],
            open: false,
            required: false,
        },
        {
            questionText: "asdffdsa?",
            questionType: "checkbox",
            options: [
                { optionText: "a" },
                { optionText: "b" },
                { optionText: "c" },
            ],
            open: true,
            required: false,
        },
    ],
};

const surveyReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionType.SET_ID_FORM:
            state.id = action.id;
            return { ...state };
        case actionType.SET_TITLE_FORM:
            state.title = action.title;
            return { ...state };
        case actionType.SET_DESCRIPTION:
            state.description = action.description;
            return { ...state };
        case actionType.SET_AUTHOR:
            state.author = action.author;
            return { ...state };
        case actionType.CHANGE_TYPE_QUESTION:
            state.questions[action.index].questionType = action.value;
            return { ...state };
        case actionType.CHANGE_TITLE_QUESTION:
            state.questions[action.index].questionText = action.value;
            return { ...state };
        case actionType.CHANGE_OPTION:
            state.questions[action.i].options[action.j].optionText =
                action.value;
            return { ...state };
        default:
            return { ...state };
    }
};

export default surveyReducer;
