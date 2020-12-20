import React, { useState } from 'react';
import './AddFarm.css';
import { TextField, Card, Paper, Button } from '@material-ui/core';
import { getDevices, addSmart } from '../api/index';
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

    const addFarmClick = () => {
        let payload = {
            name: name,
            device: selectedDevice,
            location: {
                lat,
                long,
            }
        };
        addSmart(payload)
            .then(res => {
                if (res.data.success) window.location.href = "/home/smart";
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
    const [region, setRegion] = useState(null);


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
            Register your Home & Office!
    </Heading>
        <Paper className="addTripForm">
            <small>Registering your Home & Office with analytics is easy. Just add a few details to get started!</small>
            <form>
                <TextField variant="outlined" value={name} onChange={e => setName(e.target.value)} label="Home or Office Name" fullWidth={true} />
                <TextField variant="outlined" value={lat} onChange={e => setLat(e.target.value)} label="Home or Office Latitude" fullWidth={true} />
                <TextField variant="outlined" value={long} onChange={e => setLong(e.target.value)} label="Home or Office Longtitude" fullWidth={true} />
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
            Begin Home or Office
        </Heading>
        <Paper className="submissionForm">
            <small>Please verify all entered information as Home or Office once registered cannot be changed.</small>
            <Button variant="contained" color="secondary" onClick={addFarmClick}>Register Home or Office!</Button>
        </Paper>

    </Card>
}