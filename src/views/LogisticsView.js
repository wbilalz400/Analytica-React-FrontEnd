import React, { useState, useEffect } from 'react';
import './LogisticsView.css';
import { Paper } from '@material-ui/core';
import {DEGREE_SYMBOL} from './AnalyticsFeed';
import truckIcon from '../assets/images/truck.svg';
import {getTrucks} from '../api';
const TruckItem = props => <Paper className="TruckItem">
    <div className="imageHolder">
        <img className="image" src={truckIcon} />
    </div>
    <div className="contentItem">
        <div className="centerCol"><span className="routeTitle">{props.from} <span>{'-->'}</span> {props.to}</span></div>
        <div><span>Current Location: <strong>{props.current}</strong></span></div>
        <div className="twoCol"><span>Status: <span style={{ fontWeight: 'bold', color: 'green' }}>{props.onTime}</span></span> <span>Temperature: {props.temperature}</span></div>
        <div className="twoCol"><span>Departed On: {props.departed}</span><span>Estimated Arrival: {props.arrival}</span></div>
        <a style={{ marginLeft: 'auto', marginRight: 10 }} href={"/home/logistics/" + props.id}>View Details</a>
    </div>
</Paper>
export default props => {
    const [trucks, setTrucks] = useState(undefined);
    if (trucks === undefined) {
        getTrucks()
        .then(res => {
            if (res.data.success) {
                setTrucks(res.data.trucks);
            } else {
                alert(res.data.message);
            }
        })
        .catch(e => alert(e));
    }
    return <div className="LogisticsMain">
        <div className="Heading">
            <h3>Trucks en Route</h3>
            <div></div>
        </div>
        
        {trucks !== undefined && trucks.map( truck => <TruckItem
                from = {truck.truck.from}
                to = {truck.truck.to}
                current = {"Data not submitted"}
                departed = {truck.truck.departTime}
                arrival = {truck.truck.arrivalTime}
                temperature = {truck.tempSensors.length > 0 && truck.tempSensors[0].data.length !== 0 ? parseInt(truck.tempSensors[0].data[0].value):'Not available'}
                onTime = "ON TIME"
                id = {truck.truck._id}
        />)}
        
        <div onClick={() => window.location.href = "/home/logistics/add"} className="addIcon">
            <span >+</span>
        </div>
    </div>
}   