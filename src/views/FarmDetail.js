import React from 'react';
import './FarmDetail.css';
import { Paper, Card } from '@material-ui/core';
import truckIcon from '../assets/images/truck.svg';
import truckEngineIcon from '../assets/images/engine-temp.png';
import truckLocationMarker from '../assets/images/truck-location-marker.png';
import GoogleMapReact from 'google-map-react';
import tirePressureIcon from '../assets/images/tire-pressure-icon.png';
import oilGaugeIcon from '../assets/images/oil-guage-icon.png';
import temperatureIcon from '../assets/images/temperature-icon.png';
import fruitsDataA from '../data.js';
import SwipeCard from 'react-tinder-card';
import vegetablesDataA from '../data2.js';
import cropsDataA from '../data3.js';
import { FarmItem, ColumnImageText } from './AnalyticsFeed';
import farmIcon from '../assets/images/field.png';
import farmLabelIcon from '../assets/images/farm.png';
import tempPlant from '../assets/images/temperature-plant.png';
import pHIcon from '../assets/images/ph.png';
import humidityIcon from '../assets/images/humidity.png';
import { LineChart } from 'react-chartkick';
const data = {};
const date = new Date();
for (let i = 0; i < 20; i++) {
    data[`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`] = Math.random() * 10;
    date.setDate(date.getDay() + i + 1);
}
const data2 = {};
for (let i = 0; i < 20; i++) {
    data2[`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`] = Math.random() * 10;
    date.setDate(date.getDay() + i + 1);
}

const data3 = {};
for (let i = 0; i < 20; i++) {
    data3[`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`] = Math.random() * 10;
    date.setDate(date.getDay() + i + 1);
}

let fruitsData = fruitsDataA.filter(f => Math.random()*10 < 5);
let vegetablesData = vegetablesDataA.filter(v => Math.random()*10 < 5);
let cropsData = cropsDataA.filter(v => Math.random()*10 < 5);

fruitsData = fruitsData.filter((F,index) => index < 5);
vegetablesData = vegetablesData.filter((V,index) => index < 5);
cropsData = cropsData.filter((C,index) => index < 5);


const TruckLocationMarker = ({ text }) => <img src={truckLocationMarker} style={{ width: 50, height: 80, objectFit: "contain" }} />;
const DEGREE_SYMBOL = "°";
export default props => {
    return <div className="FDMain">
        <div className="Heading">
            <h3>Farm Report</h3>
            <div></div>
        </div>
        <FarmItem id='FRM-1' temp='32' humidity='50' pH='4.5' />

        <div className="Heading">
            <h3>Enviornment Conditions</h3>
            <div></div>
        </div>
        <Paper className="conditionCards">
            <ColumnImageText color="lightcoral" image={tempPlant} label="Temperature" value={`32${DEGREE_SYMBOL} C`} />
            <ColumnImageText color="orangered" image={pHIcon} label="PH" value={`7.5`} />
            <ColumnImageText color="lightblue" image={humidityIcon} label="Humidity" value={`35%`} />
        </Paper>
        <div className="Heading">
            <h3>Farm Region</h3>
            <div></div>
        </div>
        <Paper className="mapContainer">
            <div style={{ height: '100%', width: '100%', }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyD0FFwKL9zAZIpjkM9zf7CKQeNoFUIE6Ss' }}
                    defaultCenter={{ lat: 30.1575, lng: 71.5249 }}
                    defaultZoom={11}
                >
                    <TruckLocationMarker
                        lat={30.1575}
                        lng={71.5249}
                        text="My Marker"
                    />
                </GoogleMapReact>
            </div>
        </Paper>
        <div className="Heading">
            <h3>Farm Statistics</h3>
            <div></div>
        </div>
        <Paper className="conditionCards">
            <Card className="chartCard">
                <span>Temperature</span>
                <div>
                    <LineChart data={data} width="100%" height='100%' />
                </div>
            </Card>
            <Card className="chartCard">
                <span>Humidity</span>
                <div>
                    <LineChart data={data2} width="100%" height='100%' />
                </div>
            </Card>
            <Card className="chartCard">
                <span>pH</span>
                <div>
                    <LineChart data={data3} width="100%" height='100%' />
                </div>
            </Card>
        </Paper>
        <div className="Heading">
            <h3>Recommended Fruits</h3>
            <div></div>
        </div>
        <Paper className="cropCardsContainer">
            {fruitsData.map(card => <SwipeCard className="cardMain">
                <div className="cropCard">
                    <img src={card.pics[0]}></img>
                    <div className="cropCardDesc">
                        <div className="name">{card.name}</div>
                        <div className="info"><span className="lbl">pH: </span>{card.pH1 + " "} - {card.pH2}</div>
                        <div className="info"><span className="lbl">Humidity:</span>{card.humidity1}% {" "} - {card.humidity2 + "%"}</div>
                        <div className="info"><span className="lbl">Temperature:</span>{card.temperature1 + `${DEGREE_SYMBOL} C`} {" "} - {card.temperature2 + `${DEGREE_SYMBOL} C`}</div>

                    </div>
                </div>
            </SwipeCard>)}
        </Paper>
        <div className="Heading">
            <h3>Recommended Vegetables</h3>
            <div></div>
        </div>
        <Paper className="cropCardsContainer">
            {vegetablesData.map(card => <SwipeCard className="cardMain">
                <div className="cropCard">
                    <img src={card.pics[0]}></img>
                    <div className="cropCardDesc">
                        <div className="name">{card.name}</div>
                        <div className="info"><span className="lbl">pH: </span>{card.pH1 + " "} - {card.pH2}</div>
                        <div className="info"><span className="lbl">Humidity:</span>{card.humidity1}% {" "} - {card.humidity2 + "%"}</div>
                        <div className="info"><span className="lbl">Temperature:</span>{card.temperature1 + `${DEGREE_SYMBOL} C`} {" "} - {card.temperature2 + `${DEGREE_SYMBOL} C`}</div>

                    </div>
                </div>
            </SwipeCard>)}
        </Paper>
        <div className="Heading">
            <h3>Recommended Crops</h3>
            <div></div>
        </div>
        <Paper className="cropCardsContainer">
            {cropsData.map(card => <SwipeCard className="cardMain">
                <div className="cropCard">
                    <img src={card.pics[0]}></img>
                    <div className="cropCardDesc">
                        <div className="name">{card.name}</div>
                        <div className="info"><span className="lbl">pH: </span>{card.pH1 + " "} - {card.pH2}</div>
                        <div className="info"><span className="lbl">Humidity:</span>{card.humidity1}% {" "} - {card.humidity2 + "%"}</div>
                        <div className="info"><span className="lbl">Temperature:</span>{card.temperature1 + `${DEGREE_SYMBOL} C`} {" "} - {card.temperature2 + `${DEGREE_SYMBOL} C`}</div>

                    </div>
                </div>
            </SwipeCard>)}
        </Paper>
    </div>;
}