import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';


import TripCard from './TripCard.js';

const styles = theme => ({
  root: {
    width: '100%',
    minWidth: 300,
    maxWidth: 1360,
    backgroundColor: '#eeeeee',
  },
});

function TripList(props) {
  const { classes } = props;
  return (
      <div>
        <List component="ul" className={classes.root}>
            {
                props.listItems.map(item => {
                    let link = `/trip/${item.id}`;
                    return <ListItem key={item.id}>
                                <a href={link}>
                                    <TripCard item={item}/>
                                </a>
                        </ListItem>
                })
            }
        </List>
      </div>
  );
}

TripList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TripList);