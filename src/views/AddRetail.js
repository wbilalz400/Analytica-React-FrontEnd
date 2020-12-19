import React, { useState, useEffect } from 'react';
import './AddRetail.css';
import { TextField, Card, Paper, Button } from '@material-ui/core';
import { getDevices, addFarm, addRetail, getRetail } from '../api/index';
import sensorIcon from '../assets/images/sensor-icon.svg';
import { ColumnImageText } from './AnalyticsFeed';
export const Heading = props => <div className="Heading">
    <h3>{props.children}</h3>
    <div></div>
</div>;

export default props => {

   
    const selectDevice = (device) => {
        setSelection(device._id);
    }

    const addRetailClick = () => {
        let payload = {
            name: name,
            device: selectedDevice,
            location: {
                lat,
                long
            },
        };
        addRetail(payload)
            .then(res => {
                if (res.data.success) window.location.href = "/home/retail";
                else {
                    alert(res.data.message);
                }
            })
    }

    const [devices, setDevices] = useState(null);
    const [selectedDevice, setSelection] = useState(null);
    const [name, setName] = useState(null);
    const [lat, setLat] = useState(null);
    const [long, setLong] = useState(null);

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
            Add your store!
    </Heading>
        <Paper className="addTripForm">
            <small>Registering your store with us is easy! Just add a few details to get started!</small>
            <form>
                <TextField variant="outlined" value={name} onChange={e => setName(e.target.value)} label="Store Name" fullWidth={true} />
                <TextField variant="outlined" value={lat} onChange={e => setLat(e.target.value)} label="Store Latitude" fullWidth={true} />
                <TextField variant="outlined" value={long} onChange={e => setLong(e.target.value)} label="Store Longtitude" fullWidth={true} />

            </form>
        </Paper>
        <div style={{ marginTop: 20, marginBottom: 20 }} />
        <Heading>
            Select Device
        </Heading>
        <Paper className="selectDeviceForm">
            {devices !== null && devices.map(device => <ColumnImageText onClick={() => selectDevice(device)}
                image={sensorIcon} color={device._id === selectedDevice ? "lightgreen" : "lightcoral"} value={device.name}
            />
            )}
        </Paper>
        <div style={{ marginTop: 20, marginBottom: 20 }} />
        <Heading>
            Begin Store
        </Heading>
        <Paper className="submissionForm">
            <small>Please verify all entered information as Store once registered cannot be changed.</small>
            <Button variant="contained" color="secondary" onClick={addRetailClick}>Register Store!</Button>
        </Paper>

    </Card>
}