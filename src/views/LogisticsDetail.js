import React, { useState } from 'react';
import './LogisticsDetail.css';
import { Paper, Card } from '@material-ui/core';
import truckIcon from '../assets/images/truck.svg';
import truckEngineIcon from '../assets/images/engine-temp.png';
import truckLocationMarker from '../assets/images/truck-location-marker.png';
import GoogleMapReact from 'google-map-react';
import tirePressureIcon from '../assets/images/tire-pressure-icon.png';
import oilGaugeIcon from '../assets/images/oil-guage-icon.png';
import temperatureIcon from '../assets/images/temperature-icon.png';
import humidityIcon from '../assets/images/humidity.png';

import { getTruck } from '../api';
import { LineChart } from 'react-chartkick';
import { ColumnImageText } from './AnalyticsFeed';
import Skeleton from 'react-loading-skeleton';

const TruckItem = props => <Paper className="TruckItem">
    <div className="imageHolder">
        <img className="image" src={truckIcon} />
    </div>
    <div className="contentItem">
        <div className="centerCol"><span className="routeTitle">{props.from} <span>{'-->'}</span> {props.to}</span></div>
        <div><span>Current Location: <strong>{props.current}</strong></span></div>
        <div className="twoCol"><span>Status: <span style={{ fontWeight: 'bold', color: 'green' }}>{props.onTime}</span></span> <span>Temperature: {props.temperature}</span></div>
        <div className="twoCol"><span>Departed On: {props.departed}</span><span>Estimated Arrival: {props.arrival}</span></div>
    </div>
</Paper>
const TruckLocationMarker = ({ text }) => <img src={truckLocationMarker} style={{ width: 50, height: 80, objectFit: "contain" }} />;

