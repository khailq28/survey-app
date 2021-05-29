import * as actionType from "../actions/actionType";
var INITIAL_STATE = "grid";

var viewModeReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionType.SET_VIEW_MODE:
            state = state === "list" ? "grid" : "list";
            return state;
        default:
            return state;
    }
};

export default viewModeReducer;
