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

const images = [
  'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80',
  'https://images.unsplash.com/photo-1470341223622-1019832be824?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2288&q=80',
  'https://images.unsplash.com/photo-1448630360428-65456885c650?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2094&q=80',
  'https://images.unsplash.com/photo-1534161308652-fdfcf10f62c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2174&q=80'
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
