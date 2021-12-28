import { useState, useRef, useCallback, ChangeEvent } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { toast } from 'react-toastify';

import PrimaryButton from "../../components/PrimaryButton";
import Sidebar from "../../components/Sidebar";
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';

import { FiPlus, FiUser } from "react-icons/fi";
import mapIcon from '../../utils/map/mapIcon';
import { useUserLocationContext } from '../../contexts/mapContext';

import style from './styles.module.scss';

import * as Yup from 'yup';
import api from '../../services/api';
import getValidationErrors from '../../utils/form/getValidationErrors';
import UploadImage from '../../components/UploadImage';
import FormButtons from '../../components/FormButtons';


const MapWithNoSSR = dynamic(() => import('../../components/Map'), {
  ssr: false,
})

const LocationMarker = dynamic(() => import('../../components/LocationMarker'), {
  ssr: false,
})

type SignUpFormData = {
  name: string;
  about: string;
  instructions: string;
  password: string;
  opening_hours: string;
  whatsapp: string;
  images: File[];
}

export default function OrphanagesMap() {
  const formRef = useRef<FormHandles>(null);
  const { location } = useUserLocationContext()
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [orphanage, setOrphanage] = useState()
  const router = useRouter()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const data = new FormData();

    data.append('file', e.target.files![0]);
  }

  const handleSubmit = useCallback(async (data: SignUpFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        about: Yup.string().min(10, 'No mínimo 10 caracteres'),
        instructions: Yup.string().required('Instruções obrigatórias'),
        opening_hours: Yup.string().required('Horário de funcionamento obrigatório'),
        whatsapp: Yup.string().matches(/^\([0-9]{2}\) [0-9]{5}-[0-9]{4}$/, 'Whatsapp inválido'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const formData = new FormData();

      formData.append('name', data.name);
      formData.append('about', data.about);
      formData.append('instructions', data.instructions);
      formData.append('opening_hours', data.opening_hours);
      formData.append('whatsapp', data.whatsapp);

      if (data.images) {
        data.images.forEach(image => {
          formData.append('images', image);
        });
      }

      await api.post('/orphanages', data);

      router.push('orphanages/success');

      toast('Cadastro realizado!', {
        type: 'success',
      });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);

        return;
      }

      toast('Erro no cadastro, verifique os dados e tente novamente', {
        type: 'error',
      });
    }
  }, [router])

  return (
    <div className={style.pageCreateOrphanage}>
      <Sidebar />

      <main>
        <Form ref={formRef} onSubmit={handleSubmit} className={style.createOrphanageForm}>
          <fieldset>
            <legend>Dados</legend>

            <MapWithNoSSR style={{ width: '100%', height: 280 }} position={location}>
              <LocationMarker position={position} setPosition={setPosition} />
            </MapWithNoSSR>

            <Input name='name' label='Nome' />

            <Textarea name='about' label='Sobre' maxCharacter={300} />

            <UploadImage onChange={handleChange} />
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <Textarea name='instructions' label='Instruções' />

            <Input name='opening_hours' label='Horario para visita' />

            <Input name='whatsapp' label='Whatsapp' mask="(##) #####-####" />

            <FormButtons buttonLabel={['Sim', 'Não']} label='Atende fim de semana' />
          </fieldset>

          <PrimaryButton type="submit">Confirmar</PrimaryButton>
        </Form>
      </main>
    </div>
  );
}