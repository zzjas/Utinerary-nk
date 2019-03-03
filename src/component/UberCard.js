import React from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {cancelRide} from '../utils/Uber.js';

const styles = {
    card: {
        width: '100%',
        minWidth: 275,
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
};

class UberCard extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            request_id: '',
            status: 'Requesting...',
            fare: 'Not ready',
            duration_estimate: 'Not ready',
            pickup_estimate: 'Not ready',
            license_plate: 'Not ready',
            driver_name: 'Not ready',
            driver_phone: 'Not ready'

        }
        //this.props.sendRequest(this.props.data, this.updateRequest);
    }

    updateRequest(newState) {
        this.setState(newState);
    }


    render() {
        const { classes } = this.props;
    
        return (
            <Card className={classes.card}>
                <CardContent>
                <Typography className={classes.title} color="textSecondary" variant="h5" component="h2" gutterBottom>
                    {this.state.status}
                </Typography>
                <Typography variant="h5" component="h2">
                    License: {this.state.license_plate}
                </Typography>

                <Typography className={classes.title} color="textSecondary" variant="h5" component="h2" gutterBottom>
                    Driver: {this.state.driver_name} -- ({this.state.driver_phone})
                </Typography>

                <Typography className={classes.pos} color="textSecondary">
                    Pickup ETA: {this.state.pickup_estimate} <br />
                    Dropoff ETA: {this.state.duration_estimate} <br />
                    Fare: {this.state.fair}
                </Typography>
                </CardContent>

                <CardActions>
                    <Button variant="outlined" color='secondary' onClick={()=>{
                        this.props.closeInstantRide();
                        if(this.state.request_id !== '') {
                            console.log(this.state.request_id);
                            cancelRide(this.state.request_id);
                        }
                    }}>Cancel</Button>
                </CardActions>
            </Card>
            );

    }
}
  
UberCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UberCard);