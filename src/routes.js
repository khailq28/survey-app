import Login from "./components/Login";
import HomeBody from "./components/Home/HomeBody";
import Header from "./components/Home/Header";
import { Prompt } from "react-router-dom";
import FormHeader from "./components/CreateForm/FormHeader";
import TabHeader from "./components/CreateForm/TabHeader";

import React from "react";

const routes = [
    {
        path: "/",
        exact: true,
        main: ({ match, location }) => (
            <Login match={match} location={location} />
        ),
    },
    {
        path: "/home",
        exact: false,
        main: ({ match, location }) => (
            <>
                <Header match={match} location={location} />
                <HomeBody />
            </>
        ),
    },
    {
        path: "/form/:id",
        exact: false,
        main: ({ match, location }) => (
            <>
                <FormHeader match={match} location={location} />
                <TabHeader />
                <Prompt
                    when={true}
                    message={() => `Bạn chắc chắn muốn thoát?`}
                />
            </>
        ),
    },
];

export default routes;
