import React from 'react'
import styles from './Footer.css'

function Footer() {
    return (
        <div className='mainfooter'>
           
            <div className='container'>
                <div className='row'>
                   
                    {/*Column1*/}
                   
                    <div className='col-md-3 col-sm-6'>
                    <h6 className='mts'>FOR PR PROS </h6>
                        <ul className='list-unstyled'>
                            <li><a href=''>Overview</a></li>
                            <li><a href=''>Media Database</a></li>
                            <li><a href=''>Monitoring and Alerts</a></li>
                            <li><a href=''>Pitching</a></li>
                            <li><a href=''>Collaboration</a></li>
                            <li><a href=''>Reporting and Measurement</a></li>
                        </ul>
                    </div>
                    {/*Column2*/}
                   
                    <div className='col-md-3 col-sm-6'>
                    <h6>RESOURCES</h6>
                        <ul className='list-unstyled'>
                            <li><a href=''>Use Cases</a></li>
                            <li><a href=''>Webinars</a></li>
                            <li><a href=''>Guides and Demos</a></li>
                            <li><a href=''>Research</a></li>
                            <li><a href=''>Blog</a></li>
                            <li><a href=''>Trends</a></li>
                        </ul>
                    </div>
                    {/*Column3*/}
                   
                    <div className='col-md-3 col-sm-6'>
                    <h6>COMPANY</h6>
                        <ul className='list-unstyled'>
                            <li><a href=''>About</a></li>
                            <li><a href=''>Staff</a></li>
                            <li><a href=''>Careers</a></li>      
                        </ul>
                    </div>
                    {/*Column4*/}
                   
                    <div className='col-md-3 col-sm-6'>
                    <h6>CONTACT US</h6>
                   
                        <ul className='list-unstyled'>
                        
                            <li> <a href=''> 
                            <span class="fa-stack">
                            <i class="fa fa-question-circle fa-stack-1x"></i>
                            </span> Feedback/Support
                            </a></li>
                            <li> <a href=''> 
                            <span class="fa-stack">
                            <i class="fa fa-envelope fa-stack-1x"></i>
                            </span> analyticaiot.com
                            </a></li>
                            <li> <a href=''> 
                            <span class="fa-stack">
                            <i class="fa fa-twitter fa-stack-1x"></i>
                            </span> Twitter
                            </a></li>
                            <li> <a href=''> 
                            <span class="fa-stack">
                            <i class="fa fa-facebook fa-stack-1x"></i>
                            </span> Facebook
                            </a></li>
                            <li> <a href=''> 
                            <span class="fa-stack">
                            <i class="fa fa-phone fa-stack-1x"></i>
                            </span> 0900-78601
                            </a></li>
                           
                            
                          
                        </ul>
                    </div>
                </div>
                <div className='endfoot'>
                   
                          
                        
                            <p className='pl'>
                               Private Policy . Terms {'&'} Conditions
                            </p>

                        
                            <p className='pr'>
                                &copy; {new Date().getFullYear()} Analytica.IoT . All Rights Reserved
                            </p>


                  
                </div>
                
            </div> 
            
        </div>
    )
}
export default Footer