import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './index.css';
import App from './App';
import LoginView from './views/LoginView'
import Slider from './components/Slider'
import RegisterView from './views/RegisterView'
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomeView from './views/HomeView';
import Card from './components/Cards/Cards'
import Covid from './components/Covid19/Covid19'
import About from './sections/About'
import Navbar from './components/Navbar'
import PriceTable from './sections/Price'
import Img from './views/Images';
import remedies from './Card/CardUI.js'



ReactDOM.render(
  <React.StrictMode>
  <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />
  <Router>
    <Switch>
      <div>
      <Route exact path="/" component={App}/>
      <Route exact path="/remedies" component={remedies}/>
        <Route exact path="/about" component={About}/>
        <Route exact path="/price" component={PriceTable}/>
        <Route exact path="/login" component={LoginView}/>
        <Route exact path="/register" component={RegisterView}/>
        <Route  path="/home" component={HomeView}/>
      
       


      </div>
    </Switch> 
  </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
/**
 *  
 
 */