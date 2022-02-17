import React, { InputHTMLAttributes, useEffect, useRef, useState } from 'react';
import { useField } from '@unform/core';

import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';

import Tooltip from '../Tooltip';

import style from './styles.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  containerStyle?: React.CSSProperties;
  icon?: React.ComponentType<IconBaseProps>;
  mask?: string;
}

const Input = ({ name, label, icon: Icon, containerStyle, mask, ...rest }: InputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  function handleInputBlur () {
    setIsFocused(false);
    setIsFilled(!!inputRef.current?.value);
  };

  function handleKeyUp() {
    if (inputRef.current && mask) {
      inputRef.current.value = maskInput(inputRef.current.value, mask)
    }
  }


  function maskInput(value: number | string, pattern: string) { // mascara de input by devzolo
    let i = 0;
    const v = value.toString().replace(/[^a-zA-Z0-9]/g, "");
    return pattern.replace(/#/g, () => {
        const caractere = v[i++];
        return caractere || "";
    })
  };

  return (
    <>
      <label htmlFor={name} className={style.inputLabel}>{label}</label>
      <div
        className={`${style.container} ${isFocused || isFilled ? style.focused : ''} ${!!error && !isFocused ? style.error : ''}`}
        style={containerStyle}
      >
        {!!Icon && <Icon size={20} />}
        <input
          id={name}
          name={name}
          onFocus={() => setIsFocused(true)}
          onKeyUp={handleKeyUp}
          onBlur={handleInputBlur}
          defaultValue={defaultValue}
          ref={inputRef}
          {...rest}
        />
        {error && (
          <Tooltip title={error} className={style.tooltip}>
            <FiAlertCircle color="#d1585e" size={20} />
          </Tooltip>
        )}
      </div>
    </>
  );
};

export default Input;