import React, { useState, useEffect } from 'react';
import './LogisticsView.css';
//import { Paper } from '@material-ui/core';
//import truckIcon from '../assets/images/truck.svg';

import { FarmItem, SmartItem } from './AnalyticsFeed';
import { getSmarts } from '../api';

export default props => {

    const [smarts, setSmarts] = useState(null);

    useEffect(() => {
        setTimeout(fetchData, 100);
    }, []);
    const fetchData = () => {
        getSmarts()
            .then(res => {
                if (res.data.success) {
                    setSmarts(res.data.smarts);
                }
                else
                    alert(res.data.message);
            })
            .catch(e => console.error(e));
    }
    return <div className="LogisticsMain">
        <div className="Heading">
            <h3>Smart Home & Offices</h3>

            <div>

            </div>

        </div>
        {smarts !== null && smarts.map(smart => {

            return [<SmartItem
                name={smart.smart.name}
                temp={(smart.temperatureValues && smart.temperatureValues.length !== 0) ? smart.temperatureValues[0] : null}
                humidity={(smart.humidityValues && smart.humidityValues.length !== 0) ? smart.humidityValues[0] : null}
                electricity={(smart.electricityValues && smart.electricityValues.length !== 0) ? smart.electricityValues[0] : null}
            />, <a style={{ marginLeft: 'auto', marginRight: 10 }} href={"/home/smart/" + smart.smart._id}>View Details</a>
            ]
        })}

        <div onClick={() => window.location.href = "/home/smart/add"} className="addIcon">
            <span >+</span>
        </div>

    </div>
}   