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

import { getRetail, getTruck } from '../api';
import { BarChart, LineChart } from 'react-chartkick';
import { ColumnImageText, RetailItem, DEGREE_SYMBOL } from './AnalyticsFeed';
import shopIcon from '../assets/images/shop.png';
import dollarIcon from '../assets/images/dollar.png';
import basketIcon from '../assets/images/basket.png';
import shopThumb from '../assets/images/shopIcon.png';
import customerIcon from '../assets/images/customers.png';
import checkoutIcon from '../assets/images/checkout.png';
import Skeleton from 'react-loading-skeleton';
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
    const [retail, setRetail] = useState(false);
    let retailId = props.match.params.id;
    if (retailId === undefined || retailId === null) {
        window.location.href = '/home/retail';
    }
    const fetchRetail = () => {
        getRetail(props.match.params.id).then(res => {
            if (res.data.success) {
                setRetail(res.data.retail);
            } else {
                alert(res.data.message);
            }
        }).catch(e => console.error(e));
    };

    useEffect(() => {
        setTimeout(fetchRetail, 3000);
    })

    return <div className="RDMain">
        <div className="Heading">
            <h3>Store Report</h3>
            <div></div>
        </div>
        {retail ?
            <RetailItem
                name={retail.retail.name}
                temp={retail.temperature}
                sales={retail.productsSold}
                customer={retail.customers}
            /> : <Skeleton height={20} width={800} style={{ marginLeft: 'auto' }} count={4} />}
        <div className="Heading">
            <h3>Store Summary</h3>
            <div></div>
        </div>
        {retail ? <Paper className="conditionCards">

            <ColumnImageText
                color="lightcoral"
                image={temperatureIcon} label="Ambient Temperature" value={`${retail.temperature}${DEGREE_SYMBOL} C`}
            />

            <ColumnImageText
                color="lightgreen"
                image={dollarIcon} label="Today's Sales" value={retail.revenue}

            />
            <ColumnImageText
                color="orangered"
                image={customerIcon} label="Customers Served" value={retail.customers}
            />

            <ColumnImageText
                color="lightblue"
                image={checkoutIcon} label="Product Sold Today" value={retail.productsSold}
            />


        </Paper> : <Skeleton height={100} width={800} style={{ marginLeft: 'auto' }} count={1} />}
        <div className="Heading">
            <h3>Sales Statistics</h3>
            <div></div>
        </div>

        {retail ? <Paper className="conditionCards">
            <div className="conditionMap">
                <div>Revenue</div>
                <LineChart
                    data={retail.revenueChart}
                    width="100%"
                    height="100%"
                />
            </div>
            <div className="conditionMap">
                <div>Customers frequency</div>
                <LineChart
                    data={retail.customerFrequencyChart}
                    width="100%"
                    height="100%"
                />
            </div>
            <div className="conditionMap">
                <div>Product Sale Frequency</div>
                <LineChart
                    data={retail.productSaleFrequencyChart}
                    width="100%"
                    height="100%"
                />
            </div>
            <div className="conditionMap">
                <div>Most Sold Products</div>
                <BarChart
                    data={retail.productsFrequency.map(PF => [PF.product, PF.quantity])}
                    width="100%"
                    height="100%"
                />
            </div>
        </Paper> : <Skeleton height={80} width={800} style={{ marginLeft: 'auto' }} count={5} />}
        <div className="Heading">
            <h3>Recommendations</h3>
            <div></div>
        </div>

        <Paper className="conditionCards">
            {retail ? retail.recommendations.map(recommend => <Card style={{ margin: 5, padding: 30 }}>
                Please buy less stock of <strong>Lays Salted</strong> as it is not being sold.
            </Card>) : <Skeleton height={10} width={800} style={{ marginLeft: 'auto' }} count={5} />}

        </Paper>

    </div>;
}

export default RetailDetailView;