import React from 'react'
import Navbar from '../components/Navbar'
import styles from './About.css'
import comsats from '../images/comsats.jpg'
import Footer from '../components/Footer'
import me from '../assets/images/me.jpg'
import billu from '../assets/images/c6.jpg'
import sir from '../assets/images/c5.jpg'
import w1 from '../assets/images/w1.png'
import w2 from '../assets/images/w2.png'
import w3 from '../assets/images/w3.png'

function About() {
    return (
        <div className='mainab'>
            <Navbar/>
           
            <img className='myTeam' src={comsats} alt=''/>
            <h1 className='adjust1'>Enabling information</h1>
            <h1 className='adjust2'>and time enrichment</h1>
            <div className='ourTeam'>
                <div className='ourTeam2'>
                <div className='flip'>
                <h5 className='bcard'>Analytica.IoT - Analaytics from IoT</h5>
                <p className='bcard'>An IoT based Analytics Engine destined to perform analytics from the obtained data of your IoT devices.
                </p>
                 <div className='flippingcard'>
                    <div class="flip-card">
                        <div class="flip-card-inner">
                        <div class="flip-card-front">
                        <img src={w3} alt="Avatar" />
                        <div className='onCard'>Analytics - Charts - Reporting</div>
                        </div>
                        <div class="flip-card-back">
                            <p>Visualizing your data coming from your devices.
                                Representing them in a vast variety of ways using 
                                different charts. Using the collected data to perform 
                                useful analytics and generate reports.</p> 
                            <p>Why wait? Let's Go &#128512;</p>
                        </div>
                        </div>
                    </div>
                        <div class="flip-card">
                        <div class="flip-card-inner">
                            <div class="flip-card-front">
                            <img src={w1} alt="Avatar" />
                            <div className='onCard'>Use Cases</div>
                            </div>
                            <div class="flip-card-back">
                           
                            <p>A set of industrial use cases have been established. Connect your device
                                and let the system perform it's wonders. Through the incoming data and the selected use case
                                a powerful algorithm run at the backend providing with useful analytics. Ensuring usefulness
                                and proficient.</p> 
                            <p>Still Here? Hurry Up &#128578;</p>
                            </div>
                        </div>
                        </div>
                        <div class="flip-card">
                        <div class="flip-card-inner">
                            <div class="flip-card-front">
                            <img src={w2} alt="Avatar" />
                            <div className='onCard'>Best Possible UX</div>
                            </div>
                            <div class="flip-card-back">
                           
                            <p>Providing the best customization features. Allowing to add the desired widgets for data display.
                                Dashboard with draggable widgets along with the feature of adding multiple dashboards. Maintaining
                                the state of users' dashboards.</p> 
                            <p>Better Late Than Never &#x1F604;</p>
                            </div>
                        </div>
                        </div>
                </div>

                </div>
              
                <h2 >Meet Our Team</h2>
                </div>
                <p>Analytica.IoT is a team of extremely skillfull computer scientist who are working hard to give you the best UX and Analytics</p>
            
                
            <div className='teamContainer'>
            <div class="container1">
                <img src={sir} alt="Avatar" class="image"/>
                <h2>Dr. Sohail Asghar</h2>
                <h4>Chairman / Supervisor</h4>
                <div class="overlay">
                <div class="text">Professor & Chairman of Computer Science at COMSATS University Islamabad. 
              Teacher and Researcher in Data Mining (including structural Learning, Classification, and Privacy Presevation in Data Ming, Text and Web Mining), 
              Big Data Analytics, Data Science and Information Technology areas, and he has published extensively (More than 150 publications) 
              in international journals as well as conference proceedings. </div>
                </div>
            </div>
            <div class="container1">
                <img src={me} alt="Avatar" class="image"/>
                <h2>Aamir Afzal</h2>
                <h4>Full Stack Developer</h4>
                <div class="overlay">
                <div class="text">Computer Scientist - Expert in Machine Learning & Data Science. 
                React full stack developer with expertise in Mongo & Express. Known language - Python, Java, C++, Javascript.
                Motive - Combining both the analytical skills, problem solving technique with modern ways of recognizing patterns
                through the art of data science and machine learning with the assistance of modern methodologies such as Cloud Computing  </div>
                </div>
            </div>
            <div class="container1">
                <img src={billu} alt="Avatar" class="image"/>
                
                <h2>Bilal Zahid</h2>
                <h4>Full Stack Developer</h4>
               
                <div class="overlay">
                <div class="text">Computer Scientist - Expert in Machine Learning & Data Science. 
                React full stack developer with expertise in Mongo & Express. Known language - Python, Java, C++, Javascript.
                Motive - Combining both the analytical skills, problem solving technique with modern ways of recognizing patterns
                through the art of data science and machine learning with the assistance of modern methodologies such as Cloud Computing 
                 </div>
                </div>
            </div>

             
            </div>
            </div>
           
           
            <div className='aboutFooter'>
            <Footer/>
            </div>
           
        </div>
    )
}
export default About
