


import React from 'react'
import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker } from "react-google-maps";
import Autocomplete from 'react-google-autocomplete';
import Geocode from "react-geocode";
Geocode.setApiKey("AIzaSyAEQxbsOaMUqLssMg8VydzIrATb6Et0dus");
Geocode.enableDebug();


class SearchBoxMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',

      mapPosition: {
        lat: this.props.center.lat,
        lng: this.props.center.lng
      },
      markerPosition: {
        lat: this.props.center.lat,
        lng: this.props.center.lng
      }
    }
  }
  /**
    * Get the current address from the default map position and set those values in the state
    */
  componentDidMount() {
    Geocode.fromLatLng(this.state.mapPosition.lat, this.state.mapPosition.lng).then(
      response => {
        const address = response.results[0].formatted_address;//,


        this.setState({
          address: (address) ? address : '',
        })
      },
      error => {
        console.error(error);
      }
    );
  };
  /**
    * Component should only update ( meaning re-render ), when the user selects the address, or drags the pin
    *
    * @param nextProps
    * @param nextState
    * @return {boolean}
    */
  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.state.markerPosition.lat !== this.props.center.lat ||
      this.state.address !== nextState.address
    ) {
      return true
    } else if (this.props.center.lat === nextProps.center.lat) {
      return false
    }
  }

  /**
    * And function for city,state and address input
    * @param event
    */
  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  /**
    * This Event triggers when the marker window is closed
    *
    * @param event
    */
  onInfoWindowClose = (event) => {
  };
  /**
    * When the user types an address in the search box
    * @param place
    */
  onPlaceSelected = (place) => {
    const address = place.formatted_address,
      latValue = place.geometry.location.lat(),
      lngValue = place.geometry.location.lng();
    this.props.handleLatChange(latValue);
    this.props.handleLongChange(lngValue);
    // Set these values in the state.
    this.setState({

      address: (address) ? address : '',
      markerPosition: {
        lat: latValue,
        lng: lngValue
      },
      mapPosition: {
        lat: latValue,
        lng: lngValue
      },
    })
  };
  /**
    * When the marker is dragged you get the lat and long using the functions available from event object.
    * Use geocode to get the address, city, area and state from the lat and lng positions.
    * And then set those values in the state.
    *
    * @param event
    */
  onMarkerDragEnd = (event) => {
    console.log('event', event);
    let newLat = event.latLng.lat(),
      newLng = event.latLng.lng();
    Geocode.fromLatLng(newLat, newLng).then(
      response => {
        const address = response.results[0].formatted_address;
        this.props.handleLatChange(newLat);
        this.props.handleLongChange(newLng);

        this.setState({
          address: (address) ? address : '',

          markerPosition: {
            lat: newLat,
            lng: newLng
          },
          mapPosition: {
            lat: newLat,
            lng: newLng
          },
        })
      },
      error => {
        console.error(error);
      }
    );
  };
  render() {
    const AsyncMap = withScriptjs(
      withGoogleMap(
        props => (
          <GoogleMap google={this.props.google}
            defaultZoom={this.props.zoom}
            defaultCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
          >
            {/* For Auto complete Search Box */}
            <Autocomplete
              style={{
                width: '100%',
                height: '40px',
                paddingLeft: '16px',
                marginTop: '2px',
                marginBottom: '100px'
              }}
              onPlaceSelected={this.onPlaceSelected}
              types={[]}
              componentRestrictions={{ country: "us" }}
            />
            {/*Marker*/}
            <Marker google={this.props.google}
              name={'Dolores park'}
              draggable={true}
              onDragEnd={this.onMarkerDragEnd}
              position={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng }}
            />
            <Marker />
            {/* InfoWindow on top of marker */}
            <InfoWindow
              onClose={this.onInfoWindowClose}
              position={{ lat: (this.state.markerPosition.lat + 0.0018), lng: this.state.markerPosition.lng }}
            >
              <div>
                <span style={{ padding: 0, margin: 0 }}>{this.state.address}</span>
              </div>
            </InfoWindow>
          </GoogleMap>
        )
      )
    );
    let map;
    if (this.props.center.lat !== undefined) {
      map = <div>

        <AsyncMap
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAEQxbsOaMUqLssMg8VydzIrATb6Et0dus&libraries=places"
          loadingElement={
            <div style={{ height: `100%` }} />
          }
          containerElement={
            <div style={{ height: this.props.height }} />
          }
          mapElement={
            <div style={{ height: `100%` }} />
          }
        />
      </div>
    } else {
      map = <div style={{ height: this.props.height }} />
    }
    return (map)
  }
}
export default SearchBoxMap
//  export default GoogleApiWrapper({
//	apiKey: 'AIzaSyAEQxbsOaMUqLssMg8VydzIrATb6Et0dus'
  //})(MapContainer);
