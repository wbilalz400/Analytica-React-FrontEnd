import React, { useEffect, useState } from 'react';
import './AddTruck.css';
import { TextField, Card, Paper, Button, FormControl, Select, InputLabel, MenuItem } from '@material-ui/core';
import { getDevices, addTruck, addRoute, getRoutes } from '../api/index';
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
    const addRouteClick = () => {
        addRoute({
            from: fromRoute,
            to: toRoute,
            name: nameRoute,
        })
            .then((res) => {
                if (res.data.success) {
                    setModal(false);
                    getRoutes()
                        .then(res => {
                            if (res.data.success) {
                                setRoutes(res.data.routes);
                            }
                        });
                }
            })
    }

    useEffect(() => {
        if (routes === null) {

            getRoutes()
                .then(res => {
                    if (res.data.success) {
                        setRoutes(res.data.routes);
                    }
                });
        }
    })
    const addTruckClick = () => {
        let payload = {
            name, from, route, to, departTime, arrivalTime, device: selectedDevice, temperatureThreshold, humidityThreshold
        };
        addTruck(payload)
            .then(res => {
                if (res.data.success) {
                    window.location.href = "/home/logistics";
                } else {
                    alert(res.data.message);
                }
            })
            .catch(e => alert(e));
    }

    const [fromRoute, setFromRoute] = useState(null);
    const [toRoute, setToRoute] = useState(null);
    const [nameRoute, setNameRoute] = useState(null);
    const [devices, setDevices] = useState(null);
    const [selectedDevice, setSelection] = useState(null);
    const [name, setName] = useState(null);
    const [from, setFrom] = useState(null);
    const [to, setTo] = useState(null);
    const [departTime, setDepartTime] = useState(null);
    const [arrivalTime, setArrivalTime] = useState(null);
    const [temperatureThreshold, setTemperatureThreshold] = useState(null);
    const [humidityThreshold, setHumiditythreshold] = useState(null);
    const [modal, setModal] = useState(false);
    const [routes, setRoutes] = useState(null);
    const [route, setRoute] = useState(null);
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
                <TextField variant="outlined" onChange={e => setName(e.target.value)} value={name} label="Trip Name" fullWidth={true} />
                <TextField variant="outlined" onChange={e => setFrom(e.target.value)} value={from} label="Departure City" fullWidth={true} />
                <TextField variant="outlined" onChange={e => setTo(e.target.value)} value={to} label="Arrival City" fullWidth={true} />
                <FormControl>
                    <InputLabel id="deviceLabel">Select Route</InputLabel>
                    <Select placeholder="Select Route" onChange={e => { setRoute(e.target.value) }} labelId="deviceLabel">
                        {routes?.map(router => {
                            return <MenuItem value={router._id}>{`${router.name} (${router.from} - ${router.to})`}</MenuItem>
                        })}
                    </Select>
                </FormControl>
                <Button variant="outlined" onClick={() => setModal(true)}>Add Route</Button>
                <TextField variant="outlined" value={temperatureThreshold} onChange={e => setTemperatureThreshold(e.target.value)} label="Temperature Threshold" type="number" />
                <TextField variant="outlined" value={humidityThreshold} onChange={e => setHumiditythreshold(e.target.value)} label="Humidity Threshold" type="number" />
                <TextField variant="outlined" onChange={e => setDepartTime(e.target.value)} value={departTime} label="Departure Time" defaultValue={(new Date).toISOString().substr(0, 16)} type="datetime-local" fullWidth={true} />
                <TextField variant="outlined" onChange={e => setArrivalTime(e.target.value)} value={arrivalTime} label="Arrival Time" defaultValue={(new Date).toISOString().substr(0, 16)} type="datetime-local" fullWidth={true} />


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
            Begin Trip
        </Heading>
        <Paper className="submissionForm">
            <small>Please verify all entered information as Trip once started cannot be changed.</small>
            <Button variant="contained" onClick={addTruckClick} color="secondary">Start Trip!</Button>
        </Paper>
        {modal && <div className="modalMain">
            <Paper className="modalContentMain">
                <div className="modalHeading">
                    <h1>Add New Route</h1>
                </div>

                <div className="reportModalContent">
                    <FormControl>
                        <TextField variant="outlined" value={fromRoute} onChange={e => setFromRoute(e.target.value)} label="From" fullWidth={true} />
                    </FormControl>
                    <FormControl>
                        <TextField variant="outlined" value={toRoute} onChange={e => setToRoute(e.target.value)} label="To" fullWidth={true} />
                    </FormControl>
                    <FormControl>
                        <TextField variant="outlined" value={nameRoute} onChange={e => setNameRoute(e.target.value)} label="Name" fullWidth={true} />
                    </FormControl>
                </div>

                <div className="reportModalFooter">
                    <Button variant="contained" onClick={() => setModal(false)} color="secondary">Close</Button>
                    <Button variant="contained" onClick={() => { addRouteClick() }} color="primary">Add Item</Button>
                </div>
            </Paper>
        </div>}
    </Card>
}