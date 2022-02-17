import { useEffect, useState } from 'react';
import style from './styles.module.scss';

type FormButtonsProps = {
  label?: string;
  onClick?: (value: string) => void;
  disabled?: boolean;
  styles?: React.CSSProperties;
  buttonLabel: string[];
}

export default function FormButtons({ label, onClick, disabled, styles, buttonLabel }: FormButtonsProps) {
  const [ selected, setSelected ] = useState<string>();

  function handleClick(value: string) {
    setSelected(value)

    if(onClick) {
      onClick(value)
    }
  }

  useEffect(() => {
    setSelected(buttonLabel[0])

    if(onClick) {
      onClick(buttonLabel[0])
    }
  }, [])

  return (
    <>
      {!!label && <label htmlFor="open_on_weekends" className={style.labelButton}>{label}</label>}
      <div className={style.inputBlock}>

        <div className={style.buttonSelect} style={styles}>
          {buttonLabel.map(text => (
            <button 
              key={`formButton-${text}`} 
              onClick={() => handleClick(text)} 
              type="button" 
              className={selected == text ? style.active : ''}
            >
              {text}
            </button>
          ))}
        </div>
      </div>
    </>
  )
}