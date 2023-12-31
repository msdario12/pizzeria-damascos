import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvent,
  useMapEvents,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoiZGFyaW8xOTk0IiwiYSI6ImNsbzJ1encwcTBjMGYya3Izc29oajYxZDkifQ.SMIN0mp7YSKPH7peOR39dA";

const dimensions = {
  width: 400,
  height: 400,
};
const DraggableMarker = ({ position }) => {
  const [location, setLocation] = useState(position);
  const markerRef = useRef(null);
  const map = useMap();
  const eventHandlers = useMemo(
    () => ({
      moveend(e) {
        console.log("Movimiento", e);
        const marker = markerRef.current;
        if (marker != null) {
          const latLng = marker.getLatLng();
          setLocation([latLng.lat, latLng.lng]);
        }
      },
    }),
    []
  );
  useMapEvents({
    move(e) {
      const center = map.getCenter();
      const marker = markerRef.current;
      if (!marker != null) {
        marker.setLatLng(center);
      }
    },
  });
  const getUrlGeolocation = (lat, lon) => {
    return `https://geocode.maps.co/reverse?lat=${lat}&lon=${lon}`;
  };

  const getLocationByMarker = (location) => {
    const [lat, lon] = location;
    fetch(getUrlGeolocation(lat, lon))
      .then((res) => res.json())
      .then((json) => console.log(json));
  };

  useEffect(() => {
    // const idTimeout = setTimeout(() => {
    //   getLocationByMarker(location);
    // }, 1250);
    // return () => clearTimeout(idTimeout);
    console.log("Effect");
  }, [location]);

  return (
    <Marker
      draggable={false}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
    ></Marker>
  );
};

const LocationMarker = () => {
  const map = useMapEvents({
    click(e) {
      // map.locate();
      console.log(e);
    },
    dblclick(e) {
      console.log("Doble click", e);
    },
  });
};

const DirectionMap = ({ position }) => {
  console.log(position);
  if (!position) {
    return "Seleccione una dirección";
  }

  return (
    <div>
      <h1>Mapa de prueba</h1>
      <MapContainer
        center={position}
        zoom={14}
        scrollWheelZoom={true}
        style={{ height: dimensions.height, width: "100%" }}
      >
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${MAPBOX_TOKEN}`}
          attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
        />
        <DraggableMarker position={position} />
      </MapContainer>
    </div>
  );
};

export default DirectionMap;
