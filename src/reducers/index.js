import { combineReducers } from "redux";
import userReducer from "./userReducer";
import slideBarReducer from "./slideBarReducer";
import surveyReducer from "./surveyReducer";
import colorReducer from "./colorReducer";

const rootReducers = combineReducers({
    userState: userReducer,
    slideBar: slideBarReducer,
    survey: surveyReducer,
    color: colorReducer,
});

export default rootReducers;
