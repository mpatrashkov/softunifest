import React, { Component } from 'react';
import Toolbar from './Toolbar';
import SideTabBar from './SideTabBar';
import './mainview.css';
import MonthView from './MonthView';
import DayView from './DayView';
import FAB from './FAB';
import Schedule from './Schedules';


import NewEventView from './NewEventView';

let events = [];


class MainView extends Component {

    constructor(props) {
        super(props);

        let s = localStorage.getItem("events");
        if(s != null) {
            events = JSON.parse(s);
            alert(events);
        }

        this.state = {
            sView: <MonthView onDateChanged={(date) => {this.onDateChanged(date)}}/>,
            layout: true,
            date: undefined
        }
    }

    onDateChanged(date) {
        
        this.setState({
            date: date.toString().split(',')
        })
    }

    onClick(index) {
        if(index == 0) {
            
            this.setState({
                sView: <MonthView onDateChanged={(date) => {this.onDateChanged(date)}}/>,
                layout: true
            })
        }
        else if(index == 1) {
            this.setState({
                sView: <DayView day={this.state.date[2]} month={this.state.date[1]} year={this.state.date[3]} weekday={this.state.date[0]}/>,
                layout: true
            })
        } 
        else if(index == 3) {
            
            this.setState({
                layout: false
            })
        }
    }

    createNewEvent(info) {
        events.push(info);
        localStorage.setItem('events', info.stringify());
    }

    render() {
        let layoutView = <div id="container">
                            <Toolbar text="Моят календар"/>
                            <div id="container-horizontal">
                                <SideTabBar onClick={(index) => {this.onClick(index)}}/>
                                {this.state.sView}
                            </div>
                            <FAB onClick={() => {this.onClick(3)}}/>
                         </div> 

        if(!this.state.layout) {
            layoutView = <NewEventView onExit={() => this.onClick(0)} onCreate={(info) => {this.createNewEvent(info)}}/>
        }
        return (

            <div>
            {layoutView}
            </div>
        );
    }
}

export default MainView;