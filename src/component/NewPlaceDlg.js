import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import SimpleMap from './SImpleMap';
import LocationInput from './LocationInput';
import DatetimePicker from './DatetimePicker';

const styles = {
  root: {
    margin: 30,
  },
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },

};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class NewPlaceDlg extends React.Component {

    state={
        title: "",
        lat: 32.881,
        lng: -117.237,
        startt: Date.now(),
        endt: Date.now() + 3600000,
    };

    setLocation = (address, lat, lng) => {
        this.setState({
            title:address,
            lat:lat,
            lng:lng,
        });
    }

    setStartTime = (date) => {
        this.setState({
            startt:date,
        })
    }

    setEndTime = (date) => {
        this.setState({
            endt:date,
        })
    }

    handleClose = () => {
        this.props.onClose(
            {
                title: this.state.title,
                la: this.state.lat,
                long: this.state.lng,
                startt: new Date(this.state.startt).toISOString(),
                endt: new Date(this.state.endt).toISOString(),
            }
        );
    }

  render() {
    const { classes } = this.props;
    setTimeout(()=>{
        //this.props.handleClose();
    }, 1000);
    //console.log(this.state.startt, this.state.endt);

    return (
        <Dialog
          fullScreen
          open={this.props.open}
          onClose={this.props.onClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton color="inherit" onClick={this.props.onClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" className={classes.flex}>
                Add Place to Trip
              </Typography>
              <Button color="inherit" onClick={this.handleClose}>
                SAVE
              </Button>
            </Toolbar>
          </AppBar>

          <SimpleMap
            key={this.state.lng}
            center={{
                lat:this.state.lat,
                lng:this.state.lng,
            }}
          ></SimpleMap>

          <LocationInput
            //address={this.title}
            setLocation={this.setLocation}
          ></LocationInput>

          <DatetimePicker
            date={this.state.startt}
            setTime={this.setStartTime}
            datePickerText="Start date"
            timePickerText="Start time"
          ></DatetimePicker>
          <DatetimePicker
            date={this.state.endt}
            setTime={this.setEndTime}
            datePickerText="End date"
            timePickerText="End time"
          ></DatetimePicker>

        </Dialog>
    );
  }
}

NewPlaceDlg.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NewPlaceDlg);