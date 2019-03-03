import React from 'react';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import { withStyles } from '@material-ui/core/styles';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

const styles = {
    root: {
      padding: '2px 4px',
      margin: '20px 10vw',
      display: 'flex',
      alignItems: 'center',
    },
    input: {
      marginLeft: 8,
      flex: 1,
    },
}

class LocationInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: '' };
  }

  handleChange = address => {
    this.setState({ address:address });
  };

  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
          this.handleChange(address);
          this.props.setLocation(address, latLng.lat, latLng.lng);
          console.log('Success', address, latLng);
        })
      .catch(error => console.error('Error', error));
  };

  render() {
    const { classes } = this.props;
    let cname = [classes.input, 'location-search-input'].join(' ');

    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <Paper className={classes.root} elevation={1}>
                <InputBase {...getInputProps({className: cname, placeholder: "Search Google Maps"})}  />
            </Paper>
            
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}

export default withStyles(styles)(LocationInput);