import React from 'react'
import CrownBorer from '../views/PestImages/CrownBorer.jpg'
import './CardUI.css'
import pests from '../pests'
const Card = props => {
    return(
        <div class="row" style={{background: "blue",padding:"20px"}}>
    {pests.map(function(pest){
    return (
       

        
          <div class="column">
            <div class="card" style={{background: "rgb(255, 255, 255)"}}>
              <img src={pest.pic} alt="Jane" style={{width:"100%"}}/>
              <div class="container" style={{background: "rgb(255, 255, 255)"}}>
                <h2 style={{color: "black"}}>{pest.name}</h2>
                <p style={{color: "red"}} class="title"><strong>Cultural Control</strong></p>
                <div>
                {pest.remedies.managamentCultural.map(item => <li style={{color: "purple"}}>{item} </li> )}   
                </div>
                <p style={{color: "red"}}class="title"><strong><strong>Chemical Control</strong></strong></p>
                <div>
                {pest.remedies. managementChemical.map(item => <li style={{color: "purple"}}>{item} </li> )}   
                </div>
                <p></p>
              </div>
            </div>
          </div>
     
            
         
    )
                })}
                </div>
    )
            
         
    
}

export default Card;
