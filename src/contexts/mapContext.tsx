import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

type Location = [ number, number ]

type MapContextProps = {
  setMapLocation: (location: Location) => void;
  location?: Location;
}

const MapContext = createContext<MapContextProps>({} as MapContextProps);

export const MapProvider: React.FC = ({ children }) => {
  const [location, setLocation] = useState<[ number, number ]>();

  const setMapLocation = useCallback((location: Location) => {
    setLocation(location);
  }, []);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {
        setMapLocation([position.coords.latitude, position.coords.longitude]);
      });
    } else {
      console.log("geolocation Not Available");
    }
  }, [setMapLocation])

  return (
    <MapContext.Provider value={{ location, setMapLocation }}>
      {children}
    </MapContext.Provider>
  )
}

export const useMapContext = () => {
  const context = useContext(MapContext);

  if (!context) {
    throw new Error('useMapContext must be used within a MapProvider');
  }

  return context;
}