import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
      width: '100%;',
      minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

function TripCard(props) {
  const { classes } = props;

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
                {props.item.title}
            </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

TripCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TripCard);