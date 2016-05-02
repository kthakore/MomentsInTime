import React from 'react'
import { Link } from 'react-router'
import Header from './Header/Header'
import AuthStore from 'stores/Auth'
import CalendarStore from 'stores/Calendar'
import getDebug from 'setup'



class App extends React.Component {

    constructor(args) {
        super(args);
        this.debug = getDebug('app');
        this.state = { loggedIn: AuthStore.GetLoggedIn() }
    }

    componentDidMount() {
        let self = this;
        this.debug('DidMount');
        this.unsubscribe = AuthStore.listen((evt) => { self.onAuthChange(evt) });
        this.debug(AuthStore);
        this.debug(this);
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    onAuthChange(status) {
        this.debug('Auth changed: ', status);
        this.setState({
            loggedIn: AuthStore.GetLoggedIn()
        });
    }


    render() {
        return (
            <div className="app">
                <Header loggedIn={this.state.loggedIn} />
                <div className="container-fluid">
                    {this.props.children}
                </div>
            </div>
            )
    }
};

export default App;
