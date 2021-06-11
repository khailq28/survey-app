import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useEffect } from "react";
import { connect } from "react-redux";
import { getUserAuth } from "./actions";
import routes from "./routes";

function App(props) {
    console.log("app");

    useEffect(() => {
        props.getUserAuth();
    });

    const showContentMenu = (routes) => {
        var result = null;
        if (routes.length > 0) {
            result = routes.map((route, index) => {
                return (
                    <Route path={route.path} exact={route.exact} key={index}>
                        {route.main}
                    </Route>
                );
            });
        }
        return result;
    };

    return (
        <Router>
            <Switch>{showContentMenu(routes)}</Switch>
        </Router>
    );
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        getUserAuth: () => {
            dispatch(getUserAuth());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
