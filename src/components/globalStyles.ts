import styled from '@emotion/styled';
import { Box } from '@mui/material';

import palette from 'src/theme/palette';

export const DeviderStyled = styled('hr')`
  border: 0.3px solid #eee;
  margin: 15px auto 30px;
`;

export const Section = styled(Box)`
  position: relative;
  padding: 54px 0;
  box-sizing: border-box;
  @media screen and (max-width: 768px) {
    padding: 30px 0;
  }
`;

export const Container = styled.div`
  margin: 0 auto;
  position: relative;
  width: 100%;
  max-width: 1252px;
  padding: 0 17px;
  z-index: 10;
  font-family: 'Gilroy', sans-serif !important;
  box-sizing: border-box;
`;

export const MainTitle = styled.h1`
  font-size: 64px;
  line-height: 80px;
  font-family: 'Gilroy-Semibold';
  text-align: center;
  @media screen and (max-width: 768px) {
    font-size: 36px;
  }
`;

export const Title = styled.h2`
  margin-bottom: 30px;
  text-align: center;
  font-size: 72px;
  line-height: 80px;
  font-weight: 400;
  color: ${palette.light.primary.light};
  font-family: 'Gilroy', sans-serif;
  @media screen and (max-width: 1024px) {
    font-size: 48px;
  }
  @media screen and (max-width: 768px) {
    font-size: 36px;
  }
`;

// Slider Arrows
export const Arrow = styled.span`
  display: flex !important;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 41px !important;
  svg {
    display: flex !important;
    font-size: 60px !important;
    justify-content: center;
    align-items: center;
    fill: ${palette.light.primary.light};
    &:hover,
    &:focus {
      fill: ${palette.light.primary.dark};
    }
  }
  &.slick-prev {
    svg {
      transform: rotate(180deg);
    }
  }
  &.slick-disabled {
    svg {
      fill: ${palette.light.grey[500]} !important;
      &:hover,
      &:focus {
        fill: ${palette.light.grey[500]} !important;
      }
    }
  }
  &:before,
  &:after {
    display: none;
  }
`;
