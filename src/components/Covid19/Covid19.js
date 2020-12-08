import React from 'react'

import CountryPicker from '../CountryPicker/CountryPicker';
import Cards from '../Card/CCard';
import Chart from '../Charts/Chart';
import styles from './Covid19.module.css'
import {fetchData} from '../../api';

import corona from '../../images/covid.png';


class Covid19 extends React.Component{
    state = {
        data:{},
        country: '',
    }

    async componentDidMount (){
        const fetchedData = await fetchData();
        
        this.setState({data:fetchedData});
    }

    handleCountryChange = async (country) => {
        const fetchedData = await fetchData(country);

        this.setState({ data: fetchedData , country: country});
    }
    render(){
        const {data, country} = this.state;
        return(
        <div className={styles.container}>
            <img className={styles.imafe} src={corona} alt='COVID19'/>
            <Cards data={data}/>
            <CountryPicker handleCountryChange={this.handleCountryChange}/>
            <Chart data={data} country={country}/>
               
                
        </div>
        )
    }
}
export default Covid19