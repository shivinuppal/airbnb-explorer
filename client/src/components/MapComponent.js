import React, { Component } from 'react'
import SearchBoxMap from './Map'
//import Component from 'react-compo'
class MapComponent extends Component {
    render() {
      return(
          <SearchBoxMap
       google={this.props.google}
       center={{lat: 47.6204, lng: -122.3367}}
       height='300px'
       zoom={15}
      />
        )
    }
  }
  export default MapComponent
//  export default GoogleApiWrapper({
//	apiKey: 'AIzaSyAEQxbsOaMUqLssMg8VydzIrATb6Et0dus'
  //})(MapContainer);