import React from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';


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

function PlaceCard(props) {
    const { classes } = props;



    let uberDeepLink = null;
    let uberEmbedded = null;
    if(!props.isCurr) {
        let link = props.buildDeepLink(props.place);
        uberDeepLink = <Button href={link} variant="outlined" color="primary">Go to Uber</Button>
        uberEmbedded = <Button href='#' variant="outlined" color="secondary" onClick={props.startInstantRide}>Instant Ride</Button>
    }

  
    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            ({props.place.la}, {props.place.long})
          </Typography>
          <Typography variant="h5" component="h2">
            {props.place.title}
            <IconButton aria-label="Delete" onClick={props.deletePlace}>
                <DeleteIcon className={classes.icon} />
            </IconButton>
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {props.place.startt} - {props.place.endt}
          </Typography>
        </CardContent>
        <CardActions>
            {uberDeepLink}
            {uberEmbedded}
        </CardActions>
      </Card>
    );
}
  
PlaceCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PlaceCard);
