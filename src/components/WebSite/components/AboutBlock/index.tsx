import React from 'react';

import { TAboutTab, TPageType } from 'src/utils/types';
import { Container } from 'src/components/globalStyles';
import { SectionStyled, Bullets, Bullet, BulletValue, BulletLabel } from './styles';
import { AnimatedBulletValue } from '../AnimatedBulletValue';
import { Title } from '../Title';
import { useScrollAnimation } from 'src/utils/useScrollAnimation';

const AboutBlock: React.FC<TPageType<TAboutTab>> = ({ block_title, content }) => {
  const { text, bullets } = content;

  const text1Ref = useScrollAnimation('animate__fadeInDown');
  return (
    <SectionStyled>
      <Container>
        <Title>{block_title}</Title>
        <div dangerouslySetInnerHTML={{ __html: text }} ref={text1Ref} />
        <Bullets>
          {bullets
            ? Object.entries(bullets).map(([label, value]) => (
                <Bullet key={label} className="animate__animated animate__fadeInUp">
                  <BulletValue>
                    {value.includes('+') ? (
                      <>
                        <AnimatedBulletValue value={value.split('+')[0]} />
                        <span>+</span>
                      </>
                    ) : (
                      <AnimatedBulletValue value={value} />
                    )}
                  </BulletValue>
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
