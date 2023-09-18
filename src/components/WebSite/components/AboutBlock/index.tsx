import React from 'react';

import { TAboutTab, TPageType } from 'src/utils/types';
import { Container, Title } from 'src/components/globalStyles';
import { SectionStyled, Bullets, Bullet, BulletValue, BulletLabel } from './styles';

const AboutBlock: React.FC<TPageType<TAboutTab>> = ({ block_title, content }) => {
  const { text, bullets } = content;

  return (
    <SectionStyled>
      <Container>
        <Title>{block_title}</Title>
        <div dangerouslySetInnerHTML={{ __html: text }} />
        <Bullets>
          {bullets
            ? Object.entries(bullets).map(([label, value]) => (
                <Bullet key={label}>
                  <BulletValue>{value}</BulletValue>
                  <BulletLabel>{label}</BulletLabel>
                </Bullet>
              ))
            : null}
        </Bullets>
      </Container>
    </SectionStyled>
  );
};

export default AboutBlock;
