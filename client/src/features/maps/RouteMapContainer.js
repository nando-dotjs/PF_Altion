import React, { Component, useState, useRef } from 'react';
import { GoogleMap, MarkerF, DirectionsRenderer} from '@react-google-maps/api';
import LoadScriptOnlyIfNeeded from "./LoadScriptOnlyIfNeeded";
import Swal from "sweetalert2"
/*global google*/
let isDraggable = true;

const containerStyle = {
  width: '100%',
  height: '40em',
};

let center = {
  lat: -32.317109,
  lng: -58.080587
};

const position = {
  lat: -32.317109,
  lng: -58.080587
}

const RouteMap = (props) => {

    const corralon = {"lat":-32.324320, "lng":-58.083528}

    const [map, setMap] = useState('')
    const [directionsResponse, setDirectionsResponse] = useState('')
    const [distance, setDistance] = useState('')
    const [duration, setDuration] = useState('')

    	React.useEffect( () => {
        routePointList = []
        setRoutePoints(props.points?.map(point => routePointList.push({location:{"lat":+point.lat, "lng":+point.long}})));
        calculateRoute()
      }, [props.points]); 

    let routePointList = []
    const [routePoints, setRoutePoints] = useState(props.points?.map(point => routePointList.push({location:{"lat":+point.lat, "lng":+point.long}})))

    /** @type React.MutableRefObject<HTMLInputElement> */
    const originRef = useRef()
    /** @type React.MutableRefObject<HTMLInputElement> */
    const destiantionRef = useRef()

    const calculateRoute = async () => {
        // eslint-disable-next-line no-undef
        
        const directionsService = new google.maps.DirectionsService()
        const results = await directionsService.route({
        origin: corralon,
        destination: routePointList[routePointList.length-1],
        waypoints: routePointList,
        // eslint-disable-next-line no-undef
        travelMode: google.maps.TravelMode.DRIVING,
        })
        setDirectionsResponse(results)
        setDistance(results.routes[0].legs[0].distance.text)
        setDuration(results.routes[0].legs[0].duration.text)
        setMarkers(props.points?.map(point => {
        const latlng = {"lat":+point.lat, "lng":+point.long};
        return <MarkerF key={point._id} position={latlng}/>
        }))
    }

    const [directionsAPI, setDirectionsAPI] = useState('')

      React.useEffect( () => {
        if (directionsResponse !== ''){
          setDirectionsAPI(<DirectionsRenderer directions={directionsResponse} />)
        }else{
          setDirectionsAPI('')
        }
      }, [directionsResponse]); 

    const [markers, setMarkers] = useState(props.points?.map(point => {
        const latlng = {"lat":+point.lat, "lng":+point.long};
        return <MarkerF key={point._id} position={latlng}/>
    }));

    // const tableContent = ids?.length && ids.map(routeId => <Route key={routeId} routeId={routeId} />) 

    return (
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
          <></>
        </GoogleMap>
      </LoadScriptOnlyIfNeeded>
    )
}

export default RouteMap;