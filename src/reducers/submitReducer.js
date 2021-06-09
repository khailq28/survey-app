import * as actionType from "../actions/actionType";
var INITIAL_STATE = [];

const submitReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionType.CREATE_SUBMIT_FORM:
            for (var i = 0; i < action.aId.length; i++) {
                state.push({
                    idQuestion: action.aId[i],
                    answers: { user: action.author, answer: "", checkbox: [] },
                });
            }
            return [...state];

        case actionType.PUSH_VALUE_TO_SUBMIT_REDUCER:
            if (action.typeQues === "checkbox") {
            } else {
                state[action.index].answers.answer = action.value;
            }

            return [...state];
        default:
            return [...state];
    }
};

export default submitReducer;
