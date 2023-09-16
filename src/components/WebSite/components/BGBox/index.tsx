import { FC, ComponentPropsWithoutRef } from 'react';
import { Container, Section } from 'src/components/globalStyles';
import { TBGBox } from 'src/utils/types';
import { BGImage, SectionStyled } from './styles';

type BGBoxProps = TBGBox & ComponentPropsWithoutRef<typeof Section>;

const BGBox: FC<BGBoxProps> = ({ bgImage, containerStyles, children, ...props }) => (
  <SectionStyled {...props}>
    <Container style={containerStyles}>{children}</Container>
    <BGImage layout="fill" src={bgImage} alt="ICA Events" priority />
  </SectionStyled>
);

export default BGBox;
