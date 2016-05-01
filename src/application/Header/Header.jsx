import React from 'react'
import { Link } from 'react-router'

import AuthStore from 'stores/Auth'

class Header extends React.Component {

    render() {

        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        
                        <Link to="/" className="navbar-brand">Moments In Time</Link>
                    </div>
                    <ul className="nav navbar-nav navbar-right">
                        <li><Link to="/login">Login</Link></li>
                    </ul>
                </div>
            </nav>
        )

    }
};

export default Header;
