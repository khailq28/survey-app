import * as actionType from "../actions/actionType";

var INITIAL_STATE = { status: false };

const statusChangeTitleReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionType.CHANGE_TITLE:
            state.status = action.status;
            return { ...state };
        default:
            return { ...state };
    }
};

export default statusChangeTitleReducer;
