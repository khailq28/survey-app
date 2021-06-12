import * as actionType from "../actions/actionType";
var INITIAL_STATE = [];

const submitReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionType.CREATE_SUBMIT_FORM:
            for (var i = 0; i < action.aId.length; i++) {
                state.push({
                    idQuestion: action.aId[i],
                    type: "",
                    answers: { user: action.author, answer: "", checkbox: [] },
                });
            }
            return [...state];

        case actionType.PUSH_VALUE_TO_SUBMIT_REDUCER:
            if (action.typeQues) {
                state[action.index].type = action.typeQues;
            }

            if (action.typeQues === "checkbox") {
                var check = true;
                state[action.index].answers.checkbox.forEach(
                    (answer, index) => {
                        if (answer.optionId === action.value.optionId)
                            check = false;
                        if (
                            answer.optionId === action.value.optionId &&
                            !action.value.checked
                        ) {
                            state[action.index].answers.checkbox.splice(
                                index,
                                1,
                            );
                        }
                    },
                );
                if (action.value.checked && check)
                    state[action.index].answers.checkbox.push({
                        value: action.value.value,
                        optionId: action.value.optionId,
                    });
            } else {
                state[action.index].answers.answer = action.value;
            }
            return [...state];

        case actionType.CHANGE_VALUE_OTHER_CHECKBOX:
            console.log(action);
            state[action.index].answers.checkbox.forEach((answer, index) => {
                if (action.value.optionId === answer.optionId) {
                    state[action.index].answers.checkbox[index].value =
                        action.value.value;
                    return;
                }
            });
            return [...state];
        default:
            return [...state];
    }
};

export default submitReducer;
