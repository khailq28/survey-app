import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useEffect } from "react";
import Login from "./components/Login";
import HomeBody from "./components/HomeBody";
import Header from "./components/Header";
import { connect } from "react-redux";
import { getUserAuth } from "./actions";
import FormHeader from "./components/FormHeader";
import { Prompt } from "react-router-dom";

function App(props) {
    useEffect(() => {
        props.getUserAuth();
    }, []);

    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Login />
                </Route>
                <Route path="/home">
                    <Header />
                    <HomeBody />
                </Route>
                <Route path="/form/:id">
                    <FormHeader />
                    <Prompt
                        when={true}
                        message={(location) =>
                            `Bạn chắc chắn muốn đi đến ${location.pathname}`
                        }
                    />
                </Route>
            </Switch>
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
