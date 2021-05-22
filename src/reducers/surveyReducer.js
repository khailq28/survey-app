import * as actionType from "../actions/actionType";

var INITIAL_STATE = {
    id: "",
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
    ],
};

const surveyReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionType.SET_ID_FORM:
            console.log(action);
            return { ...state };
        case actionType.SET_TITLE_FORM:
            state.title = action.title;
            return { ...state };
        default:
            return { ...state };
    }
};

export default surveyReducer;
