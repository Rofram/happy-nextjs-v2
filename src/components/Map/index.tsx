import Link from "next/link";
import { MapContainer, Marker, Popup, TileLayer, MapContainerProps } from "react-leaflet";
import mapIcon from "../../utils/map/mapIcon";
import style from './style.module.scss';
import { FiArrowRight } from 'react-icons/fi'

type PopupProps = {
  title: string;
  image: string;
  buttonLink: string;
}

interface MapProps extends MapContainerProps {
  position?: [ latitude: number, longitude: number ];
  markers?: Array<{
    position: [ latitude: number, longitude: number ];
    popup?: PopupProps;
  }>;
};


export default function Map({ position, markers = [], ...rest }: MapProps) {
    return (
      <MapContainer
        center={[-22.227077, -54.8025487]}
        style={{ width: "100%", height: "100%" }}
        zoom={15}
        {...rest}
        >
        <TileLayer
            url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.NEXT_PUBLIC_REACT_APP_MAPBOX_TOKEN}`}
        />
          {markers.length > 0 && markers.map((marker, index) => (
              <Marker
                icon={mapIcon}
                position={marker.position}
                key={`marker-${index}`}
              >
                {marker.popup && (
                  <Popup 
                    closeButton={false}
                    minWidth={240}
                    maxWidth={240}
                    className={style.MapPopup}
                  >
                    <p>{marker.popup.title}</p>

                    <Link href={marker.popup.buttonLink}>
                      <a>
                        <FiArrowRight size={20} color="#fff" />
                      </a>
                    </Link>
                  </Popup>
                )}
              </Marker>
          ))}
        </MapContainer>
    );
}
