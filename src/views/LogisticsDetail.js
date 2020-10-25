import React from 'react';
import './LogisticsDetail.css';
import { Paper, Card } from '@material-ui/core';
import truckIcon from '../assets/images/truck.svg';
import truckEngineIcon from '../assets/images/engine-temp.png';
import GoogleMapReact from 'google-map-react';
const AnyReactComponent = ({ text }) => <div>{text}</div>;


const DEGREE_SYMBOL = "°";
export default props => {
    return <div className="LDMain">
        <div className="Heading">
            <h3>Logistics Report</h3>
            <div></div>
        </div>
        <Paper className="TruckItem">
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
        </Paper>
        <div className="Heading">
            <h3>Packages Condition</h3>
            <div></div>
        </div>
        <Paper className="conditionCards">
            <Card className="conditionCard">
                <h3><span>A2ZH</span></h3>
                <h5>Temperature</h5>
                <div style={{ borderColor: 'yellow', color: 'yellow' }} className="temperatureCard">
                    25° C
                </div>

            </Card>
            <Card className="conditionCard">
                <h3><span>A2ZD</span></h3>
                <h5>Temperature</h5>
                <div style={{ borderColor: 'green', color: 'green' }} className="temperatureCard">
                    18° C
                </div>

            </Card>
            <Card className="conditionCard">
                <h3><span>A2ZF</span></h3>
                <h5>Temperature</h5>
                <div style={{ borderColor: 'red', color: 'red' }} className="temperatureCard">
                    35° C
                </div>

            </Card>
            <Card className="conditionCard">
                <h3><span>A2ZG</span></h3>
                <h5>Temperature</h5>
                <div style={{ borderColor: 'blue', color: 'blue' }} className="temperatureCard">
                    12° C
                </div>

            </Card>

            <Card className="conditionCard">
                <h3><span>A2ZH</span></h3>
                <h5>Humidity</h5>
                <div style={{ borderColor: 'yellow', color: 'yellow' }} className="temperatureCard">
                    25%
                </div>

            </Card>
            <Card className="conditionCard">
                <h3><span>A2ZD</span></h3>
                <h5>Humidity</h5>
                <div style={{ borderColor: 'green', color: 'green' }} className="temperatureCard">
                    5%
                </div>

            </Card>
            <Card className="conditionCard">
                <h3><span>A2ZF</span></h3>
                <h5>Humidity</h5>
                <div style={{ borderColor: 'red', color: 'red' }} className="temperatureCard">
                    60%
                </div>

            </Card>
            <Card className="conditionCard">
                <h3><span>A2ZG</span></h3>
                <h5>Humidity</h5>
                <div style={{ borderColor: 'blue', color: 'blue' }} className="temperatureCard">
                    0%
                </div>
            </Card>
        </Paper>
        <div className="Heading">
            <h3>Truck Location</h3>
            <div></div>
        </div>
        <Paper className="mapContainer">
            <div style={{height: '100%', width: '100%', }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyD0FFwKL9zAZIpjkM9zf7CKQeNoFUIE6Ss' }}
                    defaultCenter={{ lat: 59.95, lng: 30.33 }}
                    defaultZoom={11}
                >
                    <AnyReactComponent
                        lat={59.955413}
                        lng={30.337844}
                        text="My Marker"
                    />
                </GoogleMapReact>
            </div>
        </Paper>
        <div className="Heading">
            <h3>Truck Condition</h3>
            <div></div>
        </div>
        <Paper className="conditionCards">
            <Card className="truckCard">
                <div className="TCImage">
                    <img src={truckEngineIcon}></img>
                </div>
                <div className="TCDesc">
                    <span style={{ fontWeight: 'lighter' }}>Engine Temperature</span>
                    <span style={{ color: 'lightgreen', fontWeight: 'bold' }}>55{DEGREE_SYMBOL} C</span>
                </div>
            </Card>
        </Paper>
    </div>;
}