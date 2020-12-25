import React, { useState, useEffect } from 'react';
import './ReportsDetail.css';
import { Paper, Card, Button, InputLabel, Select, MenuItem, FormControl, FormLabel, RadioGroup, Radio, FormControlLabel } from '@material-ui/core';
import { ColumnImageText, RetailItem, DEGREE_SYMBOL, ReportItem } from './AnalyticsFeed';
import {  getDevices, getReport, getSensors, updateReport } from '../api';
import Skeleton from 'react-loading-skeleton';
const HISTORY = 0, CURRENT = 1;
const WEEKLY = 0, MONTHLY = 1, QUARTERLY = 2, YEARLY = 3;
const stringResource = {
    [WEEKLY]: "Weekly",
    [MONTHLY]: "Monthly",
    [QUARTERLY]: "Quarterly",
    [YEARLY]: "Yearly"
}
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
    const [modal, setModal] = useState(false);
    const [report, setReport] = useState(false);



    let reportId = props.match.params.id;
    if (reportId === undefined || reportId === null) {
        window.location.href = '/home/reports';
    }
    const addReportItem = () => {
        let payload = {

            reportItems:
                [
                    ...report?.reportItems,
                    {
                        device,
                        sensor,
                        type,
                    }
                ]
        };

        updateReport(props.match.params.id, payload)
            .then(res => {
                if (res.data.success) {
                    fetchReport();
                    setModal(false);
                } else {
                    alert(res.data.message);
                }
            })
            .catch(e => console.log(e));


    }

    const fetchReport = () => {
        getReport(props.match.params.id)
            .then(res => {
                if (res.data.success) {
                    setReport(res.data.report);
                } else {
                    alert(res.data.message);
                }
            })
            .catch(e => alert(e));
    }
    useEffect(() => {
        if (!report) {

            setTimeout(fetchReport,3000);
        }

    }, [props.match.params.id])
    useEffect(() => {
        getDevices().then(res => {
            if (res.data.success) {
                setDevices(res.data.devices);
                setDevice(res.data.devices[0].id);
            }
        })
            .catch(e => alert(e));
    }, []);



    useEffect(() => {
        getSensors(device)
            .then(res => {
                if (res.data.success) {
                    setSensors(res.data.sensors);
                    setSensor(res.data.sensors[0].id);

                } else {
                    console.log(res.data.message);
                }
            })
            .catch(e => {
                alert(e);
            })
    }, [device])

    return <div className="RDMain">
        <div className="Heading">
            <h3>Report Description</h3>
            <div></div>
        </div>
        {report? <ReportItem
            name={report.name}
            type={stringResource[report.type]}
            occursAt={report.time}
            items={report.reportItems?.length}
        />:<Skeleton height={20} width={800} style={{marginLeft:'auto'}} count={4}/>}
        <div className="Heading">
            <h3>Report Summary</h3>
            <div></div>
        </div>
        <Paper className="conditionCards">
            <p>{report?`This reports occurs  ${stringResource[report?.type]}. This report has ${report?.reportItems?.length} items`:<Skeleton height={40} width={800}/>}</p>
        </Paper>
        <div className="Heading">
            <h3>Report Components</h3>
            <div></div>
        </div>
        <Paper className="conditionCards">
            {report?report?.reportItems?.map(reportItem => <Card style={{ margin: 5, }} className="itemContainer">

                <div className="itemRow">
                    <h3>Device Name</h3>
                    <h2>{reportItem.device}</h2>
                </div>

                <div className="itemRow">
                    <h3>Sensor Name</h3>
                    <h2>{reportItem.sensor}</h2>
                </div>

                <div className="itemRow">
                    <h3>Data Type</h3>
                    <h2>{reportItem.type}</h2>
                </div>

            </Card>
            ):<Skeleton width={900} height={30} count ={5}/>}

            <Button variant="contained" onClick={() => setModal(true)} color="primary">+ Add New Item</Button>

        </Paper>
        {modal && <div className="modalMain">
            <Paper className="modalContentMain">
                <div className="modalHeading">
                    <h1>Add New Item</h1>
                </div>

                <div className="reportModalContent">
                    <FormControl>
                        <InputLabel id="deviceLabel">Select Device</InputLabel>
                        <Select placeholder="Select Device" onChange={e => setDevice(e.target.value)} labelId="deviceLabel">
                            {devices?.map(device => {
                                return <MenuItem value={device.id}>{device.name}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                    <FormControl>
                        <InputLabel id="SensorLabel">Select Sensor</InputLabel>
                        <Select onChange={e => setSensor(e.target.value)} labelId="SensorLabel">
                            {sensors?.map(sensor => <MenuItem value={sensor.id}>{sensor.name}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <FormControl>
                        <FormLabel component="legend">Type</FormLabel>
                        <RadioGroup value={type} onChange={e => { console.log(e.target); setType(parseInt(e.target.value)) }} aria-label="type" name="type1">
                            <FormControlLabel value={CURRENT} control={<Radio />} label="Current" />
                            <FormControlLabel value={HISTORY} control={<Radio />} label="History" />
                        </RadioGroup>
                    </FormControl>


                </div>

                <div className="reportModalFooter">
                    <Button variant="contained" onClick={() => setModal(false)} color="secondary">Close</Button>
                    <Button variant="contained" onClick={addReportItem} color="primary">Add Item</Button>
                </div>
            </Paper>
        </div>}

    </div>;
}

export default ReportsDetailView;