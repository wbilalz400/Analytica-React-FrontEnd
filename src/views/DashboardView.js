import React, { Component } from 'react';
import './DashboardView.css';
import GridLayout from 'react-grid-layout';
import Chart from "react-apexcharts";
import FormField from '../components/FormField';
import FormButton from '../components/FormButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faTimesCircle, faArrowAltCircleLeft, faArrowAltCircleRight, faUserCircle, faArrowAltCircleDown, faEdit, faImages } from '@fortawesome/free-regular-svg-icons'
import barIcon from '../images/bar.png';
import radarIcon from '../images/radar.png';
import donutIcon from '../images/donut.png';
import thermometerIcon from '../images/thermometer.png';
import lineIcon from '../images/line.png';
import areaIcon from '../images/area.png';
import gaugeIcon from '../images/gauge.png';
import indicatorIcon from '../images/indicator.png';
import Thermometer from 'react-thermometer-component';
import GaugeChart from 'react-gauge-chart';
import { color } from 'd3-color';
import { interpolateRgb } from 'd3-interpolate';
import ReactDOM from 'react-dom';
import LiquidFillGauge from 'react-liquid-gauge';
import ReactEnvironmentChart from 'react-environment-chart';
import {Intensity} from 'react-environment-chart';
import {PM} from 'react-environment-chart';
import {Humidity} from 'react-environment-chart';
import {Electricity} from 'react-environment-chart';
import {Tvoc} from 'react-environment-chart';
import {Temperature} from 'react-environment-chart';
import intensityIcon from '../images/Intensity.png';
import pmIcon from '../images/PM.png';
import humidityIcon from '../images/Humidity.png';
import electricityIcon from '../images/Electricity.png';
import tvocIcon from '../images/Tvoc.png';
import temperatureIcon from '../images/Temperature.png';
import scatterIcon from '../images/scatter.png';
import { getWidgets, getDevices, getSensors, addChart, getDaysData, updateDashboard,addGauge,addIntensity,addPM,addHumidity,addElectricity,addTvoc,addTemperature, deleteWidget, addThermometer,addIndicator, getLimitData } from '../api';

const nameToImg = {
    bar: barIcon,
    radar: radarIcon,
    pie: donutIcon,
    line: lineIcon,
    thermometer: thermometerIcon,
    area: areaIcon,
    gauge: gaugeIcon,
    indicator: indicatorIcon,
    intensity: intensityIcon,
    pm: pmIcon,
    humidity: humidityIcon,
    electricity: electricityIcon,
    tvoc: tvocIcon,
    temperature: temperatureIcon,
    scatter: scatterIcon,
//here in dashboard acha

}
const data = [30, 40, 45, 50, 49, 60, 70, 91]

export default class DashboardView extends React.Component {
    constructor() {
        super();
        this.state = {
            widgets: [],
            devices: [],
            images:[],
            step: 1,
            selectedWidget: '',
            selectedDevice: '',
            selectedSensor: '',
            days: 0,
        };
    }

    addChartOp = () => {
        addChart(this.state.selectedWidget, this.state.selectedDevice, this.state.selectedSensor, this.state.days)
            .then(res => {
                console.log(res.data);
                this.loadWidgets();
            })
    }

    addThermometerOp = () => {
        addThermometer(this.state.selectedDevice, this.state.selectedSensor)
            .then(res => {
                console.log(res.data);
                this.loadWidgets();
            })
    }
    addGaugeOp = () => {
        addGauge(this.state.selectedDevice, this.state.selectedSensor)
            .then(res => {
                console.log(res.data);
                this.loadWidgets();
            })
    }
    addIndicatorOp = () => {
        addIndicator(this.state.selectedDevice, this.state.selectedSensor)
            .then(res => {
                console.log(res.data);
                this.loadWidgets();
            })
    }
    addIntensityOp = () => {
        addIntensity(this.state.selectedDevice, this.state.selectedSensor)
            .then(res => {
                console.log(res.data);
                this.loadWidgets();
            })
    }
    addPMOp = () => {
        addPM(this.state.selectedDevice, this.state.selectedSensor)
            .then(res => {
                console.log(res.data);
                this.loadWidgets();
            })
    }
    addHumidityOp = () => {
        addHumidity(this.state.selectedDevice, this.state.selectedSensor)
            .then(res => {
                console.log(res.data);
                this.loadWidgets();
            })
    }
    addElectricityOp = () => {
        addElectricity(this.state.selectedDevice, this.state.selectedSensor)
            .then(res => {
                console.log(res.data);
                this.loadWidgets();
            })
    }
    addTvocOp = () => {
        addTvoc(this.state.selectedDevice, this.state.selectedSensor)
            .then(res => {
                console.log(res.data);
                this.loadWidgets();
            })
    }
    addTemperatureOp = () => {
        addTemperature(this.state.selectedDevice, this.state.selectedSensor)
            .then(res => {
                console.log(res.data);
                this.loadWidgets();
            })
    }
   
