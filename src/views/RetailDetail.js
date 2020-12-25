import React, { useState, useEffect } from 'react';
import './RetailDetail.css';
import { Paper, Card, Button, InputLabel, Select, MenuItem, FormControl, FormLabel, RadioGroup, Radio, FormControlLabel, TextField } from '@material-ui/core';
import truckIcon from '../assets/images/truck.svg';
import truckEngineIcon from '../assets/images/engine-temp.png';
import truckLocationMarker from '../assets/images/truck-location-marker.png';
import GoogleMapReact from 'google-map-react';
import tirePressureIcon from '../assets/images/tire-pressure-icon.png';
import oilGaugeIcon from '../assets/images/oil-guage-icon.png';
import temperatureIcon from '../assets/images/temperature-icon.png';
import humidityIcon from '../assets/images/humidity.png';

import { getDeviceById, getRetail, getSensors, getTruck, updateReport, updateRetail } from '../api';
import { BarChart, LineChart } from 'react-chartkick';
import { ColumnImageText, RetailItem, DEGREE_SYMBOL } from './AnalyticsFeed';
import shopIcon from '../assets/images/shop.png';
import dollarIcon from '../assets/images/dollar.png';
import basketIcon from '../assets/images/basket.png';
import shopThumb from '../assets/images/shopIcon.png';
import customerIcon from '../assets/images/customers.png';
import checkoutIcon from '../assets/images/checkout.png';
import shelfIcon from '../assets/images/shelf.png';
import productFrequencyIcon from '../assets/images/productfrequency.png';
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
    const [modal, setModal] = useState(false);
    const [retail, setRetail] = useState(false);
    const [sensors, setSensors] = useState([]);
    const [weight, setWeight] = useState(0);
    const [sensor, setSensor] = useState(0);
    let retailId = props.match.params.id;
    if (retailId === undefined || retailId === null) {
        window.location.href = '/home/retail';
    }

    const updateShelves = () => {
        updateRetail(props.match.params.id, {
            shelves: [
                ...retail.retail.shelves,
                {
                    sensor,
                    weight,
                }
            ]
        }).then(res => {
            alert(res.data.message);
            if (res.data.success) setModal(false);

        });

    }
    const fetchRetail = () => {
        getRetail(props.match.params.id).then(res => {
            if (res.data.success) {
                setRetail(res.data.retail);
                if (sensors.length !== 0) return;
                getDeviceById(res.data.retail.retail.device)
                    .then(res => {
                        if (res.data.success) {
                            setSensors(res.data.sensors.filter(S => /shelf_/.test(S.id.toLowerCase())));
                        }
                    });
            } else {
                alert(res.data.message);
            }
        }).catch(e => console.error(e));
    };

    useEffect(() => {
        setTimeout(fetchRetail, 3000);
    }, [props.match.params.id])

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
            <h3>Shelves</h3>
            <div></div>
        </div>
        {modal && <div className="modalMain">
            <Paper className="modalContentMain">
                <div className="modalHeading">
                    <h1>Add New Shelf</h1>
                </div>

                <div className="reportModalContent">
                    <FormControl>
                        <InputLabel id="deviceLabel">Select Sensor (sensor id should be prefixed with SHELF_)</InputLabel>
                        <Select placeholder="Select Sensor" onChange={e => { setSensor(e.target.value) }} labelId="deviceLabel">
                            {sensors?.map(sensor => {
                                return <MenuItem value={sensor._id}>{sensor.id.split("_")[1]}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                    <FormControl>
                        <TextField variant="outlined" value={weight} type={"number"} onChange={e => { setWeight(e.target.value) }} label="Weight (in grams)" fullWidth={true} />
                    </FormControl>


                </div>

                <div className="reportModalFooter">
                    <Button variant="contained" onClick={() => setModal(false)} color="secondary">Close</Button>
                    <Button variant="contained" onClick={() => { updateShelves() }} color="primary">Add Shelf</Button>
                </div>
            </Paper>
        </div>}

        {retail ? retail.shelves && retail.shelves.map(shelf => (
            <Paper className="conditionCards">
                <ColumnImageText
                    color="lightcoral"
                    image={shelfIcon} label="Name" value={shelf.name}
                /><ColumnImageText
                    color="lightblue"
                    image={productFrequencyIcon} label="Quantity Available" value={shelf.frequency}
                />
            </Paper>
        )) : <Skeleton height={10} width={800} style={{ marginLeft: 'auto' }} count={5} />
        }
        <Button
            variant="outlined"
            color="secondary"
            onClick={() => setModal(true)}
        >Add Shelf</Button>
        <div className="Heading">
            <h3>Recommendations</h3>
            <div></div>
        </div>

        <Paper className="conditionCards">
            {retail ? retail.recommendations.map(recommend => <Card style={{ margin: 5, padding: 30 }}>
                {recommend}
            </Card>) : <Skeleton height={10} width={800} style={{ marginLeft: 'auto' }} count={5} />}

        </Paper>

    </div>;
}

export default RetailDetailView;