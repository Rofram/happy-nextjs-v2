import Image from 'next/image';
import { useRouter } from 'next/router';
import { FiArrowLeft } from 'react-icons/fi';

import style from './styles.module.scss';

export default function Sidebar() {
  const { back } = useRouter();

  return (
    <aside className={style.sidebar}>
      <Image src="/images/local.svg" alt="Happy logo" width={64} height={72} />

      <footer>
        <button type="button" onClick={back}>
          <FiArrowLeft size={24} color="#FFF" />
        </button>
      </footer>
    </aside>
  );
}