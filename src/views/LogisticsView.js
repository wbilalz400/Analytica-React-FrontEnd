import React, {useState, useEffect} from 'react';
import './LogisticsView.css';
import { Paper } from '@material-ui/core';
import truckIcon from '../assets/images/truck.svg';

export default props => {
    return <div className="LogisticsMain">
        <div className="Heading">
            <h3>Trucks en Route</h3>
            <div></div>
        </div>
        <Paper className="TruckItem">
            <div className="imageHolder">
                <img className="image" src={truckIcon}/>
            </div>
            <div className="contentItem">
                <div className="centerCol"><span className="routeTitle">Islamabad <span>{'-->'}</span> Karachi</span></div>
                <div><span>Current Location: <strong>Multan</strong></span></div>
                <div className="twoCol"><span>Status: <span style={{fontWeight:'bold',color:'green'}}>ON TIME</span></span> <span>Temperature: 27C</span></div>
                <div className="twoCol"><span>Departed On: 02:00</span><span>Estimated Arrival: 18:00</span></div>
                <a style={{marginLeft:'auto',marginRight:10}} href="/home/logistics/detail">View Details</a>
            </div>
        </Paper>
        
    </div>
}   