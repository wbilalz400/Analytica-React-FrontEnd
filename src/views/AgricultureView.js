import React, { useState, useEffect } from 'react';
import './LogisticsView.css';
//import { Paper } from '@material-ui/core';
//import truckIcon from '../assets/images/truck.svg';
import { FarmItem } from './AnalyticsFeed';
import { getFarms } from '../api';
export default props => {
    const [farms, setFarms] = useState(null);

    if (farms === null) {
        getFarms()
            .then(farms => { setFarms(farms) });
    }
    return <div className="LogisticsMain">
        <div className="Heading">
            <h3>Farms</h3>

            <div>

            </div>

        </div>
        {farms !== null && farms.map(farm => {
            let temp = -1, humidity = -1, pH = -1;
            let tempSensorsWithData = farm.tempSensors.filter(tP => tP.data.length !== 0);
            let humidSensorsWithData = farm.humidSensors.filter(hD => hD.data.length !== 0);
            let pHSensorsWithData = farm.pHSensors.filter(pH => pH.data.length !== 0);

            temp = tempSensorsWithData.length > 0 ? parseInt(tempSensorsWithData[0].data[0].value).toPrecision(2) : null;
            humidity = humidSensorsWithData.length > 0 ? parseInt(humidSensorsWithData[0].data[0].value).toPrecision(2) : null;
            pH = pHSensorsWithData.length > 0 ? parseInt(pHSensorsWithData[0].data[0].value).toPrecision(2) : null;

            return [<FarmItem
                id={farm.farm.name}
                temp={temp}
                humidity={humidity}
                pH={pH}
            />, <a style={{ marginLeft: 'auto', marginRight: 10 }} href={"/home/agriculture/"+farm.farm._id}>View Details</a>
            ]
        })}
        
        <div onClick={() => window.location.href = "/home/agriculture/add"} className="addIcon">
            <span >+</span>
        </div>



    </div>
}   