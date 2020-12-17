import React, { useState, useEffect } from 'react';
import './LogisticsView.css';
//import { Paper } from '@material-ui/core';
//import truckIcon from '../assets/images/truck.svg';
import { FarmItem, ReportItem, RetailItem } from './AnalyticsFeed';
import { getFarms, getReports } from '../api';
import Skeleton from 'react-loading-skeleton';
const WEEKLY = 0, MONTHLY = 1, QUARTERLY = 2, YEARLY = 3;

const stringResource = {
    [WEEKLY]: "Weekly",
    [MONTHLY]: "Monthly",
    [QUARTERLY]: "Quarterly",
    [YEARLY]: "Yearly"
}
const ReportsView = props => {
    const [reports, setReports] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const fetchData = () => {
        getReports()
            .then(res => {
                if (res.data.success) {
                    setReports(res.data.reports);
                    console.log(res.data.reports);
                } else {
                    alert(res.data.message);
                }
            })
            .catch(e => console.log(e))
            .finally(setLoaded(true));
    }
    useEffect(() => {
        if (!loaded) {
            setTimeout(fetchData,3000);
        }
    }, [])
    return <div className="LogisticsMain">
        <div className="Heading">
            <h3>Reports</h3>

            <div>

            </div>

        </div>

        {reports.length !== 0?reports?.map(report => [<ReportItem
            name={report.name}
            type={stringResource[report.type]}
            occursAt={report.time}
            items={report.reportItems?.length}
        />, <a style={{ marginLeft: 'auto', marginRight: 10 }} href={"/home/reports/" + report._id}>View Details</a>
        ]):<Skeleton height={100} width={1000} count = {5}/>}

        <div onClick={() => window.location.href = "/home/reports/add"} className="addIcon">
            <span >+</span>
        </div>



    </div>
}

export default ReportsView;