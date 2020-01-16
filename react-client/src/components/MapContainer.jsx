import React from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import Api from '../../../Api.js';

export class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
    };
    this.markers = this.markers.bind(this);
    this.onMapClicked = this.onMapClicked.bind(this);
    this.onMarkerClick = this.onMarkerClick.bind(this);
  }

  markers() {
    return this.props.resorts.map((resort, index) => {
      return <Marker key={index} id={resort.name} position={{
        lat: resort.latitude,
        lng: resort.longitude
      }} label={(index + 1).toString()}
      snowFall={resort.totalSnowfall}
      chanceOfSnow={resort.chanceOfSnow}
      url={resort.snowReportUrl}
      webcam={resort.webcamUrl}
      name={resort.name}
      onClick={this.onMarkerClick} />
    })
  }
  
  onMarkerClick(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }
 
  onMapClicked(props) {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  render () {

    const mapStyles = {
      width: '60%',
      height: '70%',
      border: '1px solid',
      color: 'black'
    };

    return (
      <div>
        <Map
            google={this.props.google}
            zoom={9.5}
            style={mapStyles}
            initialCenter={{ lat: 39.000, lng: -120.0324}}
            onClick={this.onMapClicked}
          >
            {this.markers()}
            <InfoWindow 
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow} >
                <div>
                  <h1 id='info'>
                    {this.state.selectedPlace.name}
                  </h1>
                  <div>
                    <b>
                    Total Snow Fall: {this.state.selectedPlace.snowFall} cm
                    </b>
                  </div>
                  <div>
                    <b>
                      Percent Chance of Snow: {this.state.selectedPlace.chanceOfSnow}%
                    </b>
                  </div>
                  <div>
                    <a href={this.state.selectedPlace.url} >Snow Report</a>
                  </div>
                  <div>
                    <a href={this.state.selectedPlace.webcam} >Webcams</a>
                  </div>
                </div>
            </InfoWindow>
        </Map>
      </div>
      )
  }
}


export default GoogleApiWrapper({
  apiKey: Api.apiKey
})(MapContainer);