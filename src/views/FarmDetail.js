import React, { useState } from 'react';
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
import { getFarm } from '../api';
const PREDICTED_VEG = 0;
const PREDICTED_FRUIT = 1;
const PREDICTED_CROP = 2;
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

let fruitsData = fruitsDataA.filter(f => Math.random() * 10 < 5);
let vegetablesData = vegetablesDataA.filter(v => Math.random() * 10 < 5);
let cropsData = cropsDataA.filter(v => Math.random() * 10 < 5);

let fruitsDataAB = fruitsData.filter((F, index) => index < 4);
let vegetablesDataAB = vegetablesData.filter((V, index) => index < 4);
let cropsDataAB = cropsData.filter((C, index) => index < 4);


const TruckLocationMarker = ({ text }) => <img src={truckLocationMarker} style={{ width: 50, height: 80, objectFit: "contain" }} />;
const DEGREE_SYMBOL = "°";
export default props => {

    if (!props.match.params.id) window.location.href = "/home/agriculture"
    const [tempSensors, setTempSensors] = useState(null);
    const [humidSensors, setHumidSensors] = useState(null);
    const [pHSensors, setPHSensors] = useState(null);
    const [farm, setFarm] = useState(null);
    const [fruitPrediction, setFruitPrediction] = useState(null);
    const [vegetablePrediction, setVegetablePrediction] = useState(null);
    const [cropPrediction, setCropPrediction] = useState(null);

    if (farm === null) {
        getFarm(props.match.params.id)
            .then(res => {
                if (res.data.success) {
                    setTempSensors(res.data.tempSensors.filter(tP => tP.data.length !== 0));
                    setHumidSensors(res.data.humidSensors.filter(hD => hD.data.length !== 0));
                    setPHSensors(res.data.pHSensors.filter(pH => pH.data.length !== 0));
                    setFarm(res.data.farm);
                    let fruitPredictionA = res.data.predictions.filter(P => P.predictionType === PREDICTED_FRUIT).map(P => fruitsDataA.find(D => P.prediction[0].toLowerCase().trim() === D.name.toLowerCase().trim()));
                    let vegetablePredictionA = res.data.predictions.filter(P => P.predictionType === PREDICTED_VEG).map(P => vegetablesDataA.find(D => P.prediction[0].toLowerCase().trim() === D.name.toLowerCase().trim()));
                    let cropPredictionA = res.data.predictions.filter(P => P.predictionType === PREDICTED_CROP).map(P => cropsDataA.find(D => P.prediction[0].toLowerCase().trim() === D.name.toLowerCase().trim()));
                    console.log(fruitPredictionA);

                    setFruitPrediction(fruitPredictionA.length !== 0 ? [ ...fruitsDataAB,...fruitPredictionA] : null);
                    setVegetablePrediction(vegetablePredictionA.length !== 0 ? [ ...vegetablesDataAB,...vegetablePredictionA] : null);
                    setCropPrediction(cropPredictionA.length !== 0 ? [ ...cropsDataAB,...cropPredictionA] : null);

                } else {
                    window.location.href = "/home/agriculture";
                }
            })
            .catch(e => {
                //window.location.href = "/home/agriculture";
                console.log(e);
            })
    }
    if (farm === null) return <div></div>
    return <div className="FDMain">
        <div className="Heading">
            <h3>Farm Report</h3>
            <div></div>
        </div>
        <FarmItem
            id={farm.name}
            temp={tempSensors.length > 0 ? parseInt(tempSensors[0].data[0].value).toPrecision(2) : null}
            humidity={humidSensors.length > 0 ? parseInt(humidSensors[0].data[0].value).toPrecision(2) : null}
            pH={pHSensors.length > 0 ? parseInt(pHSensors[0].data[0].value).toPrecision(2) : null}
        />

        <div className="Heading">
            <h3>Enviornment Conditions</h3>
            <div></div>
        </div>
        <Paper className="conditionCards">
            {tempSensors !== null && tempSensors.map(tP =>
                <ColumnImageText
                    image={temperatureIcon}
                    color="lightcoral"
                    label={"Temperature(" + tP.sensor.id.split('_')[1] + ")"}
                    value={`${parseInt(tP.data[0].value)}${DEGREE_SYMBOL} C`}
                />)}
            {pHSensors !== null && pHSensors.map(PH =>
                <ColumnImageText
                    image={pHIcon}
                    color="orangered"
                    label={`PH(${PH.sensor.id.split('_')[1]})`}
                    value={`${parseInt(PH.data[0].value)}`}
                />)}
            {humidSensors !== null && humidSensors.map(HD =>
                <ColumnImageText
                    image={humidityIcon}
                    color="lightblue"
                    label={`Humidity(${HD.sensor.id.split('_')[1]})`}
                    value={`${parseInt(HD.data[0].value)}`}
                />)}


        </Paper>
        <div className="Heading">
            <h3>Farm Region</h3>
            <div></div>
        </div>
        <Paper className="mapContainer">
            <div style={{ height: '100%', width: '100%', }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyD0FFwKL9zAZIpjkM9zf7CKQeNoFUIE6Ss' }}
                    defaultCenter={{ lat: parseFloat(farm.latitude), lng: parseFloat(farm.longtitude) }}
                    defaultZoom={11}
                >

                </GoogleMapReact>
            </div>
        </Paper>
        <div className="Heading">
            <h3>Farm Statistics</h3>
            <div></div>
        </div>
        <Paper className="conditionCards">
            {tempSensors !== null && tempSensors.map(tP => {
                let data = {};
                tP.data.forEach(datum => {
                    let time = new Date(datum.time);
                    data[`${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}`] = parseFloat(datum.value);
                });
                return <Card className="chartCard">
                    <span>Temperature ({tP.sensor.id.split("_")[1]})</span>
                    <div>
                        <LineChart data={data} width="100%" height='100%' />
                    </div>
                </Card>
            }
            )}
            {humidSensors !== null && humidSensors.map(tP => {
                let data = {};
                tP.data.forEach(datum => {
                    let time = new Date(datum.time);
                    data[`${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}`] = parseFloat(datum.value);
                });
                return <Card className="chartCard">
                    <span>Humidity ({tP.sensor.id.split("_")[1]})</span>
                    <div>
                        <LineChart data={data} width="100%" height='100%' />
                    </div>
                </Card>
            }
            )}

            {pHSensors !== null && pHSensors.map(tP => {
                let data = {};
                tP.data.forEach(datum => {
                    let time = new Date(datum.time);
                    data[`${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}`] = parseFloat(datum.value);
                });
                return <Card className="chartCard">
                    <span>PH ({tP.sensor.id.split("_")[1]})</span>
                    <div>
                        <LineChart data={data} width="100%" height='100%' />
                    </div>
                </Card>
            }
            )}

        </Paper>
        {fruitPrediction == null ? "" :
            [<div className="Heading">
                <h3>Recommended Fruits</h3>
                <div></div>
            </div>,
            <Paper className="cropCardsContainer">
                {fruitPrediction.map(card => <SwipeCard className="cardMain">
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
            </Paper>]}
        {vegetablePrediction != null ?
            [<div className="Heading">
                <h3>Recommended Vegetables</h3>
                <div></div>
            </div>,
            <Paper className="cropCardsContainer">
                {vegetablePrediction.map(card => <SwipeCard className="cardMain">
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
            </Paper>] : ""}
        {cropPrediction == null ? "" : [
            <div className="Heading">
                <h3>Recommended Crops</h3>
                <div></div>
            </div>,
            <Paper className="cropCardsContainer">
                {cropPrediction.map(card => <SwipeCard className="cardMain">
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
            </Paper>]}
    </div>;
}