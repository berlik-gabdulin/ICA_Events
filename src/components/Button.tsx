import React, { FC, ButtonHTMLAttributes, ReactNode } from 'react';
import { Button as MUIButton } from '@mui/material';
import styled from '@emotion/styled';

type TButton = {
  type?: 'button' | 'submit' | 'reset';
  variant?: 'text' | 'outlined' | 'contained';
  size?: 'small' | 'medium' | 'large';
  color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  style?: any;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<TButton> = ({
  type = 'submit',
  variant = 'contained',
  size = 'large',
  color = 'primary',
  style,
  children,
  ...props
}) => (
  <ButtonStyled type={type} variant={variant} color={color} size={size} style={style} {...props}>
    {children}
  </ButtonStyled>
);

export default Button;

const ButtonStyled = styled(MUIButton)`
  margin-top: 30px;
  min-width: 140px;
`;
