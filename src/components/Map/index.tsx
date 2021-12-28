import Link from "next/link";
import Image from "next/image";
import { MapContainer, Marker, Popup, TileLayer, MapContainerProps } from "react-leaflet";
import mapIcon from "../../utils/map/mapIcon";
import style from './style.module.scss';
import { FiArrowRight } from 'react-icons/fi';
import { useState } from "react";

type PopupProps = {
  title: string;
  image: string;
  buttonLink: string;
}

export type MarkerProps = {
  position: [ latitude: number, longitude: number ];
  popup?: PopupProps;
}

type MapProps = {
  position?: [ latitude: number, longitude: number ];
  markers?: MarkerProps[];
  children?: React.ReactNode;
} & MapContainerProps;


export default function Map({ position, markers = [], children, ...rest }: MapProps) {
    return (
      <MapContainer
        center={position}
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
                {!!marker.popup && (
                  <Popup 
                    closeButton={false}
                    minWidth={240}
                    maxWidth={240}
                    className={style.MapPopup}
                  >
                    <div className={style.image}>
                      <Image src={marker.popup.image} alt={marker.popup.title} layout="fill" />
                    </div>

                    <div className={style.popupContent}>
                      <p>{marker.popup.title}</p>

                      <Link href={marker.popup.buttonLink}>
                        <a>
                          <FiArrowRight size={20} color="#fff" />
                        </a>
                      </Link>
                    </div>
                  </Popup>
                )}
              </Marker>
          ))}
          {children}
        </MapContainer>
    );
}
