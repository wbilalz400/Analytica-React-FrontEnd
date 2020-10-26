import React from 'react';
import './AnalyticsFeed.css';
import { Paper, Card } from '@material-ui/core';
import truckIcon from '../assets/images/truck.svg';
import farmIcon from '../assets/images/field.png';
import farmLabelIcon from '../assets/images/farm.png';
import tempPlant from '../assets/images/temperature-plant.png';
import pHIcon from '../assets/images/ph.png';
import humidityIcon from '../assets/images/humidity.png';

const DEGREE_SYMBOL = "°";

export const TruckItem = props => <Paper className="TruckItem">
    <div className="imageHolder">
        <img className="image" src={truckIcon} />
    </div>
    <div className="contentItem">
        <div className="centerCol"><span className="routeTitle">Islamabad <span>{'-->'}</span> Karachi</span></div>
        <div><span>Current Location: <strong>Multan</strong></span></div>
        <div className="twoCol"><span>Status: <span style={{ fontWeight: 'bold', color: 'green' }}>ON TIME</span></span> <span>Temperature: 27C</span></div>
        <div className="twoCol"><span>Departed On: 02:00</span><span>Estimated Arrival: 18:00</span></div>
        <a style={{ marginLeft: 'auto', marginRight: 10 }} href="/home/logistics/detail">View Details</a>
    </div>
</Paper>;

export const ColumnImageText = props => <Card className="CITMain">
    <div style={{ backgroundColor: props.color }} className="CITImage">
        <img src={props.image} />
    </div>
    <div className="CITDesc">
        <div>{props.label}</div>
        <div>{props.value}</div>
    </div>
</Card>
export const TruckCriticalItem = props => <Paper className="TruckItem">
    <div className="imageHolder">
        <img className="image" src={truckIcon} />
    </div>
    <div style={{ justifyContent: 'center', padding: 30, backgroundColor: 'red', color: 'white' }} className="contentItem">
        {props.children}
    </div>
</Paper>

export const FarmInfoItem = props => <Paper className="FarmItem">
    <div style={{ flexDirection:'row',justifyContent: 'center', padding: 30, }} className="contentItem">
        <div>{props.children}</div>
        <div><a href={`${props.link}`}>{props.label}</a></div>
    </div>
    <div style={{ backgroundColor: 'yellowgreen' }} className="imageHolder">
        <img style={{ filter: 'invert(1)' }} className="image" src={farmIcon} />
    </div>
</Paper>
export const FarmCriticalItem = props => <Paper className="FarmItem">
    <div style={{ justifyContent: 'center', padding: 30, backgroundColor: 'red', color: 'white' }} className="contentItem">
        The Farm with ID 13-CB requires your immediate attention!. Conditions suggest that there is a risk of disease, please take neccessary action!
</div>

    <div style={{ backgroundColor: 'yellowgreen' }} className="imageHolder">
        <img style={{ filter: 'invert(1)' }} className="image" src={farmIcon} />
    </div>
</Paper>

export const FarmItem = props => <Paper className="FarmItem">
    <div className="contentItem">
        <ColumnImageText
            color="yellowgreen"
            image={farmLabelIcon} label="Farm" value={props.id}
        />
        <ColumnImageText
            color="lightcoral"
            image={tempPlant} label="Temperature" value={`${props.temp}${DEGREE_SYMBOL} C`}
        />
        <ColumnImageText
            color="lightblue"
            image={humidityIcon} label="Humidity" value={`${props.humidity}%`}
        />
        <ColumnImageText
            color="orange"
            image={pHIcon} label="pH" value={`${props.pH}`}
        />
    </div>

    <div style={{ backgroundColor: 'yellowgreen' }} className="imageHolder">
        <img style={{ filter: 'invert(1)' }} className="image" src={farmIcon} />
    </div>
</Paper>

export default props => <Card className="AFMain">
    <Paper style={{ backgroundColor: 'red', color: 'white' }} className="Heading">
        <h3>Critical</h3>
        <div style={{ borderColor: 'white' }}></div>
    </Paper>
    <FarmCriticalItem />
    <TruckCriticalItem>
        The truck with ID "ACZ-197" reports that one of its tire pressure exceeds the safe limit. It is neccessary to stop the truck immediately and take corrective action
    </TruckCriticalItem>
    <Paper className="Heading">
        <h3>Happening Now</h3>
        <div></div>
    </Paper>
    <TruckItem />
    <FarmItem

    />
    <TruckItem />
    <Paper style={{ backgroundColor: 'mediumslateblue', color: 'white' }} className="Heading">
        <h3>Information</h3>
        <div style={{ borderColor: 'white' }}></div>
    </Paper>
    <FarmInfoItem label="View Recommendation" link="#">
        New crop recommendations available!
    </FarmInfoItem>
</Card>
