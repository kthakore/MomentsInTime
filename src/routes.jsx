import React from 'react';
import { Router, Route, Link, hashHistory } from 'react-router';

import App from './application/App.jsx'
import Login from './application/Login.jsx'
import Authenticated from './application/authenticated/Authenticated.jsx'

class Welcome extends React.Component{
    render () {
        return (<h1>Authenticated</h1>);
    }
};

 class NoMatch extends React.Component{
    render () {
        return (<h1>Page Not Found</h1>)
    }
};

const MainRouter = (
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <Route path="login" component={Login} />
            <Route component={Authenticated}>
                <Router path="welcome" component={Welcome} />        
            </Route>
            <Route path="*" component={NoMatch} />
        </Route>
    </Router>

);

export default MainRouter;
