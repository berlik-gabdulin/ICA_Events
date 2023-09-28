import styled from '@emotion/styled';
import { Accordion, Box } from '@mui/material';
import customTheme from 'src/theme/customTheme';

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
  line-height: 1.2;
  font-family: 'Gilroy-Semibold';
  text-align: center;
  @media screen and (max-width: 1200px) {
    font-size: 48px;
  }
  @media screen and (max-width: 768px) {
    font-size: 36px;
  }
`;

export const Title = styled.h2`
  margin-bottom: 30px;
  text-align: center;
  font-size: 72px;
  line-height: 1.2;
  font-weight: 400;
  color: ${({ color }: { color?: string }) => (color ? color : customTheme.light[100])};
  font-family: 'Gilroy', sans-serif;
  @media screen and (max-width: 1024px) {
    font-size: 48px;
  }
  @media screen and (max-width: 768px) {
    font-size: 42px;
  }
  @media screen and (max-width: 480px) {
    font-size: 36px;
  }
`;

export const TitleH1 = styled.h1`
  text-align: center;
  font-size: 72px;
  line-height: 80px;
  font-weight: 400;
  color: ${customTheme.light[100]};
  font-family: 'Gilroy', sans-serif;
  @media screen and (max-width: 1024px) {
    font-size: 48px;
  }
  @media screen and (max-width: 768px) {
    font-size: 42px;
  }
  @media screen and (max-width: 480px) {
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
    fill: ${customTheme.light[100]};
    &:hover,
    &:focus {
      fill: ${customTheme.dark[100]};
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

export const AccordionCustom = styled(Accordion)`
  border: 1px solid ${customTheme.dark[20]};
  transition: all 0.3s ease-in-out;
  &:hover {
    border: 1px solid ${customTheme.dark[60]};
  }
`;

export const Path = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  max-width: 800px;
  > span {
    display: block !important;
    position: absolute !important;
    padding-bottom: 136% !important;
    width: 100% !important;
    bottom: 0 !important;
    top: auto !important;
  }
`;
