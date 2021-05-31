import * as actionType from "../actions/actionType";
// import socket from "../socket";

// socket.on("SERVER_SEND_SURVEYS", (aData) => {
//     dispatch(setSurveysHome(aData));
// });

var INITIAL_STATE = [];

const allSurveyReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionType.SET_SURVER_IN_HOME_PAGE:
            state = action.aSurvey;
            return [...state];

        case actionType.CLEAN_ALL_SURVEY_REDUCER:
            return [];

        default:
            return [...state];
    }
};

export default allSurveyReducer;
