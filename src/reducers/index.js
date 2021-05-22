import { combineReducers } from "redux";
import userReducer from "./userReducer";
import slideBarReducer from "./slideBarReducer";
import surveyReducer from "./surveyReducer";
import statusChangeTitleReducer from "./statusChangeTitleReducer";

const rootReducers = combineReducers({
    userState: userReducer,
    slideBar: slideBarReducer,
    survey: surveyReducer,
    statusChangeTitle: statusChangeTitleReducer,
});

export default rootReducers;
