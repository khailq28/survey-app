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

        case actionType.CLEARN_ALL_SURVEY_REDUCER:
            return [];

        // case actionType.CREATE_NEW_FORM:
        //     state.push({
        //         id: action.id,
        //         author: action.author,
        //         title: "Mẫu Không tiêu đề",
        //         description: "",
        //         questions: [
        //             {
        //                 questionText: "",
        //                 questionType: "text",
        //                 options: [{ optionText: "" }],
        //                 open: true,
        //                 required: false,
        //                 answers: [],
        //             },
        //         ],
        //         interfaceColor: "#673AB7",
        //         backgroundColor: "#F0EBF8",
        //         updateDate: "",
        //     });
        //     localStorage.setItem("surveys", JSON.stringify(state));
        //     return [...state];
        default:
            return [...state];
    }
};

export default allSurveyReducer;
