import * as actionType from "../actions/actionType";
var INITIAL_STATE = {
    show: false,
    id: "", //id can xoa
};

const dialogReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionType.SET_STATUS_DIALOG:
            state.show = !state.show;
            state.id = action.id;
            return { ...state };
        default:
            return { ...state };
    }
};

export default dialogReducer;
