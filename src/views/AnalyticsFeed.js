import React, { useState } from 'react';
import './AnalyticsFeed.css';
import { Paper, Card } from '@material-ui/core';
import truckIcon from '../assets/images/truck.svg';
import farmIcon from '../assets/images/field.png';
import farmLabelIcon from '../assets/images/farm.png';
import tempPlant from '../assets/images/temperature-plant.png';
import pHIcon from '../assets/images/ph.png';
import humidityIcon from '../assets/images/humidity.png';
import { getFarms, getTrucks, getNotification } from '../api';
const FARM = 0;
const TRUCK = 1;

const CRITICAL = -1;
const REGULAR = 0;
const INFO = 1;

const DEGREE_SYMBOL = "°";

const TruckItem = props => <Paper className="TruckItem">
    <div className="imageHolder">
        <img className="image" src={truckIcon} />
    </div>
    <div className="contentItem">
        <div className="centerCol"><span className="routeTitle">{props.from} <span>{'-->'}</span> {props.to}</span></div>
        <div><span>Current Location: <strong>{props.current}</strong></span></div>
        <div className="twoCol"><span>Status: <span style={{ fontWeight: 'bold', color: 'green' }}>{props.onTime}</span></span> <span>Temperature: {props.temperature}</span></div>
        <div className="twoCol"><span>Departed On: {props.departed}</span><span>Estimated Arrival: {props.arrival}</span></div>
        <a style={{ marginLeft: 'auto', marginRight: 10 }} href={"/home/logistics/" + props.id}>View Details</a>
    </div>
</Paper>

export const ColumnImageText = props => <Card onClick={props.onClick ? props.onClick : () => console.log("click")} className="CITMain">
    <div style={{ backgroundColor: props.color }} className="CITImage">
        <img src={props.image} />
    </div>
    <div className="CITDesc">
        <div>{props.label}</div>
        <div>{props.value}</div>
    </div>
</Card>;
export const TruckCriticalItem = props => <Paper className="TruckItem">
    <div className="imageHolder">
        <img className="image" src={truckIcon} />
    </div>
    <div style={{ justifyContent: 'center', padding: 30, backgroundColor: 'red', color: 'white' }} className="contentItem">
        {props.children}
    </div>
</Paper>

export const FarmInfoItem = props => <Paper  className="FarmItem">
    <div style={{ flexDirection: 'row', justifyContent: 'center', padding: 30, }} className="contentItem">
        <div>{props.children}</div>
        <div><a href={`${props.link}`}>{props.label}</a></div>
    </div>
    <div style={{ backgroundColor: 'yellowgreen' }} className="imageHolder">
        <img style={{ filter: 'invert(1)' }} className="image" src={farmIcon} />
    </div>
</Paper>
export const FarmCriticalItem = props => <Paper onClick={() => window.location.href=`/home/agriculture/${props.id}`} className="FarmItem">
    <div style={{ justifyContent: 'center', padding: 30, backgroundColor: 'red', color: 'white' }} className="contentItem">
        {props.children}
    </div>

    <div style={{ backgroundColor: 'yellowgreen' }} className="imageHolder">
        <img style={{ filter: 'invert(1)' }} className="image" src={farmIcon} />
    </div>
</Paper>

export const FarmItem = props => <Paper onClick={() => window.location.href = `/home/agriculture/${props.id}`} className="FarmItem">
    <div className="contentItem">
        <ColumnImageText
            color="yellowgreen"
            image={farmLabelIcon} label="Farm" value={props.id}
        />
        {props.temp ?
            <ColumnImageText
                color="lightcoral"
                image={tempPlant} label="Temperature" value={`${props.temp}${DEGREE_SYMBOL} C`}
            /> : ""}
        {props.humidity ? <ColumnImageText
            color="lightblue"
            image={humidityIcon} label="Humidity" value={`${props.humidity}%`}
        /> : ""}
        {props.pH ? <ColumnImageText
            color="orange"
            image={pHIcon} label="pH" value={`${props.pH}`}
        /> : ""}
    </div>

    <div style={{ backgroundColor: 'yellowgreen' }} className="imageHolder">
        <img style={{ filter: 'invert(1)' }} className="image" src={farmIcon} />
    </div>
</Paper>