const DEGREE_SYMBOL = "°";
export default props => {
    if (!props.match.params.id) window.location.href = "/home/logistics";

    const [truck, setTruck] = useState(undefined);
    const [loading, setLoading] = useState(true);
    if (truck === undefined) {
        getTruck(props.match.params.id)
            .then(res => {
                if (res.data.success) {
                    setTruck(res.data);
                    setTimeout(() => setLoading(false), 3000);
                } else {
                    alert(res.data.message);
                }
            })
            .catch(e => alert(e));
    }
    if (truck === undefined) return <div>Loading</div>;
    return <div className="LDMain">
        <div className="Heading">
            <h3>Logistics Report</h3>
            <div></div>
        </div>
        {loading ? <Skeleton height={20} width={800} style={{ marginLeft: 'auto' }} count={4} /> : <TruckItem
            from={truck.truck.from}
            to={truck.truck.to}
            current={"Data not submitted"}
            departed={truck.truck.departTime}
            arrival={truck.truck.arrivalTime}
            temperature={truck.tempSensors.length > 0 && truck.tempSensors[0].data.length !== 0 ? parseInt(truck.tempSensors[0].data[0].value) : 'Not available'}
            onTime="ON TIME"
            id={truck.truck._id}
        />}
        <div className="Heading">
            <h3>Packages Summary</h3>
            <div></div>
        </div>
        {loading ? <Skeleton height={80} width={800} style={{ marginLeft: 'auto' }} count={1} /> : <Paper className="conditionCards">
            <ColumnImageText label="Maximum Temperature" value={parseInt(Math.max(...(truck.tempSensors.map(tP => tP.max))))} image={temperatureIcon} color="orangered" />
            <ColumnImageText label="Minimum Temperature" value={parseInt(Math.min(...(truck.tempSensors.map(tP => tP.min))))} image={temperatureIcon} color="lightblue" />
            <ColumnImageText label="Average Temperature" value={parseInt(Math.max(...(truck.tempSensors.map(tP => tP.min))))} image={temperatureIcon} color="lightgreen" />
            <ColumnImageText label="Maximum Humidity" value={parseInt(Math.max(...(truck.humiditySensors.map(tP => tP.max))))} image={humidityIcon} color="orangered" />
            <ColumnImageText label="Minimum Humidity" value={parseInt(Math.min(...(truck.humiditySensors.map(tP => tP.min))))} image={humidityIcon} color="lightblue" />
            <ColumnImageText label="Average Humidity" value={parseInt(Math.max(...(truck.humiditySensors.map(tP => tP.min))))} image={humidityIcon} color="lightgreen" />

        </Paper>
        }
        <div className="Heading">
            <h3>Packages Condition</h3>
            <div></div>
        </div>
        {loading ? <Skeleton height={35} width={800} style={{ marginLeft: 'auto' }} count={8} /> :
            <Paper className="conditionCards">
                {truck.tempSensors.length > 0 && truck.tempSensors.map(temp => {
                    let tempValue = temp.data.length > 0 ? temp.data[0].value : undefined;
                    if (tempValue === undefined) return null;
                    let tempColor = tempValue <= 25 ? temp <= 18 ? temp <= 10 ? "blue" : "lightgreen" : "green" : "red";
                    let datum = {};
                    temp.data.forEach(data => {
                        let date = new Date(data.time);
                        datum[`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`] = parseInt(data.value);
                    });
                    return <Card onClick={() => { window.location.href = "/home/device/" + truck.truck.device + "/sensor/" + temp.sensor._id }} className="conditionCard">
                        <h3><span>{temp.sensor.id.split("_")[1]}</span></h3>
                        <div className="conditionRow">
                            <div className="conditionItem">
                                <h5>{/shock/.test(temp.sensor.id.toLowerCase()) ? "Shocks" : "Temperature"}</h5>
                                <div style={{ borderColor: tempColor, color: tempColor, fontSize: 23 }} className="temperatureCard">
                                    {parseInt(tempValue)}{/shock/.test(temp.sensor.id.toLowerCase()) ? "N / m" : "° C"}
                                </div>
                            </div>
                            <div className="conditionItem">
                                <h5>Highest</h5>
                                <div style={{ borderColor: tempColor, color: tempColor, fontSize: 23 }} className="temperatureCard">
                                    {parseInt(temp.max)}{/shock/.test(temp.sensor.id.toLowerCase()) ? "N / m" : "° C"}
                                </div>
                            </div>
                            <div className="conditionItem">
                                <h5>Lowest</h5>
                                <div style={{ borderColor: tempColor, color: tempColor, fontSize: 23 }} className="temperatureCard">
                                    {parseInt(temp.min)}{/shock/.test(temp.sensor.id.toLowerCase()) ? "N / m" : "° C"}
                                </div>
                            </div>
                            <div className="conditionItem">
                                <h5>On Average</h5>
                                <div style={{ borderColor: tempColor, color: tempColor, fontSize: 23 }} className="temperatureCard">
                                    {parseInt(temp.average)}{/shock/.test(temp.sensor.id.toLowerCase()) ? "N / m" : "° C"}
                                </div>
                            </div>
                            <div className="conditionMap">
                                <div>History</div>
                                <LineChart
                                    data={datum}
                                    width="100%"
                                    height="100%"
                                />
                            </div>
                        </div>

                    </Card>
                })}
                {truck.humiditySensors.length > 0 && truck.humiditySensors.map(temp => {
                    let tempValue = temp.data.length > 0 ? temp.data[0].value : undefined;
                    if (tempValue === undefined) return null;
                    let tempColor = tempValue <= 35 ? temp <= 25 ? temp <= 15 ? "blue" : "lightgreen" : "green" : "red";
                    let datum = {};
                    temp.data.forEach(data => {
                        let date = new Date(data.time);
                        datum[`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`] = parseInt(data.value);
                    });
                    return <Card onClick={() => { window.location.href = "/home/device/" + truck.truck.device + "/sensor/" + temp.sensor._id }} className="conditionCard">
                        <h3><span>{temp.sensor.id.split("_")[1]}</span></h3>
                        <div className="conditionRow">
                            <div className="conditionItem">
                                <h5>Humidity</h5>
                                <div style={{ borderColor: tempColor, color: tempColor, fontSize: 23 }} className="temperatureCard">
                                    {parseInt(tempValue)}%
                    </div>
                            </div>
                            <div className="conditionItem">
                                <h5>Highest</h5>
                                <div style={{ borderColor: tempColor, color: tempColor, fontSize: 23 }} className="temperatureCard">
                                    {parseInt(temp.max)}%
                    </div>
                            </div>
                            <div className="conditionItem">
                                <h5>Lowest</h5>
                                <div style={{ borderColor: tempColor, color: tempColor, fontSize: 23 }} className="temperatureCard">
                                    {parseInt(temp.min)}%
                    </div>
                            </div>
                            <div className="conditionItem">
                                <h5>On Average</h5>
                                <div style={{ borderColor: tempColor, color: tempColor, fontSize: 23 }} className="temperatureCard">
                                    {parseInt(temp.average)}%
                    </div>
                            </div>
                            <div className="conditionMap">
                                <div>History</div>
                                <LineChart
                                    data={datum}
                                    width="100%"
                                    height="100%"
                                />
                            </div>
                        </div>

                    </Card>
                })}
            </Paper>}
        {truck?.recommendRoute &&
            <div className="Heading">
                <h3>{truck.recommendRoute}</h3>
                <div></div>
            </div>
        }
        <div className="Heading">
            <h3>Truck Location</h3>
            <div></div>
        </div>
        {loading ? <Skeleton height={80} width={800} style={{ marginLeft: 'auto' }} count={1} /> :
            <Paper className="mapContainer">
                <div style={{ height: '100%', width: '100%', }}>
                    {(truck.locationSensors.length > 0 && truck.locationSensors[0].data.length > 0) ?
                        <GoogleMapReact
                            bootstrapURLKeys={{ key: 'AIzaSyD0FFwKL9zAZIpjkM9zf7CKQeNoFUIE6Ss' }}
                            defaultCenter={{ lat: parseFloat(truck.locationSensors[0].data[0].value.split(",")[0]), lng: parseFloat(truck.locationSensors[0].data[0].value.split(",")[1]) }}
                            defaultZoom={11}
                        >
                            <TruckLocationMarker
                                lat={parseFloat(truck.locationSensors[0].data[0].value.split(",")[0])}
                                lng={parseFloat(truck.locationSensors[0].data[0].value.split(",")[1])}
                                text="My Marker"
                            />
                        </GoogleMapReact> : "Location Data Not Reported"}
                </div>
            </Paper>}
        <div className="Heading">
            <h3>Truck Condition</h3>
            <div></div>
        </div>
        {loading ? <Skeleton height={20} width={800} style={{ marginLeft: 'auto' }} count={4} /> : <Paper className="conditionCards">
            {truck.engineTempSensors.length > 0 && truck.engineTempSensors[0].data.length > 0 &&

                <Card className="truckCard">
                    <div className="TCImage">
                        <img src={truckEngineIcon}></img>
                    </div>
                    <div className="TCDesc">
                        <span style={{ fontWeight: 'lighter' }}>Engine Temperature</span>
                        <span style={{ color: 'lightgreen', fontWeight: 'bold' }}>{parseInt(truck.engineTempSensors[0].data[0].value)}{DEGREE_SYMBOL} C</span>
                    </div>
                </Card>
            }
            {truck.oilTempSensors.length > 0 && truck.oilTempSensors[0].data.length > 0 &&
                <Card className="truckCard">
                    <div style={{ backgroundColor: 'orange' }} className="TCImage">
                        <img src={oilGaugeIcon}></img>
                    </div>
                    <div className="TCDesc">
                        <span style={{ fontWeight: 'lighter' }}>Oil Temperature</span>
                        <span style={{ color: 'lightgreen', fontWeight: 'bold' }}>{parseInt(truck.oilTempSensors[0].data[0].value)}{DEGREE_SYMBOL} C</span>
                    </div>
                </Card>}
            {truck.tirePressureSensors.length > 0 && truck.tirePressureSensors[0].data.length > 0 &&
                <Card className="truckCard">
                    <div style={{ backgroundColor: 'lightgray' }} className="TCImage">
                        <img src={tirePressureIcon}></img>
                    </div>
                    <div className="TCDesc">
                        <span style={{ fontWeight: 'lighter' }}>Tire Pressure</span>
                        <span style={{ color: 'lightgreen', fontWeight: 'bold' }}>{parseInt(truck.tirePressureSensors[0].data[0].value)} PSI</span>
                    </div>
                </Card>}
            {truck.ambientTempSensors.length > 0 && truck.ambientTempSensors[0].data.length > 0 &&
                <Card className="truckCard">
                    <div style={{ backgroundColor: 'yellow' }} className="TCImage">
                        <img src={temperatureIcon}></img>
                    </div>
                    <div className="TCDesc">
                        <span style={{ fontWeight: 'lighter' }}>Ambient Temperature</span>
                        <span style={{ color: 'lightgreen', fontWeight: 'bold' }}>{truck.ambientTempSensors[0].data[0].value}{DEGREE_SYMBOL} C</span>
                    </div>
                </Card>}
        </Paper>}
    </div>;
}