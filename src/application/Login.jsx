import React, { PropTypes } from 'react';
import GetDebug from 'setup';
import Actions from 'actions/Actions';

const propTypes = {};

const defaultProps = {};

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.debug = GetDebug('app:login');
    }

    signInGoogle() {
        this.debug("Starting Google SignIn");
        Actions.GoogleSignIn();
    }

    render() {
        return (
            <div className="login">
            <h1>OAuth2 SignIn</h1>
            <button className="btn btn-primary" onClick={this.signInGoogle}>Google Sign In</button>
            </div> 
        );
    }
}

Login.propTypes = propTypes;
Login.defaultProps = defaultProps;

export default Login;
