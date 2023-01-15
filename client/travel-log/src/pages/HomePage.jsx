import React, { useEffect, useState, useRef } from "react";
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import * as tt from "@tomtom-international/web-sdk-maps";
import axios from "axios";
import { useSelector } from "react-redux";

const HomePage = (props) => {
  const mapElement = useRef();
  const [mapZoom, setMapZoom] = useState(13);
  const [map, setMap] = useState({});
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [longitude, setLongitude] = useState(10.33);
  const [lattitude, setLattitude] = useState(45.432);

  const travelLogs = useSelector((state) => state.travelLog);

  let nearbyRadius = 20;
  if (
    longitude + nearbyRadius > travelLogs.location[0] &&
    lattitude + nearbyRadius > travelLogs.location[1]
  ) {
    console.log("*******************");
    console.log(travelLogs.title);
    console.log(travelLogs.experience);
    console.log("*******************");
  }
  //console.log(travelLogs);
  const searchHandler = async () => {
    if (search === "") {
      setSearchResults([]);
    }
    await axios
      .get(
        `https://api.tomtom.com/search/2/search/${search}.json?key=66AS5Y04A9wZlAR4jt93xH6dCVAwLzUr&language=en-US`
      )
      .then((response) => {
        response.data.results.map((res) => {
          setSearchResults((prevState) => {
            return [...prevState.slice(0, 5), res];
          });
        });
      });
  };

  useEffect(() => {
    let map = tt.map({
      key: "66AS5Y04A9wZlAR4jt93xH6dCVAwLzUr",
      stylesVisibility: {
        trafficIncidents: true,
        trafficFlow: true,
      },
      container: mapElement.current,
      center: [longitude, lattitude],
      zoom: mapZoom,
    });
    var marker = new tt.Marker().setLngLat([longitude, lattitude]).addTo(map);

    setMap(map);
    return () => map.remove();
  }, [longitude, lattitude]);
  useEffect(() => {
    searchHandler();
  }, [search]);
  return (
    <>
      <h1 className="text-center">Home</h1>
      <div className="container">
        <div className="row">
          <div className="col-8">
            <div id="main-map" ref={mapElement} className="mapDiv" />
            <div className="nearby-experiences">
              <h1>Experiences Near :{selectedLocation}</h1>
              {}
            </div>
          </div>
          <div className="col-4">
            <form>
              <input
                type="text"
                placeholder="Enter Your Location"
                className="form-control"
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
            </form>
            <div>
              {searchResults.map((result, index) => {
                return (
                  <h4
                    onClick={() => {
                      setLongitude(result.position.lon);
                      setLattitude(result.position.lat);
                      setSelectedLocation(result.address.freeformAddress);
                    }}
                  >
                    {result.address.freeformAddress}
                  </h4>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
