import { createContext, useCallback, useContext, useEffect, useState } from 'react';

type Location = [ number, number ]

type UserLocationContextProps = {
  setUserLocation: (location: Location) => void;
  location?: Location;
}

type UserGeolocationProviderProps = {
  children: React.ReactNode;
}

const UserLocationContext = createContext<UserLocationContextProps>({} as UserLocationContextProps);

export const UserGeolocationProvider = ({ children }: UserGeolocationProviderProps) => {
  const [location, setLocation] = useState<Location>();

  const setUserLocation = useCallback((location: Location) => {
    setLocation(location);
    localStorage.setItem('@Happy:UserLocation', JSON.stringify(location));
  }, []);

  useEffect(() => {
    if (!location) {
      const userLocation = localStorage.getItem('@Happy:UserLocation');

      if (userLocation) {
        setLocation(JSON.parse(userLocation));
      }

      if (!userLocation && "geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        });
      } else {
        console.warn("geolocation Not Available");
      }
    }
  }, [setUserLocation, location])

  return (
    <UserLocationContext.Provider value={{ location, setUserLocation }}>
      {children}
    </UserLocationContext.Provider>
  )
}

export const useUserLocationContext = () => {
  const context = useContext(UserLocationContext);

  if (!context) {
    throw new Error('useMapContext must be used within a MapProvider');
  }

  return context;
}