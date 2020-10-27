import React, { useState, useEffect } from 'react';
import './LogisticsView.css';
import { Paper } from '@material-ui/core';
import {DEGREE_SYMBOL} from './AnalyticsFeed';
import truckIcon from '../assets/images/truck.svg';
const TruckItem = props => <Paper className="TruckItem">
    <div className="imageHolder">
        <img className="image" src={truckIcon} />
    </div>
    <div className="contentItem">
        <div className="centerCol"><span className="routeTitle">{props.from} <span>{'-->'}</span> {props.to}</span></div>
        <div><span>Current Location: <strong>{props.current}</strong></span></div>
        <div className="twoCol"><span>Status: <span style={{ fontWeight: 'bold', color: 'green' }}>{props.onTime}</span></span> <span>Temperature: {props.temperature}</span></div>
        <div className="twoCol"><span>Departed On: {props.departed}</span><span>Estimated Arrival: {props.arrival}</span></div>
        <a style={{ marginLeft: 'auto', marginRight: 10 }} href="/home/logistics/detail">View Details</a>
    </div>
</Paper>
export default props => {
    return <div className="LogisticsMain">
        <div className="Heading">
            <h3>Trucks en Route</h3>
            <div></div>
        </div>
        <TruckItem
                from = "Quetta"
                to = "Peshawar"
                current = "Multan"
                departed = "14/07/2020 12:00"
                arrival = "15/07/2020 05:00"
                temperature = "22"
                onTime = "ON TIME"

        /><TruckItem
                from = "Karachi"
                to = "Islamabad"
                current = "Sukkur"
                departed = "15/07/2020 12:00"
                arrival = "16/07/2020 05:00"
                temperature = "28"
                onTime = "ON TIME"

        />
        <TruckItem
                from = "Hyderabad"
                to = "Gawadar"
                current = "Quetta"
                departed = "20/09/2020 12:00"
                arrival = "20/09/2020 18:00"
                temperature = "22"
                onTime = "ON TIME"

        />
        <div onClick={() => window.location.href = "/home/logistics/add"} className="addIcon">
            <span >+</span>
        </div>
    </div>
}   