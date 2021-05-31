import * as actionType from "../actions/actionType";
var INITIAL_STATE = {
    show: false,
};

const progressReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionType.CHANGE_STATUS_PROPGRESS:
            state.show = action.status;
            return { ...state };
        default:
            return { ...state };
    }
};

export default progressReducer;
