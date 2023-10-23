import { MapContainer as LMapContainer } from "react-leaflet";
import dynamic from "next/dynamic";
import { Skeleton } from "../ui/skeleton";

export const MapContainer = ({ forwardedRef, ...props }) => (
  <LMapContainer {...props} ref={forwardedRef} />
);
export const MapLazyComponent = ({ position }) => {
  const MapWithNoSSR = dynamic(
    () => import("../../components/DirectionMap/DirectionMap"),
    {
      ssr: false,
      loading: () => <Skeleton style={{ height: 400, width: "100%" }} />,
    }
  );

  return (
    <div id="map">
      <MapWithNoSSR position={position} />
    </div>
  );
};
