import React, { ForwardedRef } from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import styled from '@emotion/styled';

type InputProps = TextFieldProps & {
  shrink?: string;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref: ForwardedRef<HTMLInputElement>) => (
    <InputStyled
      {...props}
      ref={ref}
      InputLabelProps={{
        ...props.InputLabelProps,
        shrink: Boolean(props.shrink) || undefined,
      }}
    />
  )
);

export default Input;

export const InputStyled = styled(TextField)`
  margin-bottom: 15px;
`;
