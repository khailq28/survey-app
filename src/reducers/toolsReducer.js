import * as actionType from "../actions/actionType";
var INITIAL_STATE = {
    dialog: {
        show: false,
        id: "", //id can xoa
    },
    progress: {
        show: false,
    },
    sort: {
        value: 1, // 1 tang, -1 giam
    },
    search: "",
    viewMode: "grid",
    slideBar: {
        status: false,
        title: "",
    },
};

const toolsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionType.SET_STATUS_DIALOG:
            state.dialog.show = !state.dialog.show;
            state.dialog.id = action.id;
            return { ...state };

        case actionType.CHANGE_STATUS_PROPGRESS:
            state.progress.show = action.status;
            return { ...state };

        case actionType.SORT:
            state.sort.value = state.sort.value === 1 ? -1 : 1;
            return { ...state };

        case actionType.SEARCH:
            state.search = action.keyword;
            return { ...state };

        case actionType.SET_VIEW_MODE:
            state.viewMode = state.viewMode === "list" ? "grid" : "list";
            return { ...state };

        case actionType.SET_STATUS_SLIDE_BAR:
            var { status, title } = action.oStatus;
            state.slideBar = {
                status,
                title,
            };
            return { ...state };

        default:
            return { ...state };
    }
};

export default toolsReducer;
