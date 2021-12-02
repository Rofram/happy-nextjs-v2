import React, { ButtonHTMLAttributes } from 'react';

import style from './styles.module.scss';

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export default function PrimaryButton({ children, ...props }: PrimaryButtonProps) {
  return (
    <button className={style.primaryButton} {...props}>
      {children}
    </button>
  );
}