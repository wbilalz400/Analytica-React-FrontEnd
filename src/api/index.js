import axios from 'axios';


const BASE_URL = 'http://localhost:3001';
const GET_DASHBOARD = '/dashboard/{id}';
const UPDATE_DASHBOARD = '/dashboard/{id}';
const ADD_CHART = '/dashboard/chart/{type}/{device}/{sensor}/{days}';
const ADD_THERMOMETER = '/dashboard/thermometer/{device}/{sensor}';
const ADD_GAUGE = '/dashboard/gauge/{device}/{sensor}';
const ADD_INDICATOR = '/dashboard/indicator/{device}/{sensor}';
const ADD_INTENSITY = '/dashboard/intensity/{device}/{sensor}';
const ADD_PM = '/dashboard/pm/{device}/{sensor}';
const ADD_HUMIDITY = '/dashboard/humidity/{device}/{sensor}';
const ADD_ELECTRICITY = '/dashboard/electricity/{device}/{sensor}';
const ADD_TVOC = '/dashboard/tvoc/{device}/{sensor}';
const ADD_TEMPERATURE = '/dashboard/temperature/{device}/{sensor}';
const GET_DEVICES = '/device';
const GET_SENSORS = '/device/{deviceId}';
const GET_DATA_LIMIT = '/device/{deviceId}/sensor/{sensorId}/limit/{limit}';
const GET_DATA_DAYS = '/device/{deviceId}/sensor/{sensorId}/days/{days}'; 
const DELETE_WIDGET = '/dashboard/widget/{widgetId}';
const UPDATE_USER = "/users/";
const GET_IMAGES = '/image/all';
const API = axios.create({
    baseURL: BASE_URL,
});

API.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
    config.headers['Authorization'] = `Bearer ${token}`;
    return config;
}, error => {
    return Promise.reject(error)
})

//const url = 'https://api.covid19api.com/summary';
//const url2 = 'https://api.covid19api.com/stats';
const url1 = 'https://covid19.mathdro.id/api';

export const getImages = async () => {
    const res = await API.get(GET_IMAGES); // ye vo array le aega. ab jaha display krana hai vaha le
    return res.data;
}

export const getDaysData = (device,sensor,days) => {
    return API.get(GET_DATA_DAYS.replace("{deviceId}",device).replace("{sensorId}",sensor).replace("{days}",days));
}
export const fetchData = async (country) => {
    let changableUrl = url1

    if (country) {
        changableUrl = `${url1}/countries/${country}`
    }
    try {
        const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(changableUrl);

        return { confirmed, recovered, deaths, lastUpdate };
    } catch (error) {
        console.log(error);

    }
}

export const deleteWidget = async widgetId => {
    return API.delete(DELETE_WIDGET.replace("{widgetId}",widgetId));
}

export const getDevices = async () => {
    return API.get(GET_DEVICES);
}
export const updateDashboard  = async(payload) => {
    return API.put(UPDATE_DASHBOARD.replace("{id}",0),payload);
}

export const getSensors = async device => {
    return API.get(GET_SENSORS.replace("{deviceId}",device));
}
export const getWidgets = async () => {
    return API.get(GET_DASHBOARD.replace("{id}",""));
}

export const getLimitData = (limit,device,sensor) => {
    let url = GET_DATA_LIMIT.replace("{limit}",limit).replace("{deviceId}",device).replace("{sensorId}",sensor);
    return API.get(url);
}
export const updateUser = payload => {
    let url = UPDATE_USER;
    return API.put(url,payload);
}
export const addChart = async (type,device,sensor,days) => {
    let url = ADD_CHART.replace("{type}",type).replace("{device}",device).replace("{sensor}",sensor).replace("{days}",days);
    return API.post(url,{});
}
export const addThermometer = async (device,sensor) => {
    let url = ADD_THERMOMETER.replace("{device}",device).replace("{sensor}",sensor);
    return API.post(url,{});
}
export const addIntensity = async (device,sensor) => {
    let url = ADD_INTENSITY.replace("{device}",device).replace("{sensor}",sensor);
    return API.post(url,{});
}
export const addPM = async (device,sensor) => {
    let url = ADD_PM.replace("{device}",device).replace("{sensor}",sensor);
    return API.post(url,{});
}
export const addHumidity = async (device,sensor) => {
    let url = ADD_HUMIDITY.replace("{device}",device).replace("{sensor}",sensor);
    return API.post(url,{});
}
export const addElectricity = async (device,sensor) => {
    let url = ADD_ELECTRICITY.replace("{device}",device).replace("{sensor}",sensor);
    return API.post(url,{});
}
export const addTvoc = async (device,sensor) => {
    let url = ADD_TVOC.replace("{device}",device).replace("{sensor}",sensor);
    return API.post(url,{});
}
export const addTemperature = async (device,sensor) => {
    let url = ADD_TEMPERATURE.replace("{device}",device).replace("{sensor}",sensor);
    return API.post(url,{});
}
export const add = async (device,sensor) => {
    let url = ADD_THERMOMETER.replace("{device}",device).replace("{sensor}",sensor);
    return API.post(url,{});
}
export const addGauge = async (device,sensor) => {
    let url = ADD_GAUGE.replace("{device}",device).replace("{sensor}",sensor);
    return await API.post(url,{});
}
export const addIndicator = async (device,sensor) => {
    let url = ADD_INDICATOR.replace("{device}",device).replace("{sensor}",sensor);
    return await API.post(url,{});
}

export const addAction = (payload) => {
    let url = "/users/action";
    return API.post(url,payload);
}

export const getActions = () => API.get('/users/action');
export const fetchDailyData = async () => {
    try {
        const { data } = await axios.get(`${url1}/daily`);
        const modifiedData = data.map((dailyData) => ({
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            date: dailyData.reportDate,
        }));
        return modifiedData;
    } catch (error) {
        console.log(error);
    }
}

export const fetchCountries = async () => {
    try {
        const { data: { countries } } = await axios.get(`${url1}/countries`);

        return countries.map((country) => country.name);

    } catch (error) {
        console.log(error);
    }
}