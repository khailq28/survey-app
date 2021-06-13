import * as actionType from "../actions/actionType";
var INITIAL_STATE = [];

const submitReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionType.CREATE_SUBMIT_FORM:
            for (var i = 0; i < action.aId.length; i++) {
                state.push({
                    idQuestion: action.aId[i].questionId,
                    type: action.aId[i].type,
                    required: action.aId[i].required,
                    validate: false,
                    answers: { user: action.author, answer: "", checkbox: [] },
                });
            }
            return [...state];

        case actionType.PUSH_VALUE_TO_SUBMIT_REDUCER:
            if (state[action.index].type === "checkbox") {
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
            state[action.index].answers.checkbox.forEach((answer, index) => {
                if (action.value.optionId === answer.optionId) {
                    state[action.index].answers.checkbox[index].value =
                        action.value.value;
                    return;
                }
            });
            return [...state];

        case actionType.VALIDATE_FORM_SUBMIT:
            state.forEach((element, index) => {
                if (element.required) {
                    if (element.type === "checkbox") {
                        element.validate =
                            element.answers.checkbox.length === 0
                                ? true
                                : false;
                    } else {
                        element.validate =
                            element.answers.answer === "" ? true : false;
                    }
                }
            });
            return [...state];
        default:
            return [...state];
    }
};

export default submitReducer;