export default props => {
    const [trucks, setTrucks] = useState(null);
    const [farms, setFarms] = useState(null);
    const [notifications, setNotifications] = useState(null);
    const generateCriticalJSX = () => {
        if (notifications.filter(n => n.type === CRITICAL).length === 0) return null;

        const notificationJSX = notifications.filter(n => n.type === CRITICAL).map(notification => {
            switch (notification.domain) {
                case FARM:
                    return <FarmCriticalItem id={notification.target}>{notification.message}</FarmCriticalItem>;
                    break;
                case TRUCK:
                    return <TruckCriticalItem>{notification.message}</TruckCriticalItem>;
                    break;
            }
        });
        return [<Paper style={{ backgroundColor: 'red', color: 'white' }} className="Heading">
            <h3>Critical</h3>
            <div style={{ borderColor: 'white' }}></div>
        </Paper>, ...notificationJSX];

    }

    const generateRecommendedJSX = () => {
        if (notifications.filter(n => n.type === INFO).length === 0) return null;

        const notificationJSX = notifications.filter(n => n.type === INFO).map(notification => {
            switch (notification.domain) {
                case FARM:
                    return <FarmInfoItem
                        label="View Farm"
                        link={"/home/agriculture/"+notification.target}
                    >{notification.message}
                    </FarmInfoItem>;
                    break;

            }
        });
        return [<Paper style={{ backgroundColor: 'red', color: 'white' }} className="Heading">
            <h3>Critical</h3>
            <div style={{ borderColor: 'white' }}></div>
        </Paper>, ...notificationJSX];
    }
    if (notifications === null) {
        getNotification()
            .then(res => {
                if (res.data.success) {
                    setNotifications(res.data.notifications);
                } else {
                    alert(res.data.message);
                }
            })
            .catch(e => alert(e));
    }
    if (trucks === null) {
        getTrucks()
            .then(res => {
                if (res.data.success) {
                    setTrucks(res.data.trucks);
                } else {
                    alert(res.data.message);
                }
            })
            .catch(e => alert(e));
    };
    if (farms === null) {
        getFarms()
            .then(farms => { setFarms(farms) });
    }
    return <Card className="AFMain">
        {notifications && generateCriticalJSX()}
        <Paper className="Heading">
            <h3>Happening Now</h3>
            <div></div>
        </Paper>
        {farms !== null && farms.map(farm => {
            let temp = -1, humidity = -1, pH = -1;
            let tempSensorsWithData = farm.tempSensors.filter(tP => tP.data.length !== 0);
            let humidSensorsWithData = farm.humidSensors.filter(hD => hD.data.length !== 0);
            let pHSensorsWithData = farm.pHSensors.filter(pH => pH.data.length !== 0);

            temp = tempSensorsWithData.length > 0 ? parseInt(tempSensorsWithData[0].data[0].value).toPrecision(2) : null;
            humidity = humidSensorsWithData.length > 0 ? parseInt(humidSensorsWithData[0].data[0].value).toPrecision(2) : null;
            pH = pHSensorsWithData.length > 0 ? parseInt(pHSensorsWithData[0].data[0].value).toPrecision(2) : null;

            return [<FarmItem
                id={farm.farm.name}
                temp={temp}
                humidity={humidity}
                pH={pH}
            />, <a style={{ marginLeft: 'auto', marginRight: 10 }} href={"/home/agriculture/" + farm.farm._id}>View Details</a>
            ]
        })}

        {trucks !== null && trucks.map(truck => <TruckItem
            from={truck.truck.from}
            to={truck.truck.to}
            current={"Data not submitted"}
            departed={truck.truck.departTime}
            arrival={truck.truck.arrivalTime}
            temperature={truck.tempSensors.length > 0 ? parseInt(truck.tempSensors[0].data[0].value) : 'Not available'}
            onTime="ON TIME"
            id={truck.truck._id}
        />)}

        {/* <Paper style={{ backgroundColor: 'mediumslateblue', color: 'white' }} className="Heading">
        <h3>Information</h3>
        <div style={{ borderColor: 'white' }}></div>
    </Paper>
    <FarmInfoItem label="View Recommendation" link="#">
        New crop recommendations available!
    </FarmInfoItem> */}
    </Card>
}