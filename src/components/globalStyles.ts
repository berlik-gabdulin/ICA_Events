import styled from '@emotion/styled';
import { Box, BoxProps } from '@mui/material';
import { CSSProperties } from 'react';

export const DeviderStyled = styled('hr')`
  border: 0.3px solid #eee;
  margin: 15px auto 30px;
`;

interface ISectionProps extends BoxProps {
  styles?: CSSProperties;
}

export const Section = styled(Box)<ISectionProps>(({ styles }) => ({
  position: 'relative',
  padding: '60px',
  ...styles,
}));

export const Container = styled.div`
  margin: 0 auto;
  position: relative;
  max-width: 1200px;
  z-index: 10;
  font-family: 'Gilroy', sans-serif !important;
`;
