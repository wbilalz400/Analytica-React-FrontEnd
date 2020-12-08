import React from 'react'
import img2 from '../../assets/images/play.png'
import './card-style.css'
const CardUI = props => {
    return (
        <div className="card text-center">
            <div className="overflow" >
                <img src={props.imgsrc} alt=""  className="card-img-top"/>
            </div>
            <div className='card-body text-dark'>

                <a href ="link" >
                <div class="cardimg" >
      
                 <p className='card-title'> Watch Video <img src ={img2} /></p>
                </div>
                </a>
                
                <p className='card-text text-secondary'>
                    {props.title}
                </p>
                <button className="btn btn-outline-danger">Open on YouTube <i class="fa fa-youtube-play"></i></button>
                
               
            </div>
        </div>
    )
}
export default CardUI;