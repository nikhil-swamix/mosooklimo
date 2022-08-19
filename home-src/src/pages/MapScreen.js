import React, { useState } from "react";
import { useEffect } from "react";
import {
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
} from "react-google-maps";

const MapScreen = (props) => {
  const [directions, setDirections] = useState();

  const google = window.google;
  const directionsService = new google.maps.DirectionsService();

  const origin = props.origin;
  const destination = props.destination;

  useEffect(() => {
    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setDirections(result);
          console.log("Result", result);
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  }, [props.origin, props.destination]);
  const GoogleMapExample = withGoogleMap((props) => (
    <GoogleMap defaultZoom={13}>
      {/* <DirectionsRenderer
          origin={{ lat: 40.756795, lng: -73.954298 }}
          destination={{ lat: 41.756795, lng: -78.954298 }}
        /> */}
      <DirectionsRenderer directions={directions} />
    </GoogleMap>
  ));
  return (
    <div>
      <GoogleMapExample
        containerElement={<div style={{ height: `450px`, width: "100%" }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
};
export default MapScreen;
