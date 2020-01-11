import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import $ from 'jquery';
import Api from '../../../Api.js';

export class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      coordinates: [

      ]
    }
  }
  
  render () {

    const mapStyles = {
      width: '80%',
      height: '80%',
    };

    return (
      <div>
        <Map
            google={this.props.google}
            zoom={10}
            style={mapStyles}
            initialCenter={{ lat: 39.000, lng: -120.0324}}
          >
            <Marker position={{lat:38.6848, lng: -120.0652}} />
          </Map>
      </div>
      )
  }
}


export default GoogleApiWrapper({
  apiKey: Api.apiKey
})(MapContainer);