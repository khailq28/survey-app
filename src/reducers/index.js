import { combineReducers } from "redux";
import userReducer from "./userReducer";
import toolsReducer from "./toolsReducer";
import surveyReducer from "./surveyReducer";
import colorReducer from "./colorReducer";
import allSurveyReducer from "./allSurveyReducer";
import submitReducer from "./submitReducer";
import results from "./resultsReducer";

const rootReducers = combineReducers({
    userState: userReducer,
    tools: toolsReducer,
    survey: surveyReducer,
    color: colorReducer,
    listSurvey: allSurveyReducer,
    submit: submitReducer,
    results,
});

export default rootReducers;
