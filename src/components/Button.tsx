import React, { FC } from 'react';
import { Button as MUIButton } from '@mui/material';
import styled from '@emotion/styled';
import { TButton } from 'src/utils/types';

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
