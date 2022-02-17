import { useRouter } from 'next/router';
import { useEffect } from 'react';
import style from './styles.module.scss';

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    router.push({
      pathname: '/map'
    })
  }, [router])
  

  return (
    <div className={style.pageSuccess}>
      <div className={style.contentWrapper}>
        <main>
          <h1>Orfanato cadastrado com sucesso!</h1>
        </main>
      </div>
    </div>
  )
}