    getDataCall =
        () => {
            this.state.widgets.forEach(widget => {
                if (this.isChart(widget.type)) {
                    getDaysData(widget.device, widget.sensor, widget.days)
                        .then(res => {
                            if (res.data.success) {
                                let newWidgets = this.state.widgets.filter(w => w.id !== widget.id);
                                if (widget.type === 'line') {
                                    let consumableData = res.data.data.map(data => {
                                        let date = new Date(data.time);
                                        return [date.getTime(), data.value];
                                    });
                                    widget.data = consumableData.sort((a, b) => a[0] - b[0]);
                                    widget.chartOptions.xaxis = { type: 'datetime' };

                                }
                                else if (widget.type === 'scatter') {
                                    let consumableData = res.data.data.map(data => {
                                        let date = new Date(data.time);
                                        return [date.getTime(), data.value];
                                    });
                                    widget.data = consumableData.sort((a, b) => a[0] - b[0]);
                                    widget.chartOptions.xaxis = { type: 'datetime' };

                                }
                                else if (widget.type === 'area') {
                                    let consumableData = res.data.data.map(data => {
                                        let date = new Date(data.time);
                                        return [date.getTime(), data.value];
                                    });
                                    widget.data = consumableData.sort((a, b) => a[0] - b[0]);
                                    widget.chartOptions.xaxis = { type: 'datetime' };

                                } 
                                else if (widget.type === 'radar') {
                                    let consumableData = res.data.data.map(data => {
                                        let date = new Date(data.time);
                                        return [date.getTime(), data.value];
                                    });
                                    widget.data = consumableData.sort((a, b) => a[0] - b[0]);
                                    widget.chartOptions.xaxis = { type: 'datetime' };

                                } 
                                else if (widget.type === 'bar') {
                                    let uniqueData = new Set(res.data.data.map(data => data.value));
                                    let data = [];
                                    uniqueData.forEach(uniq => {
                                        let count = res.data.data.filter(d => uniq === d.value).length;
                                        data.push({ x: uniq, y: count });
                                    });
                                    widget.data = data;
                                    widget.chartOptions.xaxis = { type: 'category' };
                                } else if (widget.type === 'donut' || widget.type === 'pie') {
                                    let uniqueData = new Set(res.data.data.map(data => data.value));
                                    let data = [];
                                    let labels = [];
                                    uniqueData.forEach(uniq => {
                                        let count = res.data.data.filter(d => uniq === d.value).length;
                                        data.push(count);
                                        labels.push(uniq);

                                    });
                                    widget.data = data;
                                    widget.chartOptions.xaxis = { type: 'category' };
                                    widget.chartOptions.labels = labels;
                                }
                                newWidgets.push(widget);
                                this.setState({ widgets: newWidgets });
                            }
                        })
                } else if (widget.type === 'thermometer') {
                    getLimitData(1, widget.device, widget.sensor)
                        .then(res => {
                            if (res.data.success) {
                                let data = res.data.data.length > 0 ? res.data.data[0].value : "No Data";
                                widget.data = data;
                                let newWidgets = this.state.widgets.filter(w => w.id !== widget.id);
                                newWidgets.push(widget);
                                this.setState({ widgets: newWidgets });
                            }
                        })
                }
                else if (widget.type === 'gauge') {
                    getLimitData(1, widget.device, widget.sensor)
                        .then(res => {
                            if (res.data.success) {
                                let data = res.data.data.length > 0 ? res.data.data[0].value : "No Data";
                                widget.data = data;
                                let newWidgets = this.state.widgets.filter(w => w.id !== widget.id);
                                newWidgets.push(widget);
                                this.setState({ widgets: newWidgets });
                            }
                        })
                }
                else if (widget.type === 'indicator') {
                    getLimitData(1, widget.device, widget.sensor)
                        .then(res => {
                            if (res.data.success) {
                                let data = res.data.data.length > 0 ? res.data.data[0].value : "No Data";
                                widget.data = data;
                                let newWidgets = this.state.widgets.filter(w => w.id !== widget.id);
                                newWidgets.push(widget);
                                this.setState({ widgets: newWidgets });
                            }
                        })
                }
                else if (widget.type === 'intensity') {
                    getLimitData(1, widget.device, widget.sensor)
                        .then(res => {
                            if (res.data.success) {
                                let data = res.data.data.length > 0 ? res.data.data[0].value : "No Data";
                                widget.data = data;
                                let newWidgets = this.state.widgets.filter(w => w.id !== widget.id);
                                newWidgets.push(widget);
                                this.setState({ widgets: newWidgets });
                            }
                        })
                }
                else if (widget.type === 'pm') {
                    getLimitData(1, widget.device, widget.sensor)
                        .then(res => {
                            if (res.data.success) {
                                let data = res.data.data.length > 0 ? res.data.data[0].value : "No Data";
                                widget.data = data;
                                let newWidgets = this.state.widgets.filter(w => w.id !== widget.id);
                                newWidgets.push(widget);
                                this.setState({ widgets: newWidgets });
                            }
                        })
                }
                else if (widget.type === 'humidity') {
                    getLimitData(1, widget.device, widget.sensor)
                        .then(res => {
                            if (res.data.success) {
                                let data = res.data.data.length > 0 ? res.data.data[0].value : "No Data";
                                widget.data = data;
                                let newWidgets = this.state.widgets.filter(w => w.id !== widget.id);
                                newWidgets.push(widget);
                                this.setState({ widgets: newWidgets });
                            }
                        })
                }
                else if (widget.type === 'electricity') {
                    getLimitData(1, widget.device, widget.sensor)
                        .then(res => {
                            if (res.data.success) {
                                let data = res.data.data.length > 0 ? res.data.data[0].value : "No Data";
                                widget.data = data;
                                let newWidgets = this.state.widgets.filter(w => w.id !== widget.id);
                                newWidgets.push(widget);
                                this.setState({ widgets: newWidgets });
                            }
                        })
                }
                else if (widget.type === 'tvoc') {
                    getLimitData(1, widget.device, widget.sensor)
                        .then(res => {
                            if (res.data.success) {
                                let data = res.data.data.length > 0 ? res.data.data[0].value : "No Data";
                                widget.data = data;
                                let newWidgets = this.state.widgets.filter(w => w.id !== widget.id);
                                newWidgets.push(widget);
                                this.setState({ widgets: newWidgets });
                            }
                        })
                }
                else if (widget.type === 'temperature') {
                    getLimitData(1, widget.device, widget.sensor)
                        .then(res => {
                            if (res.data.success) {
                                let data = res.data.data.length > 0 ? res.data.data[0].value : "No Data";
                                widget.data = data;
                                let newWidgets = this.state.widgets.filter(w => w.id !== widget.id);
                                newWidgets.push(widget);
                                this.setState({ widgets: newWidgets });
                            }
                        })
                }
                
            })
        }


