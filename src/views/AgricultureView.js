import React, { useState, useEffect } from 'react';
import './LogisticsView.css';
//import { Paper } from '@material-ui/core';
//import truckIcon from '../assets/images/truck.svg';
import { FarmItem } from './AnalyticsFeed';

export default props => {
    return <div className="LogisticsMain">
        <div className="Heading">
            <h3>Farms</h3>

            <div>

            </div>

        </div>
        <FarmItem id='FRM-1' temp='32' humidity='50' pH='4.5' />
        <a style={{ marginLeft: 'auto', marginRight: 10 }} href="/home/agriculture/detail">View Details</a>
        <FarmItem id='FRM-2' temp='45' humidity='70' pH='6.5' />
        <a style={{ marginLeft: 'auto', marginRight: 10 }} href="/home/agriculture/detail">View Details</a>
        <FarmItem id='FRM-3' temp='56' humidity='90' pH='5.5' />
        <a style={{ marginLeft: 'auto', marginRight: 10 }} href="/home/agriculture/detail">View Details</a>

        <div onClick={() => window.location.href = "/home/agriculture/add"} className="addIcon">
            <span >+</span>
        </div>



    </div>
}   