import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const styles = theme => ({
  fab: {
    position: 'sticky',
    float: 'right',
    bottom: "10vw",
    right: '5vw'
  }
});

function AddPlaceBtn(props) {
  const { classes } = props;
  return (
      <Fab color="primary" aria-label="Add" className={classes.fab} onClick={props.onClick}>
        <AddIcon />
      </Fab>
    
  );
}

AddPlaceBtn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddPlaceBtn);