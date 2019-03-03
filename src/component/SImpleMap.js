import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { withStyles } from '@material-ui/core/styles';
import pin from '../pin2.svg';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const MyPin = () => <div><img width="100px" height="100px" id="mypppp" src={pin} alt="pin" /></div>;

const styles=  {
    simpleMap: {
        height: "60vh",
        width: "100vw",
        minHeight: 300,
        maxHeight: 600,
    },
};

class SimpleMap extends Component {
  render() {
    return (
      // Important! Always set the container height explicitly
      <div className={this.props.classes.simpleMap}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "" }}
          defaultCenter={this.props.center}
          defaultZoom={15}
        >
          <MyPin
            lat={this.props.center.lat}
            lng={this.props.center.lng}
            text="UCScamDiego"
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default withStyles(styles)(SimpleMap);