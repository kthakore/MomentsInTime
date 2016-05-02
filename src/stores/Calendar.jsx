import {Store} from 'airflux';
import GetDebug from 'setup';
import Actions from 'actions/Actions';
import hello from 'hellojs';
import AuthStore from './Auth'; 

const calendarStoreDebug = global.GetDebug('store:calendar');

calendarStoreDebug("Initializing Calendar Store Class");

class CalendarStore extends Store {
    
    constructor(initialState) {
        super();
        this.state = initialState || {};

        this.debug = calendarStoreDebug;

        if (AuthStore.GetLoggedIn()) {
            this._fetch_calendars();
        }

        this.listenTo(Actions.FetchCalendarList, this._fetch_calendars);
        this.listenTo(AuthStore, this.OnAuthChange);
    }

    OnAuthChange(evt) {
        this.debug('Auth has changed');

        if (evt.name == 'LoggedIn:Success') {
            this._fetch_calendars();
        } else if (evt.name == 'LoggedOut::Failure') {
            this.debug('Should remove data');
        }

    }

    _create_authed_url( endpoint ) {
        const base = 'https://www.googleapis.com/calendar/v3/';
        var access_token = AuthStore.GetUserData().access_token;
        var url = base + endpoint + '?access_token=' +  access_token;
        this.debug("Created authed url: " + url);
        return url;
        
    }

    _fetch_calendars () {
        let self = this;
        $.get( this._create_authed_url('users/me/calendarList') ).then(function(json) {
            self.debug(json);
        }, function (e) {
            self.debug(e);
        });
    }



}


export default new CalendarStore();
