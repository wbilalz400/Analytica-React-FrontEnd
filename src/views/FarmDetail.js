import React, { useState, useEffect } from 'react';
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
import { Container, Row, Col } from "react-bootstrap";
import Slider from "react-slick";
import lightIcon from '../assets/images/light.png';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './mycss.css'
import pests from '../pests';
import { getFarm } from '../api';
import Skeleton from 'react-loading-skeleton';
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

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1
    };

    if (!props.match.params.id) window.location.href = "/home/agriculture"
    const [tempSensors, setTempSensors] = useState(null);
    const [humidSensors, setHumidSensors] = useState(null);
    const [pHSensors, setPHSensors] = useState(null);
    const [farm, setFarm] = useState(null);
    const [fruitPrediction, setFruitPrediction] = useState(null);
    const [vegetablePrediction, setVegetablePrediction] = useState(null);
    const [cropPrediction, setCropPrediction] = useState(null);
    const [lightSensor, setLightSensor] = useState(null);
    const [myInterval, setMyInterval] = useState(null);
    const [pestPrediction, setPestPrediction] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchData = () => {
        getFarm(props.match.params.id)
            .then(res => {
                if (res.data.success) {
                    setTempSensors(res.data.tempSensors.filter(tP => tP.data.length !== 0));
                    setHumidSensors(res.data.humidSensors.filter(hD => hD.data.length !== 0));
                    setPHSensors(res.data.pHSensors.filter(pH => pH.data.length !== 0));
                    setFarm(res.data.farm);
                    setLightSensor(res.data.lightSensors);
                    let fruitPredictionA = res.data.predictions.filter(P => P.predictionType === PREDICTED_FRUIT);
                    let vegetablePredictionA = res.data.predictions.filter(P => P.predictionType === PREDICTED_VEG);
                    let cropPredictionA = res.data.predictions.filter(P => P.predictionType === PREDICTED_CROP);
                    let pestPredictionA = res.data.predictions.filter(P => P.predictionType === 3);

                    console.log(fruitPredictionA);

                    setFruitPrediction(fruitPredictionA.length !== 0 ? fruitPredictionA[0].prediction.map(P => fruitsDataA.find(FD => P.toLowerCase().trim() === FD.name.toLowerCase().trim())).reverse() : null);
                    setVegetablePrediction(vegetablePredictionA.length !== 0 ? vegetablePredictionA[0].prediction.map(P => vegetablesDataA.find(FD => P.toLowerCase().trim() === FD.name.toLowerCase().trim())).reverse() : null);
                    setCropPrediction(cropPredictionA.length !== 0 ? cropPredictionA[0].prediction.map(P => cropsDataA.find(FD => P.toLowerCase().trim() === FD.name.toLowerCase().trim())).reverse() : null);
                    setPestPrediction(pestPredictionA.length !== 0 ? pestPredictionA[0].prediction.map(P => { return pests.find(PP => PP.name.trim().toLowerCase() == P.trim().toLowerCase()) }) : []);
                    setTimeout(() => setLoading(false), 3000);
                } else {
                    window.location.href = "/home/agriculture";
                }
            })
            .catch(e => {
                //window.location.href = "/home/agriculture";
                console.log(e);
            })
    }
    useEffect(() => {
        if (myInterval === null) {
            setMyInterval(setInterval(fetchData, 3000));
        };
    }, [myInterval]);
    if (farm === null) return <div></div>
    return <div className="FDMain">
        <div className="Heading">
            <h3>Farm Report</h3>
            <div></div>
        </div>
        {!loading ? <FarmItem
            id={farm.name}
            temp={tempSensors.length > 0 ? parseInt(tempSensors[0].data[0].value).toPrecision(2) : null}
            humidity={humidSensors.length > 0 ? parseInt(humidSensors[0].data[0].value).toPrecision(2) : null}
            pH={pHSensors.length > 0 ? parseInt(pHSensors[0].data[0].value).toPrecision(2) : null}
        /> : <Skeleton height={20} width={800} style={{ marginLeft: 'auto' }} count={4} />}

        <div className="Heading">
            <h3>Enviornment Conditions</h3>
            <div></div>
        </div>
        {loading ? <Skeleton height={50} width={800} style={{ marginLeft: 'auto' }} count={6} /> : <Paper className="conditionCards">
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
            {lightSensor !== null && lightSensor.map(LS => {
                return <ColumnImageText
                    image={lightIcon}
                    color="lightblue"
                    label={`Light Sensor`}
                    value={`${parseInt(LS)}`}
                />
            })}


        </Paper>}
        <div className="Heading">
            <h3>Farm Region</h3>
            <div></div>
        </div>
        <Paper className="mapContainer">
            {loading ? <Skeleton height={80} width={800} style={{ marginLeft: 'auto' }} count={1} /> : <div style={{ height: '100%', width: '100%', }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyD0FFwKL9zAZIpjkM9zf7CKQeNoFUIE6Ss' }}
                    defaultCenter={{ lat: parseFloat(farm.latitude), lng: parseFloat(farm.longtitude) }}
                    defaultZoom={11}
                >

                </GoogleMapReact>
            </div>}
        </Paper>
        <div className="Heading">
            <h3>Farm Statistics</h3>
            <div></div>
        </div>
        {loading? <Skeleton height={20} width={800} style={{marginLeft:'auto'}} count={6}/>:<Paper className="conditionCards">
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

        </Paper>}
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
        <div className="Heading">
            <h3>Pest Forecasting</h3>
            <div></div>
            <br></br>
            <a href="/remedies">View Remedies</a>
        </div>,
            <h4 style={{ background: "white" }}>Swipe to view More</h4>
        <div id="hellog" style={{ background: "gray" }}>

            <Container>
                <div className="clearfix mt-5 mb-2">
                </div>
                {pestPrediction?
                    <Slider {...settings}>
                        {pestPrediction.map(function (pest) {
                            return (
                                <React.Fragment>
                                    <div className="card-wrapper">
                                        <div className="card">
                                            <div className="card-image">
                                                <img src={pest?.pic} />
                                            </div>

                                            <div className="details">
                                                <h2>{pest?.name}</h2>

                                            </div>
                                        </div>
                                    </div>
                                </React.Fragment>
                            );
                        })}
                    </Slider>:<Skeleton height={20} width={800} style={{marginLeft:'auto'}} count={4}/>}
            </Container>

        </div>

    </div>;
}