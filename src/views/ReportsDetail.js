import React, { useState, useEffect } from 'react';
import './ReportsDetail.css';
import { Paper, Card, Button, InputLabel, Select, MenuItem } from '@material-ui/core';
import { ColumnImageText, RetailItem, DEGREE_SYMBOL, ReportItem } from './AnalyticsFeed';
import { getDevices } from '../api';
const HISTORY = 0, CURRENT = 1;
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
const ReportsDetailView = props => {
    const [device, setDevice] = useState(false);
    const [devices, setDevices] = useState([]);
    const [sensor, setSensor] = useState(false);
    const [sensors, setSensors] = useState([]);
    const [type, setType] = useState(HISTORY);

    useEffect(() => {
        getDevices().then(res => {
            if (res.data.success) {
                setDevices(res.data.devices);
            }
        })
            .catch(e => alert(e));
    }, []);

    useEffect(() => {

    },[device])

    return <div className="RDMain">
        <div className="Heading">
            <h3>Report Description</h3>
            <div></div>
        </div>
        <ReportItem
            name="Quarter Report"
            type="Monthly"
            occursAt="08:00 AM"
            items={4}
        />
        <div className="Heading">
            <h3>Report Summary</h3>
            <div></div>
        </div>
        <Paper className="conditionCards">
            <p>This reports occurs every week on 8 AM. This report has 4 items</p>
        </Paper>
        <div className="Heading">
            <h3>Report Components</h3>
            <div></div>
        </div>
        <Paper className="conditionCards">
            <Card style={{ margin: 5, }} className="itemContainer">
                <div className="itemRow">
                    <h3>Device Name</h3>
                    <h2>Lawn Device</h2>
                </div>

                <div className="itemRow">
                    <h3>Sensor Name</h3>
                    <h2>Humidty Sensors</h2>
                </div>

                <div className="itemRow">
                    <h3>Data Type</h3>
                    <h2>Current Data</h2>
                </div>

            </Card>
            <Card style={{ margin: 5, }} className="itemContainer">
                <div className="itemRow">
                    <h3>Device Name</h3>
                    <h2>Grocery Store Device</h2>
                </div>

                <div className="itemRow">
                    <h3>Sensor Name</h3>
                    <h2>Number of Products Sold</h2>
                </div>

                <div className="itemRow">
                    <h3>Data Type</h3>
                    <h2>History</h2>
                </div>

            </Card>
            <Card style={{ margin: 5, }} className="itemContainer">
                <div className="itemRow">
                    <h3>Device Name</h3>
                    <h2>GX-902 Truck Device</h2>
                </div>

                <div className="itemRow">
                    <h3>Sensor Name</h3>
                    <h2>Humidty Sensors</h2>
                </div>

                <div className="itemRow">
                    <h3>Data Type</h3>
                    <h2>Current Data</h2>
                </div>
            </Card>
            <Button variant="contained" color="primary">+ Add New Item</Button>

        </Paper>
        <div className="modalMain">
            <Paper className="modalContentMain">
                <div className="modalHeading">
                    <h1>Add New Item</h1>
                </div>

                <div className="reportModalContent">
                    <InputLabel id="deviceLabel">Select Device</InputLabel>
                    <Select labelId="deviceLabel">
                        {devices?.map(device => {
                            return <MenuItem value={device._id}>{device.name}</MenuItem>
                        })}
                    </Select>
                    <InputLabel id="SensorLabel">Select Sensor</InputLabel>
                    <Select labelId="SensorLabel">
                        <MenuItem value={1}>Temperature Sensor</MenuItem>
                        <MenuItem value={2}>Humidity Sensor</MenuItem>
                    </Select>

                    
                </div>
                
                <div className="reportModalFooter">
                    <Button variant="contained" color="primary">Add Item</Button>
                </div>
            </Paper>
        </div>

    </div>;
}

export default ReportsDetailView;