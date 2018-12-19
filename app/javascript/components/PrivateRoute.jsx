import React from 'react';
import { Route, Redirect } from "react-router-dom";

function PrivateRoute({ component: Component, ...rest }) {
    const handleRender = (props) => {
        const access_token = localStorage.getItem("access-token");
        return access_token ? (
            <Component {...props} />
        ) : (
            <Redirect
                to={{
                    pathname: "/login",
                    state: { from: props.location }
                }}
            />
        );
    };

    return (
        <Route {...rest} render={handleRender}/>
    );
}

export default PrivateRoute;