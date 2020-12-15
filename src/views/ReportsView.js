import React, { useState, useEffect } from 'react';
import './LogisticsView.css';
//import { Paper } from '@material-ui/core';
//import truckIcon from '../assets/images/truck.svg';
import { FarmItem, ReportItem, RetailItem } from './AnalyticsFeed';
import { getFarms } from '../api';
const ReportsView = props => {

    return <div className="LogisticsMain">
        <div className="Heading">
            <h3>Reports</h3>

            <div>

            </div>

        </div>

        {[<ReportItem
            name="Quarter Report"
            type="Monthly"
            occursAt = "08:00 AM"
            items = {4}
        />, <a style={{ marginLeft: 'auto', marginRight: 10 }} href={"/home/reports/detail/"}>View Details</a>
        ]}

        <div onClick={() => window.location.href = "/home/reports/add"} className="addIcon">
            <span >+</span>
        </div>



    </div>
}

export default ReportsView;