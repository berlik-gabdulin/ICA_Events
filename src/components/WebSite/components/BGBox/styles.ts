import styled from '@emotion/styled';
import Image from 'next/image';
import { Section } from 'src/components/globalStyles';

export const SectionStyled = styled(Section)`
  position: relative;
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
`;

export const BGImage = styled(Image)`
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100% !important;
  z-index: 0;
  object-fit: cover;
`;
