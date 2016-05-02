import React from 'react';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router';

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

class About extends React.Component{
    render () {
        return (<div> <h1>Moments In Time</h1> 
            <p> Moments In Time is a machine learning experimenti
                to see if your historical google Calendar data can tell you the best times to accomplish habits, do work or have less stress.</p>
        </div>)
    }
};

const MainRouter = (
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={About}/>
            <Route path="login" component={Login} />
            <Route component={Authenticated}>
                <Router path="welcome" component={Welcome} />        
            </Route>
            <Route path="*" component={NoMatch} />
        </Route>
    </Router>

);

export default MainRouter;
