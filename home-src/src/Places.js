import React, { useState } from "react";
import { useJsApiLoader, GoogleMap } from "@react-google-maps/api";

const Places = () => {
  const [location, setLocation] = useState("");
  const [place, setPlace] = useState("");

  const handleChange = (e) => {
    function initAutocomplete() {
      var input = document.getElementById("pac-input2");
      var searchBox = new window.google.maps.places.SearchBox(input);
      searchBox.addListener("places_changed", function () {
        console.log(document.getElementById("pac-input2").value);
      });
    }
    initAutocomplete();
  };
  return (
    <div className="container">
      <h1>Hello</h1>
      {/* <GoogleMap
        center={{ lat: 48.8584, lng: 2.2945 }}
        zoom={15}
        mapContainerStyle={{ width: "100%", height: "100%" }}
      ></GoogleMap> */}
      <div>
        <input
          onChange={handleChange}
          id="pac-input2"
          type="text"
          placeholder="Pickup Address"
        />
      </div>
    </div>
  );
};

export default Places;
