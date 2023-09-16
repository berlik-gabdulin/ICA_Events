import { Container, Section } from 'src/components/globalStyles';
import { TextBox, LogoBox, MemberBox } from './styles';
import Image from 'next/image';
import { FC } from 'react';
import { TMembership, TPageType } from 'src/utils/types';

const Membership: FC<TPageType<TMembership>> = ({ block_title, content }) => (
  <Section>
    <Container>
      <MemberBox>
        <TextBox flex="1">{content?.label}</TextBox>
        <LogoBox flex="1">
          <Image src={content?.image} alt="" width="461" height="102" />
        </LogoBox>
      </MemberBox>
    </Container>
  </Section>
);

export default Membership;
