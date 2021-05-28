import Login from "./components/Login";
import HomeBody from "./components/Home/HomeBody";
import Header from "./components/Home/Header";
import CreateForm from "./components/CreateForm/CreateForm";

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
            <CreateForm match={match} location={location} />
        ),
    },
];

export default routes;
