import axios from 'axios';


const BASE_URL = 'https://analyticaiot-backend.herokuapp.com/';
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
const ADD_TVOC = '/dashboard/tvoc/{device}/{sensor}'
const ADD_TEMPERATURE = '/dashboard/temperature/{device}/{sensor}';
const GET_DEVICES = '/device';
const GET_SENSORS = '/device/{deviceId}';
const GET_DATA_LIMIT = '/device/{deviceId}/sensor/{sensorId}/limit/{limit}';
const GET_DATA_DAYS = '/device/{deviceId}/sensor/{sensorId}/days/{days}';
const DELETE_WIDGET = '/dashboard/widget/{widgetId}';
const UPDATE_USER = "/users/";
const GET_IMAGES = '/image/all';
const GET_FARMS = '/farm'
const POST_FARM = '/farm';
const GET_FARM = '/farm/{id}';
const GET_TRUCKS = '/truck';
const GET_TRUCK = '/truck/{id}';
const GET_NOTIFICATION = '/notification';
const POST_TRUCK = '/truck';
const REPORT = '/reports';
const RETAIL = '/retail';
const SMART = '/smart';



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

export const getTrucks = () => {
    return API.get(GET_TRUCKS);
}

export const addSmart =  (payload) => API.post(SMART,payload);

export const getSmarts = () => API.get(SMART);

export const getSmart = id => API.get(`${SMART}/${id}`);


export const getReports = () => API.get(REPORT);

export const addReport = payload => API.post(REPORT,payload);

export const getReport = id => API.get(REPORT + `/${id}`);

export const updateReport = (id,payload) => API.patch(REPORT + `/${id}`,payload);

export const addRetail = payload => API.post(RETAIL,payload);

export const getRetails = () => API.get(RETAIL);

export const getRetail = id => API.get(RETAIL + `/${id}`);

export const getTruck = id => {
    return API.get(GET_TRUCK.replace("{id}",id));
}

export const getNotification = () => {
    return API.get(GET_NOTIFICATION);
}

export const addTruck = payload => {
    return API.post(POST_TRUCK,payload);
}

export const getDaysData = (device, sensor, days) => {
    return API.get(GET_DATA_DAYS.replace("{deviceId}", device).replace("{sensorId}", sensor).replace("{days}", days));
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
    return API.delete(DELETE_WIDGET.replace("{widgetId}", widgetId));
}

export const getDevices = async () => {
    return API.get(GET_DEVICES);
}
export const updateDashboard = async (payload) => {
    return API.put(UPDATE_DASHBOARD.replace("{id}", 0), payload);
}

export const getSensors = async device => {
    return API.get(GET_SENSORS.replace("{deviceId}", device));
}
export const getWidgets = async () => {
    return API.get(GET_DASHBOARD.replace("{id}", ""));
}

export const getLimitData = (limit, device, sensor) => {
    let url = GET_DATA_LIMIT.replace("{limit}", limit).replace("{deviceId}", device).replace("{sensorId}", sensor);
    return API.get(url);
}
export const updateUser = payload => {
    let url = UPDATE_USER;
    return API.put(url, payload);
}
export const addChart = async (type, device, sensor, days) => {
    let url = ADD_CHART.replace("{type}", type).replace("{device}", device).replace("{sensor}", sensor).replace("{days}", days);
    return API.post(url, {});
}
export const addThermometer = async (device, sensor) => {
    let url = ADD_THERMOMETER.replace("{device}", device).replace("{sensor}", sensor);
    return API.post(url, {});
}
export const addIntensity = async (device, sensor) => {
    let url = ADD_INTENSITY.replace("{device}", device).replace("{sensor}", sensor);
    return API.post(url, {});
}
export const addPM = async (device, sensor) => {
    let url = ADD_PM.replace("{device}", device).replace("{sensor}", sensor);
    return API.post(url, {});
}
export const addHumidity = async (device, sensor) => {
    let url = ADD_HUMIDITY.replace("{device}", device).replace("{sensor}", sensor);
    return API.post(url, {});
}
export const addElectricity = async (device, sensor) => {
    let url = ADD_ELECTRICITY.replace("{device}", device).replace("{sensor}", sensor);
    return API.post(url, {});
}
export const addTvoc = async (device, sensor) => {
    let url = ADD_TVOC.replace("{device}", device).replace("{sensor}", sensor);
    return API.post(url, {});
}
export const addTemperature = async (device, sensor) => {
    let url = ADD_TEMPERATURE.replace("{device}", device).replace("{sensor}", sensor);
    return API.post(url, {});
}
export const add = async (device, sensor) => {
    let url = ADD_THERMOMETER.replace("{device}", device).replace("{sensor}", sensor);
    return API.post(url, {});
}
export const addGauge = async (device, sensor) => {
    let url = ADD_GAUGE.replace("{device}", device).replace("{sensor}", sensor);
    return await API.post(url, {});
}
export const addIndicator = async (device, sensor) => {
    let url = ADD_INDICATOR.replace("{device}", device).replace("{sensor}", sensor);
    return await API.post(url, {});
}

export const addAction = (payload) => {
    let url = "/users/action";
    return API.post(url, payload);
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
export const addFarm = payload => {
    return API.post(POST_FARM,payload);
}
export const getFarm = id => {
    return API.get(GET_FARM.replace("{id}",id));
}
export const getFarms = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            let farms = await API.get(GET_FARMS);
            if (farms.data.success) {
                farms = farms.data.farms.map(async farm => {
                    return new Promise(async (resolve, reject) => {
                        farm = await API.get(GET_FARM.replace("{id}", farm._id));
                        farm = farm.data;
                        resolve(farm);
                    });
                });
                farms = await Promise.all(farms);
                resolve(farms);
            } else {
                reject("API returned no sucess " + JSON.stringify(farms.data.message));
            }
        } catch (e) {
            reject("Error from API:" + e);
        }
    });
}

export const fetchCountries = async () => {
    try {
        const { data: { countries } } = await axios.get(`${url1}/countries`);

        return countries.map((country) => country.name);

    } catch (error) {
        console.log(error);
    }
}