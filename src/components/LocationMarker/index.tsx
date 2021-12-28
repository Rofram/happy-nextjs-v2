import { useState } from "react";
import { Marker, useMapEvents } from "react-leaflet";
import mapIcon from "../../utils/map/mapIcon";

type LocationMarkerProps = {
  position: [number, number] | null;
  setPosition: (value: [number, number]) => void;
}


export default function LocationMarker({ position, setPosition }: LocationMarkerProps) {
  
  const map = useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });

  return position === null ? null : (
    <Marker icon={mapIcon} position={position} />
  );
}