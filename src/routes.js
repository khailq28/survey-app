import Login from "./components/Login";
import NotFound from "./components/NotFound";
import Home from "./components/Home/Home";
import CreateForm from "./components/CreateForm/CreateForm";

import React from "react";
import SubmitForm from "./components/SubmitForm/SubmitForm";
import PreviewForm from "./components/Preview/PreviewForm";

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
        main: () => <Home />,
    },
    {
        path: "/form/edit/:id",
        exact: false,
        main: ({ match, location }) => (
            <CreateForm match={match} location={location} />
        ),
    },
    {
        path: "/preview/:id",
        exact: false,
        main: ({ match, location }) => (
            <PreviewForm match={match} location={location} />
        ),
    },
    {
        path: "/form/:id",
        exact: false,
        main: ({ match, location }) => (
            <SubmitForm match={match} location={location} />
        ),
    },
    {
        path: "",
        exact: false,
        main: () => <NotFound />,
    },
];

export default routes;
