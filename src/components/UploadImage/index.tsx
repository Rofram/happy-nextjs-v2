import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useField } from '@unform/core';
import { FiPlus } from 'react-icons/fi';
import style from './styles.module.scss';

type UploadImageProps = {
  name: string
  label: string
  previewImages: string[]
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function UploadImage({ name, label, previewImages, onChange }: UploadImageProps) {
  const inputFileRef = useRef<HTMLInputElement>(null)
  const { fieldName, defaultValue, registerField } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputFileRef.current,
      path: 'files',
    });
  }, [fieldName, registerField]);

  return (
    <>
      <label className={style.labelUpload}>{label}</label>
      <div className={style.inputBlock}>
        <div className={style.imagesContainer}>
          {previewImages.map(image => (
            <Image 
              key={image} 
              src={image} 
              alt={`gallery-${image}`} 
              width={96} 
              height={96} 
            />
          ))}
          <label htmlFor={name} className={style.newImage}>
            <FiPlus size={24} color="#15b6d6" />
          </label>
        </div>
        <input 
          id={name}
          name={name}
          ref={inputFileRef}
          defaultValue={defaultValue}
          type="file"
          multiple
          onChange={onChange}
        />
      </div>
    </>
  )
}