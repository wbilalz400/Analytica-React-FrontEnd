import React, { useState, useEffect } from 'react';
import './LogisticsView.css';
//import { Paper } from '@material-ui/core';
//import truckIcon from '../assets/images/truck.svg';
import { FarmItem, RetailItem } from './AnalyticsFeed';
import { getFarms } from '../api';
const RetailView = props => {

    return <div className="LogisticsMain">
        <div className="Heading">
            <h3>Retail Outlets</h3>

            <div>

            </div>

        </div>

        {[<RetailItem
            id={"A"}
            temp={"B"}
            sales={12}
            customer={15}
        />, <a style={{ marginLeft: 'auto', marginRight: 10 }} href={"/home/agriculture/"}>View Details</a>
        ]}

        <div onClick={() => window.location.href = "/home/agriculture/add"} className="addIcon">
            <span >+</span>
        </div>



    </div>
}

export default RetailView;