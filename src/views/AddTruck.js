import React, { useState } from 'react';
import './AddTruck.css';
import { TextField, Card, Paper, Button } from '@material-ui/core';
import { getDevices } from '../api/index';
import sensorIcon from '../assets/images/sensor-icon.svg';
import {ColumnImageText} from './AnalyticsFeed';
export const Heading = props => <div className="Heading">
    <h3>{props.children}</h3>
    <div></div>
</div>;

export default props => {
    const selectDevice = (device) => {
        setSelection(device.name);
    }


    const [devices, setDevices] = useState(null);
    const [selectedDevice, setSelection] = useState(null);
    if (devices === null) {
        getDevices()
            .then(({ data }) => {
                if (data.success) {
                    setDevices(data.devices);
                }
            })
    }
    return <Card className="ATMain">
        <Heading>
            Plan a Trip
    </Heading>
        <Paper className="addTripForm">
            <small>Add a trip is as easy as entering a few details and selecting the corresponding device</small>
            <form>
                <TextField variant="outlined" label="Trip Name" fullWidth={true} />
                <TextField variant="outlined" label="Departure City" fullWidth={true} />
                <TextField variant="outlined" label="Arrival City" fullWidth={true} />
                <TextField variant="outlined" label="Departure Time" defaultValue={(new Date).toISOString().substr(0, 16)} type="datetime-local" fullWidth={true} />
                <TextField variant="outlined" label="Arrival Time" defaultValue={(new Date).toISOString().substr(0, 16)} type="datetime-local" fullWidth={true} />


            </form>
        </Paper>
        <div style={{marginTop:20, marginBottom: 20}}/>
        <Heading>
            Select Device
        </Heading>
        <Paper className="selectDeviceForm">
            {devices !== null && devices.map(device => <ColumnImageText onClick = {() => selectDevice(device)}
                image = {sensorIcon} color={device.name === selectedDevice?"lightgreen":"lightcoral"} value={device.name}
            />
            )}
        </Paper>
        <div style={{marginTop:20, marginBottom: 20}}/>
        <Heading>
            Begin Trip
        </Heading>
        <Paper className="submissionForm">
            <small>Please verify all entered information as Trip once started cannot be changed.</small>
            <Button variant="contained" color="secondary">Start Trip!</Button>
        </Paper>

    </Card>
}