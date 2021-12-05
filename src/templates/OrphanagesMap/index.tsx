import Image from 'next/image';
import Link from 'next/link';
import { FiPlus } from 'react-icons/fi';
import dynamic from 'next/dynamic';
import style from './styles.module.scss';
import { useMapContext } from '../../contexts/mapContext';
import { MarkerProps } from '../../components/Map';

const MapWithNoSSR = dynamic(() => import('../../components/Map'), {
    ssr: false,
})

export type OrphanagesMapProps = {
    orphanages: MarkerProps[]
}

function OrphanagesMap({ orphanages }: OrphanagesMapProps) {
    const { location } = useMapContext()

    return (
        <div className={style.pageMap}>
            <aside>
                <header>
                    <Image src="/images/local.svg" alt="Happy" width="64" height="72" />

                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita :)</p>
                </header>

                <footer>
                    <strong>
                        Duque de Caxias
                    </strong>
                    <span>
                        Rio de Janeiro
                    </span>
                </footer>
            </aside>

            <MapWithNoSSR position={location} markers={orphanages} />

            <Link href="/orphanages/create" >
                <a className={style.createOrphanages}>
                    <FiPlus size={32} color="#FFF" />
                </a>
            </Link>
        </div>
    );
}

export default OrphanagesMap;