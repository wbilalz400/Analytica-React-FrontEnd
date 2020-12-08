import React from 'react'
import build from '../images/build.png'
import styles from './Build.css'
function Build() {
    return (
        <div className='full'>
           <div className='rowf'>
               <div className='col11'>
                   <img  className='imgbuild' src={build}></img>

               </div>
               <div className='col22'>
               <h1><i class="fa fa-line-chart"></i><i class="fa fa-bar-chart" aria-hidden="true"></i><i class="fa fa-pie-chart" aria-hidden="true"></i><i class="fa fa-area-chart" aria-hidden="true"></i></h1>
                   <h2>Create Your Custom Dashboards</h2>
                   <h4 className='norm'>Add Widgets</h4>
                   <p>Use multiple Use Cases and perform the desired Analytics.
                   Perform statistics and visualize data to 
                       see trends and extract out meaningful patterns. </p>
                       
                  <input type='button' value='Get Started' className='start'/>
               </div>
           </div>
        </div>
       
    )
}
export default Build
