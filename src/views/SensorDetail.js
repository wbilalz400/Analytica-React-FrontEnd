import React, {useState} from 'react';
import './SensorDetail.css';
import { Paper, Card } from '@material-ui/core';
import { LineChart } from 'react-chartkick';
import 'chart.js';
import sensorIcon from '../assets/images/sensor-icon.svg';
import currentValueIcon from '../assets/images/current-value-icon.png';
import averageIcon from '../assets/images/average-icon.png';
import { getDaysData } from '../api';
import maximumValueIcon from '../assets/images/maximum-icon.png';
const data = {};
const date = new Date();
for (let i = 0; i < 20; i++) {
    data[`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`] = Math.random() * 10;
    date.setDate(date.getDay() + i + 1);
}
window.data = data;
export default props => {
    const [detail, setDetail] = useState(undefined);
    let mean = 0;
    let max = undefined;
    let datum = {};

    if (detail === undefined) {
        getDaysData(props.match.params.device,props.match.params.sensor,365)
        .then (res => {
            if (res.data.success) {
                setDetail(res.data);
            } else {
                alert(res.data.message);
            }
        })
        .catch(e => alert(e));
    } else {
        detail.data.forEach(data => {
            mean += parseFloat(data.value);
            if (max === undefined || max < parseFloat(data.value)) {
                max = parseFloat(data.value);
            }
            let date = new Date(data.time);
            datum[`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`] = parseFloat(data.value);
        });
    }

    if (detail === undefined) return <div>Loading</div>
    return <Card className="SDMain">
        <Paper className="sensorInfo">
            <div className="bottomRow">
                <div className="title">Sensor</div>
            </div>
            <div className="topRow">
                <div className="imageHolder">
                    <img src={sensorIcon} />
                </div>
                <div className="desc">
                    <span>{detail.sensor.id}</span>
                </div>
            </div>
            <div className="bottomRow">
            {detail.data.length > 0?
                [<div className="lbl">Last Updated On</div>,
                <div className="val">{(new Date(detail.data[0].time)).toDateString()}</div>]
                :<div className="val">No Data</div>}
            </div>
        </Paper>
        <Paper className="Heading">
            <h3>Value Summary</h3>
            <div></div>
        </Paper>
        <Paper className="sensorContainer">
            <Card className="doubleRow">
                <div style={{ backgroundColor: 'lightgreen' }} className="imageHolder">
                    <img src={currentValueIcon} />
                </div>
                <div className="rowValue">
                    <div>Current Value</div>
                    {detail.data.length > 0?
                    <div>{parseFloat(detail.data[0].value).toPrecision(2)}</div>:<div>No data</div>}
                </div>
            </Card>
            <Card className="doubleRow">
                <div style={{ backgroundColor: 'lightsalmon' }} className="imageHolder">
                    <img src={averageIcon} />
                </div>
                <div className="rowValue">
                    <div>Average Value</div>
                    <div>{detail.data.length > 0? mean:"No Data"}</div>
                </div>
            </Card>
            <Card className="doubleRow">
                <div style={{ backgroundColor: 'lightblue' }} className="imageHolder">
                    <img src={maximumValueIcon} />
                </div>
                <div className="rowValue">
                    <div>Max Value</div>
                    <div>{detail.data.length > 0? max:"No Data"}</div>
                </div>
            </Card>
        </Paper>
        <Paper className="Heading">
            <h3>Sensor History</h3>
            <div></div>
        </Paper>
        <Card className="chartHolder">
            <LineChart data={datum} width="100%" height='100%' />
        </Card>

    </Card>
}