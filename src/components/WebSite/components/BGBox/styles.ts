import styled from '@emotion/styled';
import { Section } from 'src/components/globalStyles';

export const SectionStyled = styled(Section)`
  position: relative;
  min-height: 300px;
  z-index: 1;
  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 1;
  }
  @media screen and (max-width: 1024px) {
    min-height: 300px !important;
  }
  @media screen and (max-width: 768px) {
    min-height: 200px !important;
  }
  @media screen and (max-width: 480px) {
    min-height: 150px !important;
  }
`;

export const HeadingStyled = styled.h3`
  visibility: hidden;
  color: #fff;
  font-size: 64px;
  line-height: 1.2;
  font-family: 'Gilroy-Semibold';
  text-align: center;
  @media screen and (max-width: 1024px) {
    font-size: 44px;
  }
  @media screen and (max-width: 768px) {
    font-size: 32px;
  }
  @media screen and (max-width: 480px) {
    font-size: 24px;
  }
`;
