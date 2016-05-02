import React from 'react'
import AuthStore from 'stores/Auth'
import CalendarStore from 'stores/Calendar'
import getDebug from 'setup'

class Calendars extends React.Component {

    constructor(args) {
        super(args);
        this.debug = getDebug('app:authenticated:calendars');
        this.state = { calendars : CalendarStore.GetCalendars() };
        
    }

    componentDidMount() {
        let self = this;
        this.debug('DidMount');
        this.unsubscribe = CalendarStore.listen((evt) => { self.onCalendarStoreChange(evt) });
    
    }

    onCalendarStoreChange(evt) {
        this.setState({
            calendars : CalendarStore.GetCalendars()
        });
    }

    componentWillUnmount() {

        this.unsubscribe();
    }


    render() {
        this.debug("render", this.state.items);
        return (
            <div className="userCalendars">
                <h1>Your Calendars</h1>
                <ul>
                    {_.map(this.state.calendars, (item, i) => { return (<li key={item.id} >Calendar {i}: {item.description}</li>); })}
                </ul>
            </div>
        );

    }



}


export default Calendars