    getData = () => {
        setInterval(this.getDataCall, 60000);
    }
    updateWidgets = () => {

    }
    componentDidMount() {
        getDevices().then(res => {
            if (res.data.success) {
                res.data.devices.forEach(device => {
                    getSensors(device.id).then(res => {
                        if (res.data.success) {
                            device.sensors = res.data.sensors;
                            this.setState({ devices: [...this.state.devices, device],...device.sensors[0]?{selectedDevice: device.id,selectedSensor: device.sensors[0].id}:{} });
                        }
                    })
                })
            }
        })
        if (localStorage.getItem("dashboard")) {
            let widgets = JSON.parse(localStorage.getItem("dashboard"));
            //this.setState({ widgets: widgets });
        }
        this.loadWidgets();
    }
    addChart = type => {
        this.setState({ widgets: [...this.state.widgets, this.generateChart(type)] });
    }


    updateLayout = layout => {
        let widgets = [...this.state.widgets];
        let data = [];
        layout.forEach(lay => {
            let index = widgets.findIndex(o => o.id === lay.i);
            if (index !== -1) widgets[index].layout = lay;
            data.push(widgets[index].data);
        });
        updateDashboard({ widgets: widgets })
            .then(res => {
                if (res.data.success) {
                    //this.setState({widgets:res.data.widgets});
                } else {
                    console.warn(res.data);
                }
            });
        this.setState({
            widgets: widgets.map((w, i) => {
                w.data = data[i];
                return w;
            })
        });
    }
    generateChart = type => {
        let allIds = this.state.widgets.map(w => parseInt(w.id));
        let newId = Math.max.apply(null, allIds) + 1;
        if (allIds.length == 0) newId = 0;

        let toR = {
            id: newId.toString(),
            type: 'chart',
            chartOptions: {
                type: type,
                options: {
                    chart: {
                        id: "basic-bar"
                    },
                    xaxis: {
                        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
                    }
                }
            },
            data: {
                series: [
                    {
                        name: "series-1",
                        data: [30, 40, 45, 50, 49, 60, 70, 91]
                    }
                ]
            },
            layout: {
                i: newId.toString(),
                x: 0,
                y: 0,
                h: 8,
                w: 9,
            }
        };
        if (type === "donut") toR.data.series = toR.data.series[0].data;
        return toR;
    }
    addThermometer = () => {
        let allIds = this.state.widgets.map(w => parseInt(w.id));
        let newId = Math.max.apply(null, allIds) + 1;
        if (allIds.length == 0) newId = 0;
        let toAdd = {
            id: newId.toString(),
            type: 'thermometer',
            layout: {
                i: newId.toString(),
                x: 0,
                y: 0,
                w: 1,
                h: 5,
                minH: 5,
            }

        }
        this.setState({ widgets: [...this.state.widgets, toAdd] })
    }
    addGauge = () => {
        let allIds = this.state.widgets.map(w => parseInt(w.id));
        let newId = Math.max.apply(null, allIds) + 1;
        if (allIds.length == 0) newId = 0;
        let toAdd = {
            id: newId.toString(),
            type: 'gauge',
            layout: {
                i: newId.toString(),
                x: 0,
                y: 0,
                w: 1,
                h: 5,
                minH: 5,
            }

        }
        this.setState({ widgets: [...this.state.widgets, toAdd] })
    }
    addIndicator = () => {
        let allIds = this.state.widgets.map(w => parseInt(w.id));
        let newId = Math.max.apply(null, allIds) + 1;
        if (allIds.length == 0) newId = 0;
        let toAdd = {
            id: newId.toString(),
            type: 'indicator',
            layout: {
                i: newId.toString(),
                x: 0,
                y: 0,
                w: 1,
                h: 5,
                minH: 5,
            }

        }
        this.setState({ widgets: [...this.state.widgets, toAdd] })
    }
    addIntensity = () => {
        let allIds = this.state.widgets.map(w => parseInt(w.id));
        let newId = Math.max.apply(null, allIds) + 1;
        if (allIds.length == 0) newId = 0;
        let toAdd = {
            id: newId.toString(),
            type: 'intensity',
            layout: {
                i: newId.toString(),
                x: 0,
                y: 0,
                w: 1,
                h: 5,
                minH: 5,
            }

        }
        this.setState({ widgets: [...this.state.widgets, toAdd] })
    }
    addPM = () => {
        let allIds = this.state.widgets.map(w => parseInt(w.id));
        let newId = Math.max.apply(null, allIds) + 1;
        if (allIds.length == 0) newId = 0;
        let toAdd = {
            id: newId.toString(),
            type: 'pm',
            layout: {
                i: newId.toString(),
                x: 0,
                y: 0,
                w: 1,
                h: 5,
                minH: 5,
            }

        }
        this.setState({ widgets: [...this.state.widgets, toAdd] })
    }
    addHumidity = () => {
        let allIds = this.state.widgets.map(w => parseInt(w.id));
        let newId = Math.max.apply(null, allIds) + 1;
        if (allIds.length == 0) newId = 0;
        let toAdd = {
            id: newId.toString(),
            type: 'humidity',
            layout: {
                i: newId.toString(),
                x: 0,
                y: 0,
                w: 1,
                h: 5,
                minH: 5,
            }

        }
        this.setState({ widgets: [...this.state.widgets, toAdd] })
    }
    addElectricity = () => {
        let allIds = this.state.widgets.map(w => parseInt(w.id));
        let newId = Math.max.apply(null, allIds) + 1;
        if (allIds.length == 0) newId = 0;
        let toAdd = {
            id: newId.toString(),
            type: 'electricity',
            layout: {
                i: newId.toString(),
                x: 0,
                y: 0,
                w: 1,
                h: 5,
                minH: 5,
            }

        }
        this.setState({ widgets: [...this.state.widgets, toAdd] })
    }
    addTvoc = () => {
        let allIds = this.state.widgets.map(w => parseInt(w.id));
        let newId = Math.max.apply(null, allIds) + 1;
        if (allIds.length == 0) newId = 0;
        let toAdd = {
            id: newId.toString(),
            type: 'tvoc',
            layout: {
                i: newId.toString(),
                x: 0,
                y: 0,
                w: 1,
                h: 5,
                minH: 5,
            }

        }
        this.setState({ widgets: [...this.state.widgets, toAdd] })
    }
    addTemperature = () => {
        let allIds = this.state.widgets.map(w => parseInt(w.id));
        let newId = Math.max.apply(null, allIds) + 1;
        if (allIds.length == 0) newId = 0;
        let toAdd = {
            id: newId.toString(),
            type: 'temperature',
            layout: {
                i: newId.toString(),
                x: 0,
                y: 0,
                w: 1,
                h: 5,
                minH: 5,
            }

        }
        this.setState({ widgets: [...this.state.widgets, toAdd] })
    }

