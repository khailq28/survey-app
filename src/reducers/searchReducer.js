import * as actionType from "../actions/actionType";
var INITIAL_STATE = "";

var searchReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionType.SEARCH:
            return action.keyword;
        default:
            return state;
    }
};

export default searchReducer;
