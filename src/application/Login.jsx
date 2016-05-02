import React, { PropTypes } from 'react';
import GetDebug from 'setup';
import Actions from 'actions/Actions';
import AuthStore from 'stores/Auth';
const propTypes = {};

const defaultProps = {};

class Login extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.debug = GetDebug('app:login');
        this.router = context.router;
        this.state = { loggedIn: AuthStore.GetLoggedIn() }

    }

    componentDidMount() {
        let self = this;
        this.debug('DidMount');
        this.unsubscribe = AuthStore.listen((evt) => { self.onAuthChange(evt) });
        this.debug(AuthStore);
        this.debug(this);


    }


    onAuthChange(status) {
        this.debug('Auth changed: ', status);
        if (this.state.loggedIn == false && AuthStore.GetLoggedIn() == true) {
            this.router.push('/welcome');
        }
    }


    componentWillUnmount() {
        this.unsubscribe();
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

Login.contextTypes = {
        router: React.PropTypes.func.isRequired
};


export default Login;
