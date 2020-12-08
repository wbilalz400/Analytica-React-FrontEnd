import React from 'react';
import {PricingTable, PricingSlot, PricingDetail} from 'react-pricing-table';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import price from '../assets/images/pricing.jpg'
import styles from './Price.css'

function Price() {

 
    return (
    <div>
       
        <Navbar/>
        <img src={price} className='adjustPrice'/>
        <PricingTable  highlightColor='#1976D2'>
    <PricingSlot   buttonText='TRY IT FREE' title='FREE' priceText='$0/month'>
        <PricingDetail> <b>15</b> reports</PricingDetail>
        <PricingDetail> <b>5 GB</b> storage</PricingDetail>
        <PricingDetail> <b>5</b> devices</PricingDetail>
        <PricingDetail strikethrough> <b>Time tracking</b></PricingDetail>
    </PricingSlot>
    <PricingSlot  buttonText='SIGN UP' title='BASIC' priceText='$24/month'>
        <PricingDetail> <b>35</b> reports</PricingDetail>
        <PricingDetail> <b>15 GB</b> storage</PricingDetail>
        <PricingDetail> <b>Unlimited</b> devices</PricingDetail>
        <PricingDetail> <b>Time tracking</b></PricingDetail>
    </PricingSlot>
    <PricingSlot   buttonText='SIGN UP' title='PROFESSIONAL' priceText='$99/month'>
        <PricingDetail> <b>100</b> reports</PricingDetail>
        <PricingDetail> <b>30 GB</b> storage</PricingDetail>
        <PricingDetail> <b>Unlimited</b> devices</PricingDetail>
        <PricingDetail> <b>Time tracking</b></PricingDetail>
    </PricingSlot>
    <PricingSlot buttonText='SIGN UP' title='ENTERPRISE' priceText='$200/month'>
        <PricingDetail> <b>Unlimited</b> reports</PricingDetail>
        <PricingDetail> <b>75 GB</b> storage</PricingDetail>
        <PricingDetail> <b>Unlimited</b> devices</PricingDetail>
        <PricingDetail> <b>Time tracking</b></PricingDetail>
    </PricingSlot>
</PricingTable>
        <Footer/>
    </div> 
    )
  }

export default Price
