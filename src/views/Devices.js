import './Devices.css';
import React, { useState, useEffect } from 'react';
import { getDevices } from '../api';
import deviceIcon from '../images/device.png';
export default props => {
    const [devices, setDevices] = useState([]);
    if (devices.length === 0) {
        getDevices()
            .then(res => {
                if (res.data.success) {
                    setDevices(res.data.devices);
                }
            })
    }
    return (<div className='DevicesMain'>
        <h1>Devices</h1>
        <div className="devicesContainer">
            {devices.map(device => {
                return <div onClick={() => window.location.href=`/home/devices/${device.id}`} className='deviceItem'>
                    <img src={deviceIcon} className="deviceIcon"/>
                    <h3>{device.name}</h3>
                    <h5>{device.id}</h5>
                    <small>{device.type}</small>
                </div>
            })}
           
        </div>
    </div>);
}