    loadWidgets() {
        getWidgets()
            .then(res => {
                if (res.data.success)
                    this.setState({ widgets: res.data.widgets }); this.getDataCall();
            });
        this.getData();
    }

    isChart(type) {
        switch (type) {
            case 'line':
            case 'scatter':
            case 'area':
            case 'bar':
            case 'radar':
            case 'donut':
            
            case 'pie':
                return true;
                break;
            default:
                return false;
        }
    }
    deleteWidget = _id => {
        deleteWidget(_id)
            .then(
                res => {
                    if (res.data.success) {
                        this.loadWidgets();
                    } else {
                        console.warn(res.data);
                    }
                }
            )
    }
    startColor = '#6495ed'; // cornflowerblue
    endColor = '#dc143c'; // crimson

    getFillColor(val){
        const interpolate = interpolateRgb(this.startColor, this.endColor);
        return interpolate(val / 100);
    }
    getGradientStops(val){
        const fillColor = this.getFillColor(val);
        return   [
            {
                key: '0%',
                stopColor: color(fillColor).darker(0.5).toString(),
                stopOpacity: 1,
                offset: '0%'
            },
            {
                key: '50%',
                stopColor: fillColor,
                stopOpacity: 0.75,
                offset: '50%'
            },
            {
                key: '100%',
                stopColor: color(fillColor).brighter(0.5).toString(),
                stopOpacity: 0.5,
                offset: '100%'
            }
        ];

    }
    render() {
        
        return <div className={"dashboardMain"}>
            <h1>Information at a glance</h1>

            <GridLayout onLayoutChange={this.updateLayout} className="gridLayout" rowHeight={30} width={1500} cols={14}>
                {this.state.widgets.map(element => <div className="widgetCard" key={element.id} data-grid={element.layout}>
                    {this.isChart(element.type) ?
                        <Chart
                            options={{ ...element.chartOptions }}
                            series={element.type === 'pie' ? (element.data ? element.data : []) : [{name:'Series-1',   data: element.data }]}
                            height={element.layout.h * 30}

                            width={element.layout.w * 95}
                            type={element.type === 'pie'?'donut':element.type}
                        />
                        : element.type === 'thermometer' ? <Thermometer value={element.data} height={element.layout.h * 30} />
                            :<div/>}
                            {element.type === 'intensity' && <Intensity value={element.data} height={element.layout.h * 30}/>}
                            {element.type === 'pm' && <PM value={element.data*8} height={element.layout.h * 30} />}
                            {element.type === 'humidity' && <Humidity value={element.data*10} height={element.layout.h * 30} />}
                            {element.type === 'electricity' && <Electricity value={element.data*9} height={element.layout.h * 30} />}
                            {element.type === 'tvoc' && <Tvoc value={element.data/10} height={element.layout.h * 30} />}
                            {element.type === 'temperature' && <Temperature value={element.data*3} height={element.layout.h * 30} />}
                            {element.type==='gauge' && <GaugeChart id="gauge-chart6"
                            height={element.layout.h * 30}
                            nrOfLevels={15} 
                            percent={element.data/100} 
                            textColor="#345243"
                            needleColor="#FFFFF"/> }
                            {element.type==='indicator' && <LiquidFillGauge
                    style={{ margin: '0 auto' }}
                
                    height={element.layout.h * 30}
                    value={element.data*5}
                    style={{marginTop:20}}
                    percent="%"
                    textSize={1}
                    textOffsetX={0}
                    textOffsetY={0}
                    textRenderer={(props) => {
                        const value = Math.round(props.value);
                        const radius = Math.min(props.height / 2, props.width / 2);
                        const textPixels = (props.textSize * radius / 2);
                        const valueStyle = {
                            fontSize: textPixels
                        };
                        const percentStyle = {
                            fontSize: textPixels * 0.6
                        };
 
                        return (
                            <tspan>
                                <tspan className="value" style={valueStyle}>{value}</tspan>
                                <tspan style={percentStyle}>{props.percent}</tspan>
                            </tspan>
                        );
                    }}
                    riseAnimation
                    waveAnimation
                    waveFrequency={2}
                    waveAmplitude={1}
                    gradient
                    gradientStops={this.getGradientStops(element.data*5)}
                    circleStyle={{
                        fill: this.getFillColor(element.data*5)
                    }}
                    waveStyle={{
                        fill: this.getFillColor(element.data*5)
                    }}
                    textStyle={{
                        fill: color('#444').toString(),
                        fontFamily: 'Arial'
                    }}
                    waveTextStyle={{
                        fill: color('#fff').toString(),
                        fontFamily: 'Arial'
                    }}
                />}
                    <div className="exitBtn2" onClick={() => this.deleteWidget(element._id)}>
                        <FontAwesomeIcon
                            icon={faTimesCircle}
                            size="1x"
                            style={{ color: 'white' }}
                        />
                    </div>
                </div>
                )}
            </GridLayout>
            <div onClick={() => this.setState({ modal: true, step: 1 })} className="addIcon">
                <span >+</span>
            </div>
            <div className={`blurModal ${this.state.modal ? "show" : ""}`}>

                <div className={`ModalContent`}>
                    <div className="exitBtn" onClick={() => this.setState({ modal: false })}>
                        <FontAwesomeIcon
                            icon={faTimesCircle}
                            size="2x"
                            style={{ color: 'white' }}
                        />
                    </div>
                    {this.state.step === 1 ? [
                        <h1 style={{ marginTop: "20px" }}>Widgets</h1>,
                        <div className="WidgetContainer">
                            <div className="widgetOption" onClick={() => { this.setState({ step: 2, selectedWidget: 'bar' }) }}>
                                <img src={barIcon} />
                                <h3>Bar Graph</h3>
                                <p>A bar graph to show different distinction of groups</p>
                            </div>
                            <div className="widgetOption" onClick={() => { this.setState({ step: 2, selectedWidget: 'pie' }) }}>
                                <img src={donutIcon} />
                                <h3>Pie Chart</h3>
                                <p>A pie chart to show different percentages of groups</p>
                            </div>
                            <div className="widgetOption" onClick={() => { this.setState({ step: 2, selectedWidget: 'radar' }) }}>
                                <img src={radarIcon} />
                                <h3>Radar Graph</h3>
                                <p>A web-shaped diagram to indicate the relative influence of different numerical parameters. </p>
                            </div>
                            <div className="widgetOption" onClick={() => { this.setState({ step: 2, selectedWidget: 'line' }) }}>
                                <img src={lineIcon} />
                                <h3>Line Graph</h3>
                                <p>A line graph to depict trends and behaviors over time. </p>
                            </div>
                            <div className="widgetOption" onClick={() => { this.setState({ step: 2, selectedWidget: 'area' }) }}>
                                <img src={areaIcon} />
                                <h3>Area Graph</h3>
                                <p>A Area graph to show different distinction of groups</p>
                            </div>
                            <div className="widgetOption" onClick={() => { this.setState({ step: 2, selectedWidget: 'thermometer' }) }}>
                                <img src={thermometerIcon} />
                                <h3>Thermometer</h3>
                                <p>A Thermometer widget to show different distinction of groups</p>
                            </div>
                            <div className="widgetOption" onClick={() => { this.setState({ step: 2, selectedWidget: 'gauge' }) }}>
                                <img src={gaugeIcon} />
                                <h3>Gauge</h3>
                                <p>A Gauge widget to show different distinction of groups</p>
                            </div>
                            <div className="widgetOption" onClick={() => { this.setState({ step: 2, selectedWidget: 'indicator' }) }}>
                                <img src={indicatorIcon} />
                                <h3>Indicator</h3>
                                <p>An Indicator widget to show different distinction of groups</p>
                            </div>
                            <div className="widgetOption" onClick={() => { this.setState({ step: 2, selectedWidget: 'intensity' }) }}>
                                <img src={intensityIcon} />
                                <h3>Intensity Chart</h3>
                                <p>An Intensity widget to show different distinction of groups</p>
                            </div>
                            <div className="widgetOption" onClick={() => { this.setState({ step: 2, selectedWidget: 'pm' }) }}>
                                <img src={pmIcon} />
                                <h3>Particulate Matter Chart</h3>
                                <p>A PM widget to show different distinction of groups</p>
                            </div>
                            <div className="widgetOption" onClick={() => { this.setState({ step: 2, selectedWidget: 'humidity' }) }}>
                                <img src={humidityIcon} />
                                <h3>Humidity Chart</h3>
                                <p>A Humidity widget to show different distinction of groups</p>
                            </div>
                            <div className="widgetOption" onClick={() => { this.setState({ step: 2, selectedWidget: 'electricity' }) }}>
                                <img src={electricityIcon} />
                                <h3>Electricity Chart</h3>
                                <p>An  Chart to show different distinction of groups</p>
                            </div>
                            <div className="widgetOption" onClick={() => { this.setState({ step: 2, selectedWidget: 'tvoc' }) }}>
                                <img src={tvocIcon} />
                                <h3>VOC Chart</h3>
                                <p>A Tvoc widget to show different distinction of groups</p>
                            </div>
                            <div className="widgetOption" onClick={() => { this.setState({ step: 2, selectedWidget: 'temperature' }) }}>
                                <img src={temperatureIcon} />
                                <h3>Temperature Chart</h3>
                                <p>A Temperature widget to show different distinction of groups</p>
                            </div>
                            <div className="widgetOption" onClick={() => { this.setState({ step: 2, selectedWidget: 'scatter' }) }}>
                                <img src={scatterIcon} />
                                <h3>Scatter Graph</h3>
                                <p>A scatter graph to show different distinction of groups</p>
                            </div>
                        </div>] : <div className="widgetSelectionContainer">
                            <img src={nameToImg[this.state.selectedWidget]} className='widgetSelectionImg' />
                            <div className="widgetSelectionRight">
                                <h1>{this.state.selectedWidget}</h1>

                                <div className="widgetSelectionForm">
                                    <small>Select Device</small>
                                    <select value={this.state.selectedDevice} onChange={value => this.setState({ selectedDevice: value.target.value })}>
                                        {this.state.devices.map(device => <option value={device.id}>{device.name}</option>)}

                                    </select>
                                    {this.state.selectedDevice ? [<small>Select Sensor</small>, <select value={this.state.selectedSensor} onChange={value => this.setState({ selectedSensor: value.target.value })}>{this.state.devices.find(d => d.id === this.state.selectedDevice).sensors.map(sensor => <option value={sensor.id}>{sensor.name}</option>)}</select>] : ""}
                                    {this.isChart(this.state.selectedWidget) ? [<small>Enter Days for range of data</small>,
                                    <FormField onChange={value => this.setState({ days: value.target.value })} placeholder={"Enter Days"} value={this.state.days} />] : ""}
                                    <FormButton label="Add Widget" type="filled" color="orange" onClick={() => { this.state.selectedWidget !== 'thermometer' ? this.addChartOp() : this.addThermometerOp(); this.setState({ modal: false }) }} />
                                    <FormButton label="Go Back" type="filled" color="orange" onClick={() => this.setState({ step: 1 })} />

                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>;
    }
}