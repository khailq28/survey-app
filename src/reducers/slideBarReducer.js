import * as actionType from "../actions/actionType";
var INITIAL_STATE = {
    status: false,
    title: "",
};

const slideBarReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionType.SET_STATUS_SLIDE_BAR:
            var { status, title } = action.oStatus;
            state = {
                status,
                title,
            };
            return { ...state };
        default:
            return { ...state };
    }
};

export default slideBarReducer;
