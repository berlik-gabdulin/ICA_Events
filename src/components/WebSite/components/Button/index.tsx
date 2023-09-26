import React, { FC } from 'react';
import { ButtonStyled } from './styles';
import { TButton } from 'src/utils/types';

const Button: FC<TButton> = ({
  type = 'button',
  variant = 'contained',
  size = 'large',
  color = 'primary',
  customcolor,
  style,
  children,
  onClick,
  ...props
}) => (
  <ButtonStyled
    type={type}
    variant={variant}
    color={color}
    customcolor={customcolor}
    size={size}
    style={style}
    onClick={onClick}
    {...props}
  >
    {children}
  </ButtonStyled>
);

export default Button;
