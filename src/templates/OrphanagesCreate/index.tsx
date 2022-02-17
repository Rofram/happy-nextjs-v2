import { useState, useRef, useCallback, ChangeEvent } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import PrimaryButton from "../../components/PrimaryButton";
import Sidebar from "../../components/Sidebar";
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import UploadImage from '../../components/UploadImage';
import FormButtons from '../../components/FormButtons';

import { useUserLocationContext } from '../../contexts/mapContext';

import style from './styles.module.scss';

import api from '../../services/api';
import getValidationErrors from '../../utils/form/getValidationErrors';


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

function OrphanagesCreate() {
  const formRef = useRef<FormHandles>(null);
  const { location } = useUserLocationContext()
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [previewImages, setPreviewImages] = useState<string[]>([])
  const [openOnWeekends, setOpenOnWeekends] = useState<string>()
  
  const router = useRouter()

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
    if(!event.target.files) {
      return;
    }

    const selectedImages = Array.from(event.target.files)
      .map(image => {
        return URL.createObjectURL(image);
      })
    
      setPreviewImages(selectedImages);
  }

  function handleOpenOnWeekends(value: string) {
    setOpenOnWeekends(value)
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

      if(!position) {
        throw new Error('Posição no mapa obrigatório')
      }

      const [latitude, longitude] = position;

      const formData = new FormData();

      formData.append('name', data.name);
      formData.append('latitude', latitude.toString());
      formData.append('longitude', longitude.toString());
      formData.append('about', data.about);
      formData.append('instructions', data.instructions);
      formData.append('opening_hours', data.opening_hours);
      formData.append('open_on_weekends', openOnWeekends === 'Sim' ? 'true' : 'false');
      formData.append('whatsapp', data.whatsapp);

      if (data.images) {
        Array.from(data.images).forEach(image => {
          formData.append('images', image);
        });
      }

      await api.post('/orphanages', formData);

      router.push('success');
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);

        return;
      }

      console.warn(err)

      toast('Erro no cadastro, verifique os dados e tente novamente', {
        type: 'error',
      });
    }
  }, [router, position, openOnWeekends])

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

            <UploadImage name="images" label="Fotos" onChange={handleSelectImages} previewImages={previewImages} />
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <Textarea name='instructions' label='Instruções' />

            <Input name='opening_hours' label='Horário para visita' />

            <Input name='whatsapp' label='Whatsapp' mask="(##) #####-####" />

            <FormButtons buttonLabel={['Sim', 'Não']} label='Atende fim de semana' onClick={handleOpenOnWeekends} />
          </fieldset>

          <PrimaryButton type="submit">Confirmar</PrimaryButton>
        </Form>
      </main>
    </div>
  );
}

export default OrphanagesCreate