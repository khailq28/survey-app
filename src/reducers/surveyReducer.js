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
            options: [{ optionText: "" }],
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
                localStorage.setItem(
                    "surveys",
                    JSON.stringify(
                        JSON.parse(localStorage.getItem("surveys")).push(state),
                    ),
                );
            }
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
