import React, { useState } from 'react';
import './AddFarm.css';
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
    return <Card className="AddFarmMain">
        <Heading>
            Register your Farm!
    </Heading>
        <Paper className="addTripForm">
            <small>Registering your farm with analytics is easy. Just add a few details to get started!</small>
            <form>
                <TextField variant="outlined" label="Farm Name" fullWidth={true} />
                <TextField variant="outlined" label="Farm Latitude" fullWidth={true} />
                <TextField variant="outlined" label="Farm Longtitude" fullWidth={true} />
                <TextField variant="outlined" label="Farm Area Characteristics" fullWidth={true} />


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
            <small>Please verify all entered information as Farm once registered cannot be changed.</small>
            <Button variant="contained" color="secondary">Register Farm!</Button>
        </Paper>

    </Card>
}