import React from 'react'
import { Redirect, Route } from 'react-router-dom'


const ProtectedRoute = ({ component: Component, ...rest }) => {

    const token = localStorage.getItem("token");

    return (
        <Route
            {...rest}
            render={props => {
                if (token)
                    return <Component {...props} />
                else
                    return <Redirect to="/auth" />
            }}
        />
    )
}

export default ProtectedRoute;
