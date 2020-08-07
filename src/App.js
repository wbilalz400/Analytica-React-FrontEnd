import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar'
import Slider from './components/Slider'
import Card from './components/Cards/Cards'
import Covid from './components/Covid19/Covid19'
import Footer from './components/Footer'
import Build from './components/Build'
import CVB from './components/CVB'
import slide1 from './assets/images/slide1.jpg'
import slide2 from './assets/images/slide2.jpg'
import slide3 from './assets/images/slide3.jpg'
import slide4 from './assets/images/slide4.jpg'

const images = [
  slide1,
  slide2,
  slide3,
  slide4,
  
]

function App() {
  return (
    <div className="HomeMain">
      <Navbar/>
      <Slider slides={images} autoplay={2}/>   
      <Build/>
      <Card/>
      <Covid/>
      <CVB/>
      
      <Footer/>
      
       
    </div>
   
  );
}

export default App;
