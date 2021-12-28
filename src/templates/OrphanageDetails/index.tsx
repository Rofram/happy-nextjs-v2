import Image from "next/image"
import { FiClock, FiInfo } from "react-icons/fi"
import { FaWhatsapp } from "react-icons/fa"
import PrimaryButton from "../../components/PrimaryButton"
import Sidebar from "../../components/Sidebar"
import dynamic from "next/dynamic"

import style from "./styles.module.scss"
import { useEffect, useState } from "react"

export type OrphanageDetailsProps = {
  id: string
  name: string
  latitude: number
  longitude: number
  about: string
  instructions: string
  opening_hours: string
  open_on_weekends: boolean
  images: [
    {
      url: string
    }
  ]
}

const MapWithNoSSR = dynamic(() => import('../../components/Map'), {
  ssr: false,
})

export default function OrphanageDetails(props: OrphanageDetailsProps) {
  const [ activeImage, setActiveImage ] = useState(0)

  return (
    <div className={style.pageOrphanage}>
      <Sidebar />

      <main>
        <div className={style.orphanageDetails}>
          <div className={style.coverImage}>
            {!!props.images && <Image src={props.images[activeImage].url} alt="Lar das meninas" layout="fill" />}
          </div>

          <div className={style.images}>
            {props.images && props.images.map((image, index) => (
              <button
                key={`image-gallery-${index}`}
                className={`${activeImage === index ? style.active : ''}`}
                type="button" 
                onClick={() => setActiveImage(index)}
              >
                <Image src={image.url} alt={`${props.name}-image-${index}`} width={90} height={88} />
              </button>
            ))}
          </div>
          
          <div className={style.orphanageDetailsContent}>
            <h1>{props.name}</h1>
            <p>{props.about}</p>

            <div className={style.mapContainer}>
              <MapWithNoSSR
                center={[props.latitude, props.longitude]} 
                zoom={16} 
                style={{ width: '100%', height: 280 }}
                markers={[{
                  position: [props.latitude, props.longitude]
                }]}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              />

              <footer>
                <a 
                  href={`https://www.google.com/maps/dir/?api=1&destination=${props.latitude},${props.longitude}&travelmode=driving`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver rotas no Google Maps
                </a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
            <p>{props.instructions}</p>

            <div className={style.openDetails}>
              <div className={style.hour}>
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta <br />
                {props.opening_hours}
              </div>
              {props.open_on_weekends 
              ? (
                <div className={style.openOnWeekends}>
                  <FiInfo size={32} color="#39CC83" />
                  Atendemos <br />
                  fim de semana
                </div>
              ) : (
                <div className={style.dontOpenOnWeekends}>
                  <FiInfo size={32} color="#FF6690" />
                  Nao atendemos <br />
                  fim de semana
                </div>
              )}
            </div>

            <PrimaryButton type="button" aria-label="pegar contato com whatsapp">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </PrimaryButton>
          </div>
        </div>
      </main>
    </div>
  );
}