import React from 'react';
import { TAboutTab, TPageType } from 'src/utils/types';
import { Container } from 'src/components/globalStyles';
import { SectionStyled, Bullets, Bullet, BulletValue, BulletLabel } from './styles';
import { AnimatedBulletValue } from '../AnimatedBulletValue';
import { Title } from '../Title';
import { useScrollAnimation } from 'src/utils/useScrollAnimation';

const AboutBlock: React.FC<TPageType<TAboutTab>> = ({ content }) => {
  const { title, text, bullets } = content;

  const text1Ref = useScrollAnimation('animate__fadeInDown');

  // Sort bullets array by order and filter active bullets
  const sortedBullets = bullets
    .filter((bullet) => bullet.isActive)
    .sort((a, b) => a.order - b.order);

  return (
    <SectionStyled>
      <Container>
        <Title>{title}</Title>
        <div dangerouslySetInnerHTML={{ __html: text }} ref={text1Ref} />
        <Bullets>
          {sortedBullets.map(({ key, value, label }) => (
            <Bullet key={key} className="animate__animated animate__fadeInUp">
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
          ))}
        </Bullets>
      </Container>
    </SectionStyled>
  );
};

export default AboutBlock;
