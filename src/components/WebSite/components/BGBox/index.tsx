import { FC, ComponentPropsWithoutRef } from 'react';
import { Container, Section } from 'src/components/globalStyles';
import { TBGBox } from 'src/utils/types';
import {  SectionStyled } from './styles';

type BGBoxProps = TBGBox & ComponentPropsWithoutRef<typeof Section>;

const BGBox: FC<BGBoxProps> = ({ bgImage, containerStyles, children, ...props }) => (
  <SectionStyled
    {...props}
    style={{
      backgroundImage: `url(${bgImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'top center',
    }}
  >
    <Container style={containerStyles}>{children}</Container>
  </SectionStyled>
);

export default BGBox;
