import React from 'react';
import './SensorDetail.css';
import { Paper, Card } from '@material-ui/core';
import { LineChart } from 'react-chartkick';
import 'chart.js';
import sensorIcon from '../assets/images/sensor-icon.svg';
import currentValueIcon from '../assets/images/current-value-icon.png';
import averageIcon from '../assets/images/average-icon.png';
import maximumValueIcon from '../assets/images/maximum-icon.png';
const data = {};
const date = new Date();
for (let i = 0 ; i < 20; i++) {
    data[`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`] = Math.random()*10;
    date.setDate(date.getDay() + i + 1);
}
window.data = data;
export default props => <Card className="SDMain">
    <Paper className="sensorInfo">
        <div className="bottomRow">
            <div className="title">Sensor</div>
        </div>
        <div className="topRow">
            <div className="imageHolder">
                <img src={sensorIcon} />
            </div>
            <div className="desc">
                <span>ARWX-7869</span>
            </div>
        </div>
        <div className="bottomRow">
            <div className="lbl">Last Updated On</div>
            <div className="val">12/10/2020 12:00 PM</div>
        </div>
    </Paper>
    <Paper className="Heading">
        <h3>Value Summary</h3>
        <div></div>
    </Paper>
    <Paper className="sensorContainer">
        <Card className="doubleRow">
            <div style={{backgroundColor:'lightgreen'}} className="imageHolder">
                <img src={currentValueIcon}/>
            </div>
            <div className="rowValue">
                <div>Current Value</div>
                <div>12.04</div>
            </div>
        </Card>
        <Card className="doubleRow">
            <div style={{backgroundColor:'lightsalmon'}} className="imageHolder">
                <img src={averageIcon}/>
            </div>
            <div className="rowValue">
                <div>Average Value</div>
                <div>12.04</div>
            </div>
        </Card>
        <Card className="doubleRow">
            <div  style={{backgroundColor:'lightblue'}}  className="imageHolder">
                <img src={maximumValueIcon}/>
            </div>
            <div className="rowValue">
                <div>Max Value</div>
                <div>12.04</div>
            </div>
        </Card>
    </Paper>
    <Paper className="Heading">
        <h3>Sensor History</h3>
        <div></div>
    </Paper>
    <Card className="chartHolder">
        <LineChart data={data}  width="100%" height='100%'/>
    </Card>

</Card> 
