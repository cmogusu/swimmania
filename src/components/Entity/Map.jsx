import { useMemo } from "react";
import { Map as RealMap } from "../Map";

export const Map = ({ metadata }) => {
  const location = useMemo(() => getLocation(metadata), [metadata]);

  if (!location) {
    return null;
  }

  return <RealMap location={location} />;
};

const getLocation = (metadata) => {
  if (!metadata?.length) {
    return;
  }

  const latString = metadata.find((m) => m.name == "location.lat")?.value;
  const lngString = metadata.find((m) => m.name == "location.lng")?.value;

  if (!latString || !lngString) {
    return;
  }

  const lat = Number(latString);
  const lng = Number(lngString);

  if (Number.isNaN(lat) || Number.isNaN(lng)) {
    return;
  }

  return { lat, lng };
};
