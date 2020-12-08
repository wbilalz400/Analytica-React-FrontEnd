import React, { useState } from 'react';
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

import { getTruck } from '../api';
import { BarChart, LineChart } from 'react-chartkick';
import { ColumnImageText, RetailItem, DEGREE_SYMBOL } from './AnalyticsFeed';
import shopIcon from '../assets/images/shop.png';
import dollarIcon from '../assets/images/dollar.png';
import basketIcon from '../assets/images/basket.png';
import shopThumb from '../assets/images/shopIcon.png';
import customerIcon from '../assets/images/customers.png';
import checkoutIcon from '../assets/images/checkout.png';
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
const RetailDetailView = props => {

    return <div className="RDMain">
        <div className="Heading">
            <h3>Logistics Report</h3>
            <div></div>
        </div>
        <RetailItem
            name="Yahya's General Store"
            temp="22"
            sales={300}
            customer={12}
        />
        <div className="Heading">
            <h3>Retail Summary</h3>
            <div></div>
        </div>
        <Paper className="conditionCards">

            <ColumnImageText
                color="lightcoral"
                image={temperatureIcon} label="Ambient Temperature" value={`${23}${DEGREE_SYMBOL} C`}
            />

            <ColumnImageText
                color="lightgreen"
                image={dollarIcon} label="Today's Sales" value={300}

            />
            <ColumnImageText
                color="orangered"
                image={customerIcon} label="Customers Served" value={12}
            />

            <ColumnImageText
                color="lightblue"
                image={checkoutIcon} label="Product Sold Today" value={7}
            />


        </Paper>
        <div className="Heading">
            <h3>Sales Statistics</h3>
            <div></div>
        </div>

        <Paper className="conditionCards">
            <div className="conditionMap">
                <div>Revenue</div>
                <LineChart
                    data={datum}
                    width="100%"
                    height="100%"
                />
            </div>
            <div className="conditionMap">
                <div>Customers frequency</div>
                <LineChart
                    data={datumA}
                    width="100%"
                    height="100%"
                />
            </div>
            <div className="conditionMap">
                <div>Product Sale Frequency</div>
                <LineChart
                    data={datumB}
                    width="100%"
                    height="100%"
                />
            </div>
            <div className="conditionMap">
                <div>Most Sold Products</div>
                <BarChart
                    data={[["Lays 250gm", 32], ["Pepsi 250 mL", 30], ["Pepsi 500 mL", 25], ["Tuc Half-Roll", 15], ["Dairy Milk",12], ["Household Broom",8]]}
                    width="100%"
                    height="100%"
                />
            </div>
        </Paper>
        <div className="Heading">
            <h3>Recommendations</h3>
            <div></div>
        </div>
        <Paper className="conditionCards">
            <Card style={{margin:5, padding:30}}>
                Please buy less stock of <strong>Lays Salted</strong> as it is not being sold.
            </Card>
            <Card style={{margin:5,padding:30}}>
                Please buy more stocks of <strong>Lays Masala</strong> as it is in demand.
            </Card>
            <Card style={{margin:5,padding:30}}>
                Please increase the ambient temperature as <strong>lower temperatures</strong> discourages customer to remain longer.
            </Card>
        </Paper>
       
    </div>;
}

export default RetailDetailView;