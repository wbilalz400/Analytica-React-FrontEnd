import React, { useState } from 'react';
import './DeviceView.css';
import { getSensors } from '../api';


export default props => {
    const [device, setDevice] = useState(0);
    const [sensors, setSensors] = useState([]);

    if (device === 0) {
        getSensors(props.match.params.device)
            .then(res => {
                if (res.data.success) {
                    setSensors(res.data.sensors);
                    setDevice(res.data.device);
                }
            })
    }
    return <div className="DVMain">
        <div className='header'>
            <h3>{device.id}</h3>
            <h1>{device.name}</h1>
            <h3>{device.type}</h3>
        </div>
        <h1 style={{textAlign:'center'}}>Sensors</h1>
        <div className='sensorsContainer'>
            {sensors.map(sensor => {
                return <div className='sensorView'>
                    <h3>{sensor.name}</h3>
                    <h5>{sensor.id}</h5>
                    <small>{sensor.type}</small>
                    {sensor.lastUpdate?<small>Value: {sensor.lastUpdate.value}</small>:''}
                </div>
            })}
        </div>
    </div>
}