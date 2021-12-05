import { useState, useRef, useCallback } from 'react';
import dynamic from 'next/dynamic';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import PrimaryButton from "../../components/PrimaryButton";
import Sidebar from "../../components/Sidebar";
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';

import { FiPlus, FiUser } from "react-icons/fi";
import mapIcon from '../../utils/map/mapIcon';
import { useMapContext } from '../../contexts/mapContext';

import style from './styles.module.scss';

import * as Yup from 'yup';


const MapWithNoSSR = dynamic(() => import('../../components/Map'), {
  ssr: false,
})

type SignUpFormData = {
  name: string;
  about: string;
  instructions: string;
  password: string;
}

export default function OrphanagesMap() {
  const formRef = useRef<FormHandles>(null);
  const { location } = useMapContext()
  const [orphanage, setOrphanage] = useState()

  const handleSubmit = useCallback((data: SignUpFormData) => {
    
    
    
  }, [])

  return (
    <div className={style.pageCreateOrphanage}>
      <Sidebar />

      <main>
        <Form ref={formRef} onSubmit={handleSubmit} className={style.createOrphanageForm}>
          <fieldset>
            <legend>Dados</legend>

            <MapWithNoSSR style={{ width: '100%', height: 280 }} position={location} />

            {/* <div className={style.inputBlock}>
              <label htmlFor="name">Nome</label>
              <input id="name" />
            </div> */}
            <Input name='name' label='Nome' icon={FiUser} />

            {/* <div className={style.inputBlock}>
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea id="about" maxLength={300} />
            </div> */}
            <Textarea name='about' label='Sobre' maxCharacter={300} />

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

            {/* <div className={style.inputBlock}>
              <label htmlFor="instructions">Instruções</label>
              <textarea id="instructions" />
            </div> */}
            <Textarea name='instructions' label='Instruções' />

            {/* <div className={style.inputBlock}>
              <label htmlFor="opening_hours">Horario para visita</label>
              <input id="opening_hours" />
            </div> */}
            <Input name='opening_hours' label='Horario para visita' />

            {/* <div className={style.inputBlock}>
              <label htmlFor="whatsapp">Whatsapp</label>
              <input id="whatsapp" />
            </div> */}
            <Input name='whatsapp' label='Whatsapp' />

            <div className={style.inputBlock}>
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className={style.buttonSelect}>
                <button type="button" className={style.active}>Sim</button>
                <button type="button">Não</button>
              </div>
            </div>
          </fieldset>

          <PrimaryButton type="submit">Confirmar</PrimaryButton>
        </Form>
      </main>
    </div>
  );
}