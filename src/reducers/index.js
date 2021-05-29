import { combineReducers } from "redux";
import userReducer from "./userReducer";
import slideBarReducer from "./slideBarReducer";
import surveyReducer from "./surveyReducer";
import colorReducer from "./colorReducer";
import allSurveyReducer from "./allSurveyReducer";
import dialogReducer from "./dialogReducer";
import sortReducer from "./sortReducer";
import searchReducer from "./searchReducer";

const rootReducers = combineReducers({
    userState: userReducer,
    slideBar: slideBarReducer,
    survey: surveyReducer,
    color: colorReducer,
    listSurvey: allSurveyReducer,
    dialog: dialogReducer,
    sort: sortReducer,
    search: searchReducer,
});

export default rootReducers;
