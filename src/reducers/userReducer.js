import * as actionType from "../actions/actionType";
var INITIAL_STATE = {
    user: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionType.SET_USER:
            return {
                ...state,
                user: action.user,
            };
        default:
            return state;
    }
};

export default userReducer;
