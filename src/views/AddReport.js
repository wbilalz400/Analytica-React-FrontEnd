import React, { useState } from 'react';
import './AddFarm.css';
import { TextField, Card, Paper, Button, Select, MenuItem, InputLabel, FormControl } from '@material-ui/core';
import { getDevices, addFarm, addReport } from '../api/index';
import sensorIcon from '../assets/images/sensor-icon.svg';
import { ColumnImageText } from './AnalyticsFeed';

const WEEKLY = 0, MONTHLY = 1, QUARTERLY = 2, YEARLY = 3;
export const Heading = props => <div className="Heading">
    <h3>{props.children}</h3>
    <div></div>
</div>;

const AddReportView = props => {

    const [name, setName] = useState(null);
    const [reportType, setReportType] = useState(WEEKLY);
    const [time, setTime] = useState('');

    const doAddReport = () => {
        let payload = {
            name,
            type: reportType,
            time
        };

        addReport(payload)
        .then(res => {
            if (res.data.success) {
                console.log(res.data);
            }
            else {
                alert(res.data.message);
            }
        })
        .catch (e => console.log(e));
    }

    return <Card className="AddFarmMain">
        <Heading>
            Add a New Report
    </Heading>
        <Paper className="addTripForm">
            <small>Reports helps you keep updated. Lets create one!</small>
            <form>
                <TextField variant="outlined" value={name} onChange={e => setName(e.target.value)} label="Name" fullWidth={true} />
                <FormControl>
                    <InputLabel id="timeSelect">Select Report Type</InputLabel>
                    <Select labelId="timeSelect" onChange={e => setReportType(e.target.value)} value={reportType}>
                        <MenuItem value={WEEKLY}>
                            Weekly
                    </MenuItem>
                        <MenuItem value={MONTHLY}>
                            Monthly
                    </MenuItem>
                        <MenuItem value={QUARTERLY} >Quarterly</MenuItem>
                        <MenuItem value={YEARLY}>Yearly</MenuItem>
                    </Select>
                </FormControl>
                <TextField variant="outlined" onChange={e => setTime(e.target.value)} value={time} label="Time" InputLabelProps={{ shrink: true }} defaultValue={(new Date).toISOString().substr(0, 16)} type="time" fullWidth={true} />

            </form>
        </Paper>
        <div style={{ marginTop: 20, marginBottom: 20 }} />
        <Heading>
            Create Report
        </Heading>
        <Paper className="submissionForm">
            <small>Lets create the report and begin adding items to the report!.</small>
            <Button variant="contained" onClick={doAddReport} color="secondary" >Create Report!</Button>
        </Paper>

    </Card >
}

export default AddReportView;