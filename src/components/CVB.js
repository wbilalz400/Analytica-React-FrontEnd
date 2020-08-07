import React from 'react';

import cvb1 from '../assets/images/cvb1.jpg'
import cvb2 from '../assets/images/cvb2.png'
import cvb3 from '../assets/images/cvb3.png'
import styles from './CVB.css'


function CVB() {
  return(
  <div className='flippingcard'>
                    <div class="flip-card">
                        <div class="flip-card-inner">
                        <div class="flip-card-front">
                        <img src={cvb1} alt="Avatar" className="cvb1img"/>
                        <div className='onCard'>Device Connection</div>
                        </div>
                        <div class="flip-card-back">
                            <p>Connect your IoT devices to the website framework. All the Linux based 
                              IoT devices can be connected. The connection requires a mini application 
                              to be installed at the user end.</p> 
                            <p>Why wait? Let's Go &#128512;</p>
                        </div>
                        </div>
                    </div>
                        <div class="flip-card">
                        <div class="flip-card-inner">
                            <div class="flip-card-front">
                            <img src={cvb2} alt="Avatar" className="cvb1img"/>
                            <div className='onCard'>Condition Actions</div>
                            </div>
                            <div class="flip-card-back">
                           
                            <p>Create a set of events based on your device data. 
                              Set terms and conditions that is define a threshold 
                              above or below which the user will recieve notifications.</p> 
                            <p>Still Here? Hurry Up &#128578;</p>
                            </div>
                        </div>
                        </div>
                        <div class="flip-card">
                        <div class="flip-card-inner">
                            <div class="flip-card-front">
                            <img src={cvb3} alt="Avatar" className="cvb1img"/>
                            <div className='onCard'>Visualize and Analyze</div>
                            </div>
                            <div class="flip-card-back">
                           
                            <p>Represent your data through the built in widgets. Edit and 
                              customize the widgets. Trace out meanigful and useful data. Download 
                              the widget data. Use the analytics features to gain insight about
                              the usefulness of your data.</p> 
                            <p>Better Late Than Never &#x1F604;</p>
                            </div>
                        </div>
                        </div>
                </div>

    
    
  )
}
export default CVB