import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import style from './styles.module.scss';

export default function Home() {
  

  return (
    <div className={style.pageLanding}>
      <div className={style.contentWrapper}>
        <main>
          <h1>Orfanato cadastrado com sucesso!</h1>
          <p></p>
        </main>

        <Link href="/map" >
          <a className={style.enterApp}>
            <FiArrowRight size={26} color="rgba(0, 0, 0, 0.6)" />
          </a>
        </Link>
      </div>
    </div>
  )
}