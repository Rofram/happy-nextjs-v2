import dynamic from 'next/dynamic';

import PrimaryButton from "../../components/PrimaryButton";
import Sidebar from "../../components/Sidebar";

import style from './styles.module.scss';
import { FiPlus } from "react-icons/fi";
import mapIcon from '../../utils/map/mapIcon';


const MapWithNoSSR = dynamic(() => import('../../components/Map'), {
  ssr: false,
})

export default function OrphanagesMap() {
  return (
    <div className={style.pageCreateOrphanage}>
      <Sidebar />

      <main>
        <form className={style.createOrphanageForm}>
          <fieldset>
            <legend>Dados</legend>

            <MapWithNoSSR style={{ width: '100%', height: 280 }} />

            <div className={style.inputBlock}>
              <label htmlFor="name">Nome</label>
              <input id="name" />
            </div>

            <div className={style.inputBlock}>
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea id="name" maxLength={300} />
            </div>

            <div className={style.inputBlock}>
              <label htmlFor="images">Fotos</label>

              <div className="uploaded-image">

              </div>

              <button className={style.newImage}>
                <FiPlus size={24} color="#15b6d6" />
              </button>
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea id="instructions" />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Nome</label>
              <input id="opening_hours" />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button type="button" className="active">Sim</button>
                <button type="button">Não</button>
              </div>
            </div>
          </fieldset>

          <PrimaryButton type="submit">Confirmar</PrimaryButton>
        </form>
      </main>
    </div>
  );
}