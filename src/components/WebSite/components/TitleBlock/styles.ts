import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { CSSProperties } from 'react';

export const Buttons = styled(Box)`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  @media screen and (max-width: 1100px) {
    margin: 30px 0;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

export const ContainerStyles: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  height: 'calc(100vh - 320px)',
  maxHeight: '800px',
  minHeight: '400px',
  borderRadius: '40px',
  color: '#fff',
};
