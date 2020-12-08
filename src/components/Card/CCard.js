import React from 'react'
import styles from './CCard.module.css';
import {Card, CardContent, Typography, Grid} from '@material-ui/core';
import CountUp from 'react-countup';
import cx from 'classnames';


const CCard = ({data: {confirmed, recovered, deaths, lastUpdate}}) => {
    console.log(confirmed);
    if(!confirmed){
        return "LOADING........"
    }

    return (
        <div className={styles.container}>
            <Grid container spacing={3} justify="center">
                <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.active)}>
                    <Card>
                        <Typography color="textSecondary" gutterBottom>Infected</Typography>
                        <Typography variant="h5">
                            <CountUp start={0} end={confirmed.value} duration={3.5} separator = ',' />
                        </Typography>
                        <Typography color="textSecondary">{new Date(lastUpdate).toDateString()}</Typography>
                        <Typography variant="body2">Total Number of Active Cases of Covid'19</Typography>
                    </Card>

                </Grid>

                <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.recovered)}>
                    <Card>
                        <Typography color="textSecondary" gutterBottom>Recovered</Typography>
                        <Typography variant="h5">
                        <CountUp
                             start={0} end={recovered.value} duration={3.5} separator = ','/>
                        </Typography>
                        <Typography color="textSecondary">{new Date(lastUpdate).toDateString()}</Typography>
                        <Typography variant="body2">Total Number of Recovered Cases of Covid'19</Typography>
                    </Card>

                </Grid>

                <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.deaths)}>
                    <Card>
                        <Typography color="textSecondary" gutterBottom>Deaths</Typography>
                        <Typography variant="h5">
                        <CountUp start={0} end={deaths.value} duration={3.5} separator = ','/>
                        </Typography>
                        <Typography color="textSecondary">{new Date(lastUpdate).toDateString()}</Typography>
                        <Typography variant="body2">Total Number of Death Cases of Covid'19</Typography>
                    </Card>

                </Grid>

            </Grid>
        </div>
    )
}
export default CCard
