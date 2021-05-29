import * as actionType from "../actions/actionType";

var data = JSON.parse(localStorage.getItem("surveys"));
var INITIAL_STATE = data ? data : [];

const allSurveyReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionType.CREATE_NEW_FORM:
            state.push({
                id: action.id,
                author: action.author,
                title: "Mẫu Không tiêu đề",
                description: "",
                questions: [
                    {
                        questionText: "",
                        questionType: "text",
                        options: [{ optionText: "" }],
                        open: true,
                        required: false,
                    },
                ],
                interfaceColor: "#673AB7",
                backgroundColor: "#F0EBF8",
            });
            localStorage.setItem("surveys", JSON.stringify(state));
            return [...state];

        case actionType.REMOVE_SURVEY:
            var arr = [...state];
            arr.forEach((survey, index) => {
                if (survey.id === action.id) {
                    arr.splice(index, 1);
                }
            });
            localStorage.setItem("surveys", JSON.stringify(arr));
            return [...arr];

        default:
            return [...state];
    }
};

export default allSurveyReducer;
