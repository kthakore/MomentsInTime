import React from 'react'
import { Link } from 'react-router'
import GetDebug from 'setup';
import Actions from 'actions/Actions';

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = props;
        this.debug = GetDebug('app:header');
    }

    componentWillReceiveProps(nextProps) {
        this.debug('Changed Props: ', nextProps);
        this.setState(nextProps);
    }

    onClickSignout() {
        Actions.SignOut();
    }

    render() {
        this.debug(this.state);
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        
                        <Link to="/" className="navbar-brand">Moments In Time</Link>
                    </div>
                    <ul className="nav navbar-nav navbar-right">
                        {this.state.loggedIn ? (
                            <li><button className="btn btn-danger" onClick={this.onClickSignout} >Signout</button></li>
                         ) : ( 
                            <li><Link to="/login">Login</Link></li>
                        )}
                    </ul>
                </div>
            </nav>
        )

    }
};

export default Header;
