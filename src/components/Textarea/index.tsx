import React, { InputHTMLAttributes, useEffect, useRef, useState, useCallback, TextareaHTMLAttributes } from 'react';
import { useField } from '@unform/core';

import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';

import Tooltip from '../Tooltip';

import style from './styles.module.scss';

interface InputProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label: string;
  maxCharacter?: number;
  containerStyle?: React.CSSProperties;
}

const Textarea = ({ name, label, maxCharacter, containerStyle, ...rest }: InputProps) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
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

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value); // verifica se existe algo escrito no input e seta um boolean
  }, []);

  return (
    <>
      <label className={style.labelTextarea} htmlFor={name}>{label} {!!maxCharacter && <span>{`Máximo de ${maxCharacter} caracteres`}</span>}</label>
      <div
        className={`${style.container} ${isFocused || isFilled ? style.focused : ''} ${!!error && !isFocused ? style.error : ''}`}
        style={containerStyle}
      >
        <textarea
          id={name}
          name={name}
          maxLength={maxCharacter}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          defaultValue={defaultValue}
          ref={inputRef}
          {...rest}
        />
      </div>
      {error && (
        <div className={style.errorMessage}>
          <span>{error}</span>
        </div>
      )}
    </>
  );
};

export default Textarea;