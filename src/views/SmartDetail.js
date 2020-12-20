import React, { useState, useEffect } from 'react';
import './RetailDetail.css';
import { Paper, Card } from '@material-ui/core';
import truckIcon from '../assets/images/truck.svg';
import truckEngineIcon from '../assets/images/engine-temp.png';
import truckLocationMarker from '../assets/images/truck-location-marker.png';
import GoogleMapReact from 'google-map-react';
import tirePressureIcon from '../assets/images/tire-pressure-icon.png';
import oilGaugeIcon from '../assets/images/oil-guage-icon.png';
import temperatureIcon from '../assets/images/temperature-icon.png';
import humidityIcon from '../assets/images/humidity.png';

import { getSmart } from '../api';
import { BarChart, LineChart } from 'react-chartkick';
import { ColumnImageText, RetailItem, SmartItem, DEGREE_SYMBOL } from './AnalyticsFeed';
import shopIcon from '../assets/images/shop.png';
import dollarIcon from '../assets/images/dollar.png';
import basketIcon from '../assets/images/basket.png';
import shopThumb from '../assets/images/shopIcon.png';
import customerIcon from '../assets/images/customers.png';
import checkoutIcon from '../assets/images/checkout.png';
import Skeleton from 'react-loading-skeleton';
import personIcon from '../assets/images/person.png';
import smartHomeMainIcon from '../assets/images/smartHomeMain.png';
import smartHomeIcon from '../assets/images/smartHomeIcon.png';
import electricIcon from '../assets/images/electricMeter (1).png';
import data from '../data';
let datum = {};
let date = new Date();
for (let i = 0; i < 50; i++) {
    datum[`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`] = 30 + Math.random() * 1060;
    date.setDate(date.getDate() + 1);
};
let datumA = {};
date = new Date();
for (let i = 0; i < 50; i++) {
    datumA[`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`] = 30 + Math.random() * 60;
    date.setDate(date.getDate() + 1);
};

let datumB = {};
date = new Date();
for (let i = 0; i < 50; i++) {
    datumB[`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`] = 30 + Math.random() * 100;
    date.setDate(date.getDate() + 1);
};
const SmartDetailView = props => {
    let retailId = props.match.params.id;
    if (retailId === undefined || retailId === null) {
        window.location.href = '/home/retail';
    }
    const retail = "";
    const [smart, setSmart] = useState(null);
    const [interval, setMyInterval] = useState(null);
    const fetchData = () => {
        getSmart(props.match.params.id)
            .then(res => {
                if (res.data.success) {
                    setSmart(res.data.smart);
                } else {
                    alert(res.data.message);
                }
            })
            .catch(e => console.error(e));
    };

    useEffect(() => {
        if (interval === null) {
            setMyInterval(setInterval(fetchData, 3000));
        }
    }, [interval]);



    return <div className="RDMain">
        <div className="Heading">
            <h3>Smart Home & Office Report</h3>
            <div></div>
        </div>
        {smart ?
            <SmartItem
                name={smart.smart.name}
                temp={(smart.temperatureValues && smart.temperatureValues.length !== 0) ? smart.temperatureValues[0] : null}
                electricity={(smart.electricityValues && smart.electricityValues.length !== 0) ? smart.electricityValues[0] : null}
                humidity={(smart.humidityValues && smart.humidityValues.length !== 0) ? smart.humidityValues[0] : null}
            /> : <Skeleton height={20} width={800} style={{ marginLeft: 'auto' }} count={4} />}
        <div className="Heading">
            <h3>Home & Office Summary</h3>
            <div></div>
        </div>
        {smart ? <Paper className="conditionCards">
            {(smart.temperatureValues && smart.temperatureValues.length !== 0) &&
                <ColumnImageText
                    color="lightcoral"
                    image={temperatureIcon} label="Ambient Temperature" value={`${parseInt(smart.temperatureValues[0])}${DEGREE_SYMBOL} C`}
                />}
            {(smart.electricityValues && smart.electricityValues.length !== 0) &&
                <ColumnImageText
                    color="orange"
                    image={electricIcon} label="Electric Usage" value={parseFloat(smart.electricityValues[0]).toFixed(3)}

                />
            }
            <ColumnImageText
                color="lightgreen"
                image={personIcon} label="Persons detected" value={4}
            />
            {(smart.electricityAvg && smart.electricityAvg.length !== 0) &&
                <ColumnImageText
                    color="lightblue"
                    image={electricIcon} label="Avg Electricity Use  " value={`${parseFloat(smart.electricityAvg[0]).toFixed(2)} kWh`}
                />
            }


        </Paper> : <Skeleton height={100} width={800} style={{ marginLeft: 'auto' }} count={1} />}
        <div className="Heading">
            <h3>Home & Office Statistics</h3>
            <div></div>
        </div>

        {smart ? <Paper className="conditionCards">
            {smart.temperatureChart && smart.temperatureChart.map(chart => <div className="conditionMap">
                <div>Temperature</div>
                <LineChart
                    data={chart}
                    width="100%"
                    height="100%"
                />
            </div>
            )}
            {smart.humidityChart && smart.humidityChart.map(chart => <div className="conditionMap">
                <div>Humidity</div>
                <LineChart
                    data={chart}
                    width="100%"
                    height="100%"
                />
            </div>
            )}
            {smart.electricityChart && smart.electricityChart.map(chart => <div className="conditionMap">
                <div>Electric Load</div>
                <LineChart
                    data={chart}
                    width="100%"
                    height="100%"
                />
            </div>
            )}
            {smart.electricityPredictions && smart.electricityPredictions.map(eP => <div className="conditionMap">
                <div>Predicted Electric Load</div>
                <LineChart
                    data={eP}
                    width="100%"
                    height="100%"
                />
            </div>)}


        </Paper> : <Skeleton height={80} width={800} style={{ marginLeft: 'auto' }} count={5} />}
        <div className="Heading">
            <h3>Recommendations</h3>
            <div></div>
        </div>

        <Paper className="conditionCards">
            {smart ? smart.recommendation.map(recommend => <Card style={{ margin: 5, padding: 30 }}>
                {recommend}
            </Card>) : <Skeleton height={10} width={800} style={{ marginLeft: 'auto' }} count={5} />}

        </Paper>

    </div>;
}

export default SmartDetailView;