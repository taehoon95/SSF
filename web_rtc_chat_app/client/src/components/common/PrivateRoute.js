import React from 'react';
import { Route, Redirect } from 'react-router-dom'; 
import isLogin from '../../utils/isLogin'
const PrivateRoute = ({component: Component, ...rest}) =>{

    return (
        <div>
            <Route {...rest} render={props => 
                ( isLogin() ? <Component {...props} /> : 
                <Redirect to="/LoginPage" /> )} />
        </div>
    );
};

export default PrivateRoute;