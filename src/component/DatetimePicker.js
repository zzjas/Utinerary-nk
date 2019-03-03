import 'date-fns';
import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';

const styles = {
  root: {
    margin: "20px 10vw",
  },
  grid: {
    width: '100%',
  },
};

class DatetimePicker extends React.Component {
  state = {
    // The first commit of Material-UI
    selectedDate: new Date('2014-08-18T21:11:54'),
  };

  handleDateChange = date => {
    //this.setState({ selectedDate: date });
    this.props.setTime(date);
    console.log(this.props.datePickerText, date);
  };

  render() {
    const { classes } = this.props;
    const { selectedDate } = this.state;

    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container className={classes.grid} justify="space-around">
          <DatePicker
            margin="normal"
            label={this.props.datePickerText}
            value={this.props.date}
            onChange={this.handleDateChange}
          />
          <TimePicker
            margin="normal"
            label={this.props.timePickerText}
            value={this.props.date}
            onChange={this.handleDateChange}
          />
        </Grid>
      </MuiPickersUtilsProvider>
    );
  }
}

DatetimePicker.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DatetimePicker);