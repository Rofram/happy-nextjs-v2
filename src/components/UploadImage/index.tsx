import { FiPlus } from 'react-icons/fi';
import style from './styles.module.scss';

type UploadImageProps = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function UploadImage({ onChange }: UploadImageProps) {
  return (
    <>
      <label htmlFor="images" className={style.labelUpload}>Fotos</label>
      <div className={style.inputBlock}>

        <button className={style.newImage} type='button'>
          <input type="file" onChange={onChange}  />
          <FiPlus size={24} color="#15b6d6" />
        </button>
      </div>
    </>
  )
}