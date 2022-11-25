import React, { Component } from 'react';
import { GoogleMap, MarkerF } from '@react-google-maps/api';
import LoadScriptOnlyIfNeeded from "./LoadScriptOnlyIfNeeded";
import Swal from "sweetalert2"

let isDraggable = true;

const containerStyle = {
  width: '90%',
  height: '30em',
};

let center = {
  lat: -32.317109,
  lng: -58.080587
};

const onLoad = marker => {}

const position = {
  lat: -32.317109,
  lng: -58.080587
}

class MyComponents extends Component {

  render() {

    return (
      <LoadScriptOnlyIfNeeded
        googleMapsApiKey="AIzaSyBTdHYJ8JAS3y0bxq6pRB98KDHrIxXXwNU"
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={this.props.latlng ? this.props.latlng : position}
          zoom={15}
          clickableIcons={false}
          options= {{streetViewControl:false, minZoom:14}}
          
        >

          { /* Child components, such as markers, info windows, etc. */ }
            <MarkerF
            onLoad={onLoad}
            position={((this.props.latlng) ? this.props.latlng : position)}
            draggable={this.props.isEditable}
            onDragEnd={(e) => {
              this.props.lat(e.latLng.lat()) 
              this.props.lng(e.latLng.lng())}}
            />

          <></>
        </GoogleMap>
      </LoadScriptOnlyIfNeeded>
    )
  }
}

export default MyComponents;