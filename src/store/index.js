import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleWare from "redux-thunk";

import rootReducer from "../reducers";

const composeEnhancers =
    typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
              // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
          })
        : compose;

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunkMiddleWare)),
);

export default store;
