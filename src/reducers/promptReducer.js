import * as actionType from "../actions/actionType";
var INITIAL_STATE = {
    show: true,
};

const promptReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionType.CHANGE_STATUS_PROMPT:
            state.show = action.status;
            return { ...state };
        default:
            return { ...state };
    }
};

export default promptReducer;
