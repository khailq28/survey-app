import { combineReducers } from "redux";
import userReducer from "./userReducer";
import slideBarReducer from "./slideBarReducer";

const rootReducers = combineReducers({
    userState: userReducer,
    slideBar: slideBarReducer,
});

export default rootReducers;
