import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoiZGFyaW8xOTk0IiwiYSI6ImNsbzJ1encwcTBjMGYya3Izc29oajYxZDkifQ.SMIN0mp7YSKPH7peOR39dA";

const dimensions = {
  width: 400,
  height: 400,
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
        scrollWheelZoom={false}
        style={{ height: dimensions.height, width: "100%" }}
      >
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${MAPBOX_TOKEN}`}
          attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
        />
        <Marker position={position} draggable={true} animate={true}>
          <Popup>Hey ! I live here</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default DirectionMap;
