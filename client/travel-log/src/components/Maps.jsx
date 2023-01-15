import React, { useEffect, useState, useRef } from "react";
import { Map, Marker } from "pigeon-maps";
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import * as tt from "@tomtom-international/web-sdk-maps";

const Maps = (props) => {
  const mapElement = useRef();
  const [mapZoom, setMapZoom] = useState(13);
  const [map, setMap] = useState({});

  useEffect(() => {
    let map = tt.map({
      key: "66AS5Y04A9wZlAR4jt93xH6dCVAwLzUr",
      stylesVisibility: {
        trafficIncidents: true,
        trafficFlow: true,
      },
      container: mapElement.current,
      center: [props.location[0], props.location[1]],
      zoom: mapZoom,
    });
    var marker = new tt.Marker()
      .setLngLat([props.location[0], props.location[1]])
      .addTo(map);

    setMap(map);
    return () => map.remove();
  }, [props.location]);

  console.log(props.location);
  return (
    <>
      <div id="map" ref={mapElement} className="mapDiv" />
    </>
  );
};
export default Maps;

//<div>
//   <Map
//     height={300}
//     width={450}
//     defaultCenter={props.location}
//     defaultZoom={11}
//     zoom={props.location}
//     provider={(x, y, z, dpr) => {
//       return `https://api.maptiler.com/maps/streets-v2/${z}/${x}/${y}${
//         dpr >= 2 ? "@2x" : ""
//       }.png?key=pBn7AlJ7MBLLXtHdXem4#0.8/8.64231/10.50369`;
//     }}
//     dprs={[1, 2]}
//   >
//     <Marker width={50} anchor={props.location} />
//   </Map>
// </div>
