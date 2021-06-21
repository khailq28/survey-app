import * as actionType from "../actions/actionType";
var INITIAL_STATE = [{ answers: [] }];

const resultsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionType.GET_ALL_RESULTS:
            return action.aResults;

        case actionType.CLEAN_ALL_RESULT_REDUCER:
            return [];

        default:
            return [...state];
    }
};

export default resultsReducer;
