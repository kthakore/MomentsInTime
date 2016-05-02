import React, { PropTypes } from 'react';
import GetDebug from 'setup';
import Actions from 'actions/Actions';

const propTypes = {};

const defaultProps = {};

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.debug = GetDebug('app:login');
        this.onClickGoogleSignin.bind(this);
    }

    onClickGoogleSignin() {
        Actions.GoogleSignIn();
        this.debug("Starting Google SignIn");

    }

    render() {
        return (
            <div className="login">
                <h1>OAuth2 SignIn</h1>
                {/* the below () => ... is because handlers no longer pass in context to *this* */}
                <button className="btn btn-primary" onClick={() => {this.onClickGoogleSignin() } }>Google Sign In</button>
            </div> 
        );
    }
}

Login.propTypes = propTypes;
Login.defaultProps = defaultProps;

export default Login;
