import React, { useState } from 'react';
import './AddTruck.css';
import { TextField, Card, Paper, Button } from '@material-ui/core';
import { getDevices , addTruck } from '../api/index';
import sensorIcon from '../assets/images/sensor-icon.svg';
import {ColumnImageText} from './AnalyticsFeed';
export const Heading = props => <div className="Heading">
    <h3>{props.children}</h3>
    <div></div>
</div>;

export default props => {
    const selectDevice = (device) => {
        setSelection(device._id);
    }

    const addTruckClick = () => {
        let payload = {
            name,from,to,departTime,arrivalTime,device: selectedDevice
        };
        addTruck(payload)
        .then(res => {
            if (res.data.success) {
                window.location.href = "/home/logistics";
            } else {
                alert(res.data.message);
            }
        })
        .catch (e => alert(e));
    }


    const [devices, setDevices] = useState(null);
    const [selectedDevice, setSelection] = useState(null);
    const [name, setName] = useState(null);
    const [from ,setFrom] = useState(null);
    const [to, setTo] = useState(null);
    const [departTime, setDepartTime] = useState(null);
    const [arrivalTime, setArrivalTime] = useState(null);

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
                <TextField variant="outlined" onChange = {e => setName(e.target.value)} value={name} label="Trip Name" fullWidth={true} />
                <TextField variant="outlined" onChange = {e => setFrom(e.target.value)} value={from} label="Departure City" fullWidth={true} />
                <TextField variant="outlined" onChange = {e => setTo(e.target.value)} value={to} label="Arrival City" fullWidth={true} />
                <TextField variant="outlined" onChange = {e => setDepartTime(e.target.value)} value={departTime} label="Departure Time" defaultValue={(new Date).toISOString().substr(0, 16)} type="datetime-local" fullWidth={true} />
                <TextField variant="outlined" onChange = {e => setArrivalTime(e.target.value)} value={arrivalTime} label="Arrival Time" defaultValue={(new Date).toISOString().substr(0, 16)} type="datetime-local" fullWidth={true} />


            </form>
        </Paper>
        <div style={{marginTop:20, marginBottom: 20}}/>
        <Heading>
            Select Device
        </Heading>
        <Paper className="selectDeviceForm">
            {devices !== null && devices.map(device => <ColumnImageText onClick = {() => selectDevice(device)}
                image = {sensorIcon} color={device._id === selectedDevice?"lightgreen":"lightcoral"} value={device.name}
            />
            )}
        </Paper>
        <div style={{marginTop:20, marginBottom: 20}}/>
        <Heading>
            Begin Trip
        </Heading>
        <Paper className="submissionForm">
            <small>Please verify all entered information as Trip once started cannot be changed.</small>
            <Button variant="contained" onClick={addTruckClick} color="secondary">Start Trip!</Button>
        </Paper>

    </Card>
}