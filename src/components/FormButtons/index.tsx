import { useState } from 'react';
import style from './styles.module.scss';

type FormButtonsProps = {
  label?: string;
  onClick?: () => void;
  disabled?: boolean;
  styles?: React.CSSProperties;
  buttonLabel: string[];
}

export default function FormButtons({ label, onClick, disabled, styles, buttonLabel }: FormButtonsProps) {
  const [ selected, setSelected ] = useState<string>(buttonLabel[0]);

  return (
    <>
      {!!label && <label htmlFor="open_on_weekends" className={style.labelButton}>{label}</label>}
      <div className={style.inputBlock}>

        <div className={style.buttonSelect} style={styles}>
          {buttonLabel.map((text, index) => (
            <button key={`formButton-${index}`} onClick={() => setSelected(text)} type="button" className={selected == text ? style.active : ''}>{text}</button>
          ))}
        </div>
      </div>
    </>
  )
}