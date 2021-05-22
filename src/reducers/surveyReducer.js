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
            open: true,
            required: false,
        },
        {
            questionText: "asdffdsa?",
            questionType: "radio",
            options: [
                { optionText: "a" },
                { optionText: "b" },
                { optionText: "c" },
            ],
            open: false,
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
        default:
            return { ...state };
    }
};

export default surveyReducer;
