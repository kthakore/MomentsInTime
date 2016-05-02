import React from 'react'
import AuthStore from 'stores/Auth'
import getDebug from 'setup'



class Authenticated extends React.Component {

    constructor(props, context) {
        super(props);
        this.router = context.router;
    }

    componentWillMount() {
        if (!AuthStore.GetLoggedIn()) {
            this.router.push('/login');
        }
    }

    render() {

        return (
            <div className="authenticated">
                {this.props.children}
            </div>
        );
    }

};


Authenticated.contextTypes = {
        router: React.PropTypes.func.isRequired
};

export default Authenticated;
