import React, { Component } from 'react';
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api';

let savedPosition

const setSavedPosition = (e) => {
    const lat = e.lat()
    const lng = e.lng()
    savedPosition = { "lat":lat, "lng":lng }
    console.log(savedPosition)
}



const containerStyle = {
  width: '30em',
  height: '30em'
};

let center = {
  lat: -32.317109,
  lng: -58.080587
};

const onLoad = marker => {
  console.log('marker: ', marker)
}

const position = {
  lat: -32.317109,
  lng: -58.080587
}

class MyComponents extends Component {

  render() {

    return (
      <LoadScript
        googleMapsApiKey=""
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={15}
          clickableIcons={false}
          options= {{streetViewControl:false}}
          
        >

          { /* Child components, such as markers, info windows, etc. */ }
            <MarkerF
            onLoad={onLoad}
            position={position}
            draggable={true}
            onDragEnd={(e) => {
              this.props.lat(e.latLng.lat()) 
              this.props.lng(e.latLng.lng())}}
            />

          <></>
        </GoogleMap>
      </LoadScript>
    )
  }
}

export default MyComponents;