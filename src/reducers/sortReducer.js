import * as actionType from "../actions/actionType";
var INITIAL_STATE = {
    value: 1, // 1 tang, -1 giam
};

const sortReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionType.SORT:
            state.value = state.value === 1 ? -1 : 1;
            return { ...state };
        default:
            return { ...state };
    }
};

export default sortReducer;
