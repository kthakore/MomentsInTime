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
        this._check_LoggedIn();
    }

    _check_LoggedIn () {
        var self = this;
        var online = function(session) {
            var currentTime = (new Date()).getTime() / 1000;
            self.state.userdata = session;
            authStoreDebug("Checking if online(google): ", session);
            return session && session.access_token && session.expires > currentTime;
        };

        var google = hello('google').getAuthResponse();

        if (online(google)) {
            this.state.loggedIn = true;
            authStoreDebug("Is online");
            this.trigger({
                name: "loggedIn:Success",
                state: self.state
            });
        }



    }


    onGoogleSignIn () {
        var self = this;
        self.state.userdata = {};
        self.loggedIn = false;
        // add calendar to scope
        hello('google').login({scope: 'email,openid'}, function (userdata) {
            self.state.userdata = userdata.authResponse;
            self.loggedIn = true;
            authStoreDebug('Login: ', self.state.userdata, self);

            self.trigger({
                name: "LoggedIn:Success"
            });
            authStoreDebug("ASDSAASDASD");
            authStoreDebug('Signin Success');
        }, function () {
            self.trigger({
                name: "LoggedIn:Failed",
                state: self.state
            });

            authStoreDebug('Signin Failure');
        });
        this.trigger('hi');

    }



    GetLoggedResponse() {
        return this.state.response;
    }

    GetLoggedIn() {
        return this.state.loggedIn;
    }

};

export default new AuthStore();
