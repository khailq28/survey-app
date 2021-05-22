import { combineReducers } from "redux";
import userReducer from "./userReducer";
import slideBarReducer from "./slideBarReducer";
import surveyReducer from "./surveyReducer";

const rootReducers = combineReducers({
    userState: userReducer,
    slideBar: slideBarReducer,
    survey: surveyReducer,
});

export default rootReducers;
