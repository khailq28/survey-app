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
                { other: true },
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

        case actionType.CHANGE_TYPE_QUESTION:
            state.questions[action.index].questionType = action.value;
            state.questions[action.index].options = [{ optionText: "" }];
            return { ...state };

        case actionType.CHANGE_TITLE_QUESTION:
            state.questions[action.index].questionText = action.value;
            return { ...state };

        case actionType.CHANGE_OPTION:
            state.questions[action.i].options[action.j].optionText =
                action.value;
            return { ...state };

        case actionType.ADD_OPTION:
            var length = state.questions[action.index].options.length;
            if (state.questions[action.index].options[length - 1].other) {
                state.questions[action.index].options.splice(length - 1, 0, {
                    optionText: "",
                });
            } else {
                state.questions[action.index].options.push({ optionText: "" });
            }
            return { ...state };

        case actionType.ADD_OPTION_OTHER:
            state.questions[action.index].options.push({ other: true });
            return { ...state };

        case actionType.REMOVE_OPTION:
            if (state.questions[action.i].options.length > 1) {
                state.questions[action.i].options.splice(action.j, 1);
            }
            return { ...state };

        case actionType.CHANGE_REQUIRED:
            state.questions[action.i].required =
                !state.questions[action.i].required;
            return { ...state };

        case actionType.ADD_QUESTION:
            return { ...state, questions: action.questions };

        case actionType.COPY_QUESTION:
            return { ...state, questions: action.questions };

        case actionType.REMOVE_QUESTION:
            return { ...state, questions: action.questions };

        case actionType.CHANGE_STATUS_OPEN_QUESTION:
            state.questions.forEach((question, index) => {
                question.open = false;
            });
            state.questions[action.i].open = true;
            return { ...state };

        default:
            return { ...state };
    }
};

export default surveyReducer;
