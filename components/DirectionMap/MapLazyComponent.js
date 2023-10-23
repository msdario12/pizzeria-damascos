import { MapContainer as LMapContainer } from "react-leaflet";
import dynamic from "next/dynamic";

export const MapContainer = ({ forwardedRef, ...props }) => (
  <LMapContainer {...props} ref={forwardedRef} />
);
export const MapLazyComponent = ({ position }) => {
  const MapWithNoSSR = dynamic(
    () => import("../../components/DirectionMap/DirectionMap"),
    {
      ssr: false,
      loading: () => <p>Loading...</p>,
    }
  );

  return (
    <div id="map">
      <MapWithNoSSR position={position} />
    </div>
  );
};
