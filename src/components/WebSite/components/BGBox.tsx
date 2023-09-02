import { FC, ComponentPropsWithoutRef } from 'react';

import Image from 'next/image';
import { Container, Section } from 'src/components/globalStyles';
import { TBGBox } from 'src/utils/types';
import styled from '@emotion/styled';

type BGBoxProps = TBGBox & ComponentPropsWithoutRef<typeof Section>;

const BGBox: FC<BGBoxProps> = ({ bgImage, styles, children, ...props }) => (
  <SectionStyled styles={styles} {...props}>
    <Container>{children}</Container>
    <BGImage layout="fill" src={bgImage} />
  </SectionStyled>
);

export default BGBox;

const SectionStyled = styled(Section)`
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

const BGImage = styled(Image)`
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100% !important;
  z-index: 0;
  object-fit: cover;
`;
