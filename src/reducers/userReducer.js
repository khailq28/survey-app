import * as actionType from "../actions/actionType";
var INITIAL_STATE = {
    user: null,
    checkLogin: "",
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionType.SET_USER:
            return {
                ...state,
                user: action.user,
            };

        case actionType.SET_STATUS_LOGIN:
            return {
                ...state,
                checkLogin: action.status,
            };
        default:
            return state;
    }
};

export default userReducer;
