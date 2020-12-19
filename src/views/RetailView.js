import React, { useState, useEffect } from 'react';
import './LogisticsView.css';
//import { Paper } from '@material-ui/core';
//import truckIcon from '../assets/images/truck.svg';
import { FarmItem, RetailItem } from './AnalyticsFeed';
import { getFarms, getRetails } from '../api';
import Skeleton from 'react-loading-skeleton';

const RetailView = props => {

    const [retails, setRetails] = useState([]);

    const fetchRetails = () => {
        getRetails().then(res => {
            if (res.data.success) {
                setRetails(res.data.retails);
            }
            else {
                alert(res.data.message);
            }
        }).catch(e => console.error(e));
    }

    useEffect(() => {
        setTimeout(fetchRetails, 3000);
    }, []);

    return <div className="LogisticsMain">
        <div className="Heading">
            <h3>Retail Outlets</h3>

            <div>

            </div>

        </div>

        {retails?.length !== 0 ? retails.map(retail => [<RetailItem
            name={retail.retail.name}
            temp={retail.temperature}
            sales={retail.productsSold}
            customer={retail.customers}
        />, <a style={{ marginLeft: 'auto', marginRight: 10 }} href={"/home/retail/" + retail.retail._id}>View Details</a>
        ]) : <Skeleton height={100} width={1000} count={5} />}

        <div onClick={() => window.location.href = "/home/retail/add"} className="addIcon">
            <span >+</span>
        </div>



    </div>
}

export default RetailView;