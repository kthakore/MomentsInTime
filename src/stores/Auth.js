import {Store} from 'airflux';
import GetDebug from 'setup';
import config from 'config';
import Actions from 'actions/Actions';
import hello from 'hellojs';

const authStoreDebug = global.GetDebug('store:auth');

authStoreDebug("Initializing Auth Store");

class AuthStore extends Store {

    constructor(initialState) {
        super();
        hello.init({google: _.get(config, 'auth.google.clientID')});
        this.state = initialState || { loggedIn : false };
        this.listenTo(Actions.GoogleSignIn, this.onGoogleSignIn);
        this.listenTo(Actions.SignOut, this.onSignOut);
        this.debug = authStoreDebug;
        this._check_LoggedIn();
    }

    _check_LoggedIn () {
        var self = this;
        var online = function(session) {
            var currentTime = (new Date()).getTime() / 1000;
            self.state.userdata = session;
            self.debug("Checking if online(google): ", session);
            return session && session.access_token && session.expires > currentTime;
        };

        var google = hello('google').getAuthResponse();

        if (online(google)) {
            this.state.loggedIn = true;
            this.debug("Is online");
            this.trigger({
                name: "LoggedIn:Success",
                state: self.state
            });
        }



    }

    onSignOut() {
        let self = this;
        hello('google').logout().then(function () {
         self.state.userdata = false;
         self.state.loggedIn = false;
         self.trigger({
                name: "LoggedOut:Success"
            });

        }, function (e) {
          self.trigger({
                name: "LoggedOut:Failed"
            });


        });
    }

    onGoogleSignIn () {
        let self = this;
        self.state.userdata = {};
        self.state.loggedIn = false;
        // add calendar to scope
        hello('google').login({scope: 'email,openid'}, function (userdata) {
            self.state.userdata = userdata.authResponse;
            self.state.loggedIn = true;
            self.debug('Login: ', self.state.userdata, self);

            self.trigger({
                name: "LoggedIn:Success"
            });
            self.debug('Signin Success');
        }, function () {
            self.trigger({
                name: "LoggedIn:Failed",
                state: self.state
            });

            self.debug('Signin Failure');
        });

    }



    GetLoggedResponse() {
        return this.state.response;
    }

    GetLoggedIn() {
        return this.state.loggedIn;
    }

};

export default new AuthStore();
