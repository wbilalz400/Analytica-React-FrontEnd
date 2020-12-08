import React, { Component } from 'react'
import CardUI from './CardUI';
import img1 from '../../assets/images/c1.jpg';
import img2 from '../../assets/images/c2.jpg';
import img3 from '../../assets/images/c3.jpg';
import img4 from '../../assets/images/c4.jpg';

class Cards extends Component{

    render(){
        return(
            <div className=" CardsMain container-fluid d-flex justify-content-center">
                <div className="row">
                    <div className="col-md-3">
                    <CardUI imgsrc={img1} title={"How to create your custom Dashboards"}/>
                    </div>
                    <div className="col-md-3">
                    <CardUI imgsrc={img2} title={"How to add Widgets to your Dashboard"}/>
                    </div>
                    <div className="col-md-3">
                    <CardUI imgsrc={img3} title={"How to Add devices to your Dashboard"}/>
                    </div>
                    <div className="col-md-3">
                    <CardUI imgsrc={img4} title={"Perform your desired Analytics"}/>
                    </div>
                </div>
                
            </div>
        );
    }
}
export default Cards;