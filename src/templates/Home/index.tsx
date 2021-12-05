import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import style from './styles.module.scss';

export default function Home() {
  

  return (
    <div className={style.pageLanding}>
      <div className={style.contentWrapper}>

        <Image src="/images/logo.svg" alt="Happy" width="240" height="74" />

        <main>
          <h1>Leve felicidade para o mundo</h1>
          <p>Visite orfanatos e mude o dia de muitas crianças.</p>
        </main>

        <div className={style.location}>
          <strong>Duque de Caxias</strong>
          <span>Rio de Janeiro</span>
        </div>

        <Link href="/map" >
          <a className={style.enterApp}>
            <FiArrowRight size={26} color="rgba(0, 0, 0, 0.6)" />
          </a>
        </Link>
      </div>
    </div>
  )
}