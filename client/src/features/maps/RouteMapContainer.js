import { DirectionsRenderer, GoogleMap, MarkerF } from '@react-google-maps/api';
import React, { useState } from 'react';

import LoadScriptOnlyIfNeeded from "./LoadScriptOnlyIfNeeded";

/*global google*/

const containerStyle = {
  width: '100%',
  height: '40em',
};

const position = {
  lat: -32.317109,
  lng: -58.080587
}

const RouteMap = (props) => {

    const corralon = {"lat":-32.324320, "lng":-58.083528}

    const [directionsResponse, setDirectionsResponse] = useState('')

    let routePointList = []

    React.useEffect( () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      routePointList = []
      props.points?.map(point => routePointList.push({location:{"lat":+point.lat, "lng":+point.long}}));
      calculateRoute()
    }, [props.points]); 


    const calculateRoute = async () => {
        
        const directionsService = new google.maps.DirectionsService()
        const results = await directionsService.route({
        origin: corralon,
        destination: routePointList[routePointList.length-1],
        waypoints: routePointList.slice(0, routePointList.length-1),
        // eslint-disable-next-line no-undef
        travelMode: google.maps.TravelMode.DRIVING,
        })
        setDirectionsResponse(results)
    }

    const [directionsAPI, setDirectionsAPI] = useState('')

      React.useEffect( () => {
        if (directionsResponse !== ''){
          setDirectionsAPI(<DirectionsRenderer directions={directionsResponse} />)
        }else{
          setDirectionsAPI('')
        }
      }, [directionsResponse]); 

    const [markers] = useState('');

    return (
      <>
        <LoadScriptOnlyIfNeeded
          googleMapsApiKey="AIzaSyBTdHYJ8JAS3y0bxq6pRB98KDHrIxXXwNU"
        >
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={position}
            zoom={15}
            clickableIcons={false}
            options= {{streetViewControl:false, minZoom:14}}
            onLoad={() => calculateRoute()}
            
          >

            { /* Child components, such as markers, info windows, etc. */ }
              {markers}
              {directionsAPI}
              
          </GoogleMap>
        </LoadScriptOnlyIfNeeded>
      </>
    )
}

export default RouteMap;