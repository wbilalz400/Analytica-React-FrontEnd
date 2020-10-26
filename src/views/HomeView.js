import React from 'react';
import ProtectedView from './ProtectedView';
import './HomeView.css'
import logo from '../images/light-logo.png';
import barIcon from '../images/bar.png';
import radarIcon from '../images/radar.png';
import donutIcon from '../images/donut.png';
import lineIcon from '../images/line.png';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import userLogo from '../images/user-icon.svg';
import FormButton from '../components/FormButton'
import editLogo from '../images/edit-icon.svg';
import '../css/styles.css';
import '../css/styles1.css';
import { circle } from '@fortawesome/fontawesome-free'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import leftArrowIcon from '../images/left-arrow-icon.svg';
import { faCircle, faTimesCircle, faArrowAltCircleLeft,faFileImage,faBuilding, faArrowAltCircleRight, faUserCircle, faArrowAltCircleDown, faEdit, faCalendar } from '@fortawesome/free-regular-svg-icons'
import { faWifi, faBolt, faClipboardList, faTruck, faShoppingBag, faUtensilSpoon, faTree, faHome } from '@fortawesome/free-solid-svg-icons';
import { Collapse } from 'react-collapse';
import GridLayout from 'react-grid-layout';
import Chart from "react-apexcharts";
import DashboardView from './DashboardView.js';
import DevicesView from './Devices.js';
import Actions from './Actions';
import DeviceView from './DeviceView';
import MyProfileView from './MyProfileView';
import ImageView from './Images';
import UseCases from './UseCases';
import LogisticsView from './LogisticsView';
import LogisticsDetail from './LogisticsDetail';
import SensorDetail from './SensorDetail';
import AnalyticsFeed from './AnalyticsFeed';
export default class extends React.Component {
    constructor() {
        super();
        this.state = { auth: false, collapse: false, r: 180 };

        this.logOut = () => {
            localStorage.removeItem("token");
            window.location.href = '/';
        }


        this.collapse = (collapseItem) => {
            let obj = {};
            obj[collapseItem] = !this.state[collapseItem];
            this.setState(obj);
        }
        // this.loading = () => {
        //     this.interval = setInterval(() => {
        //         this.setState({ loading: !this.state.loading });
        //     }, 800);
        // }
        // this.stopLoading = () => {
        //     clearInterval(this.interval);
        //     this.setState({ loading: false })
        // }
        // this.loading();

        this.state = {
            layout: [
                {
                    x: 0,
                    y: 0,
                    h: 8,
                    w: 9,
                },
                {

                    x: 0,
                    y: 0,
                    h: 3,
                    w: 3,
                }
            ],
            widgets: [
                {
                    id: '0',
                    type: 'chart',
                    chartOptions: {
                        type: 'bar',
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
                        i: '0',
                        x: 0,
                        y: 0,
                        h: 8,
                        w: 9,
                    }
                },
                {
                    id: '1',
                    type: 'chart',
                    chartOptions: {
                        type: 'bar',
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
                        i: '1',
                        x: 0,
                        y: 0,
                        h: 8,
                        w: 9,
                    }
                },
                {
                    id: '2',
                    type: 'chart',
                    chartOptions: {
                        type: 'bar',
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
                        i: '2',
                        x: 0,
                        y: 0,
                        h: 8,
                        w: 9,
                    }
                },
            ],
            options: {
                chart: {
                    id: "basic-bar"
                },
                xaxis: {
                    categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
                }
            },
            series: [
                {
                    name: "series-1",
                    data: [30, 40, 45, 50, 49, 60, 70, 91]
                }
            ]
        };
    }
    generateChart = type => {
        let toR = {
            id: this.state.widgets.length.toString(),
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
                i: this.state.widgets.length.toString(),
                x: 0,
                y: 0,
                h: 8,
                w: 9,
            }
        };
        if (type === "donut") toR.data.series = toR.data.series[0].data;
        return toR;
    }
    addChart = type => {
        this.setState({ widgets: [...this.state.widgets, this.generateChart(type)] });
    }

    updateLayout = layout => {
        let widgets = [...this.state.widgets];
        layout.forEach(lay => {
            let index = widgets.findIndex(o => o.id === lay.i);
            widgets[index].layout = lay;
        });
        this.setState({ widgets: widgets });
        localStorage.setItem("dashboard", JSON.stringify(this.state.widgets));
    }
    componentDidMount() {
        if (localStorage.getItem("dashboard")) {
            let widgets = JSON.parse(localStorage.getItem("dashboard"));
            //this.setState({widgets:widgets});
        }
        if (localStorage.getItem("token")) {
            this.state.user = fetch("http://localhost:3001/login", {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    token: localStorage.getItem("token"),
                })
            })
                .then(r => r.json())
                .then(data => {
                    if (data.status != "OK") {

                        window.location.href = '/login';
                    }
                    this.setState({ user: data.user, auth: true });


                })
                .catch(err => {
                    // window.location.href = '/login';

                });
        } else {
            // window.location.href = '/login';
        }
    }

    render() {
        if (!this.state.auth) {
            return (<div style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }} className="HomeBody"><img src={logo} width='300' px></img></div>);
        }
        console.log("refresh state");

        return (

            <div className={"HomeBody " + (this.state.sideBarCollapse ? "collapsed" : "")}>
                <div className="sideBar">
                    <div className="collapseBtn" onClick={() => this.setState({ sideBarCollapse: !this.state.sideBarCollapse })}>
                        <FontAwesomeIcon icon={this.state.collapse ? faArrowAltCircleRight : faArrowAltCircleLeft} size='2x' />
                        <p>Collapse</p>

                    </div>
                    <div className="personalInfo">
                        <img src={userLogo} width='80px'></img>
                        <h1> {this.state.user.name}</h1>
                        <FormButton color='orange' label="Sign Out" onClick={this.logOut} ></FormButton>
                    </div>
                    <div className="Menus">
                        <div onClick={() => window.location.href='/home'} className="MenuItem">
                            <FontAwesomeIcon icon={faCalendar} />
                            <h3>Feed</h3>

                        </div>
                        <div onClick={() => window.location.href='/home/dashboard'} className="MenuItem">
                            <FontAwesomeIcon icon={faCalendar} />
                            <h3>Dashboard</h3>

                        </div>
                        <div onClick={() => window.location.href='/home/devices'} className="MenuItem">
                            <FontAwesomeIcon icon={faWifi} />
                            <h3>Devices</h3>

                        </div>
                        <div  className="MenuItem">
                            <FontAwesomeIcon icon={faBuilding} />
                            <h3 onClick={() => window.location.href='/home/usecases'}>Situation Center</h3>
                            <FontAwesomeIcon onClick={e => this.collapse('useCases')} icon={faArrowAltCircleDown} rotation={this.state.useCases ? 180 : 0}></FontAwesomeIcon>
                        </div>
                        <Collapse isOpened={this.state.useCases}>
                            <div onClick={() => window.location.href="/home/logistics"} className='ChildItem'>
                                <FontAwesomeIcon    icon={faTruck} />
                                <h3>Logistics</h3>
                            </div>
                            <div onClick={() => window.location.href="/home/editprofile"} className='ChildItem'>
                                <FontAwesomeIcon icon={faTree} />
                                <h3>Agriculture</h3>
                            </div>
                            <div onClick={() => window.location.href="/home/editprofile"} className='ChildItem'>
                                <FontAwesomeIcon icon={faHome} />
                                <h3>Home & Office</h3>
                            </div>
                            <div onClick={() => window.location.href="/home/editprofile"} className='ChildItem'>
                                <FontAwesomeIcon icon={faShoppingBag} />
                                <h3>Retail</h3>
                            </div>
                            <div onClick={() => window.location.href="/home/editprofile"} className='ChildItem'>
                                <FontAwesomeIcon icon={faUtensilSpoon} />
                                <h3>Restauraunts & Eateries</h3>
                            </div>
                        </Collapse>
                        <div onClick={() => window.location.href='/home/actions'} className="MenuItem">
                            <FontAwesomeIcon icon={faBolt} />
                            <h3>Actions</h3>

                        </div>
                        <div onClick={() => window.location.href='/home/devices'} className="MenuItem">
                            <FontAwesomeIcon icon={faClipboardList} />
                            <h3>Reports</h3>

                        </div>
                        <div onClick={() => window.location.href='/home/images'} className="MenuItem">
                            <FontAwesomeIcon icon={faFileImage} />
                            <h3>Images</h3>

                        </div>
                        <div onClick={e => this.collapse('collapseProfile')}  className="MenuItem">
                            <FontAwesomeIcon icon={faUserCircle} />
                            <h3>My Profile</h3>
                            <FontAwesomeIcon onClick={e => this.collapse('collapseProfile')} icon={faArrowAltCircleDown} rotation={this.state.collapseProfile ? 180 : 0}></FontAwesomeIcon>

                        </div>
                        <Collapse isOpened={this.state.collapseProfile}>
                            <div onClick={() => window.location.href="/home/editprofile"} className='ChildItem'>
                                <FontAwesomeIcon icon={faEdit} />
                                <h3>Edit Profile</h3>
                            </div>
                        </Collapse>

                    </div>
                </div>
                <div className="main">
                    <div className="header">
                        <div className="subHeader "></div>
                        <div className="subHeader center"><img src={logo} width='200px' /></div>
                        <div className="subHeader right"></div>
                    </div>
                    <div style={{ overflow: 'scroll' }} className={"content " + (this.state.loading ? "" : "")}>
                        <Router>
                            <Switch>
                                <Route path='/home/usecases' component = {UseCases}/>
                                <Route path='/home/images' component = {ImageView}/>
                                <Route path='/home/devices/:device' component={DeviceView}/>
                                <Route path='/home/devices' component={DevicesView}/>
                                <Route path='/home/editprofile' render={(props) => <MyProfileView user={this.state.user} {...props}/>}/>
                                <Route path='/home/actions' component = {Actions}/>
                                <Route path="/home/sensordetail" component = {SensorDetail}/>
                                <Route path='/home/logistics/detail' component={LogisticsDetail}/>
                                <Route path='/home/logistics' component={LogisticsView}/>
                                <Route path="/home/dashboard" component={DashboardView}/>
                                <Route path="/home" render={() => <AnalyticsFeed/>}/>
                            

                            </Switch>
                        </Router>
                    </div>
                </div>
            </div>
        );

    }
}