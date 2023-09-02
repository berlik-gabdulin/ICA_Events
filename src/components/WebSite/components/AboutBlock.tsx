import React, { useState } from 'react';
import { Typography, Box } from '@mui/material';
import { TAboutTab, TPageType } from 'src/utils/types';
import { Container, Section } from 'src/components/globalStyles';
import styled from '@emotion/styled';

const AboutBlock: React.FC<TPageType<TAboutTab>> = ({ block_title, content }) => {
  const { text, bullets } = content;

  return (
    <Section>
      <Container>
        <Typography variant="h2">{block_title}</Typography>
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
    </Section>
  );
};

export default AboutBlock;

const Bullets = styled(Box)`
  display: flex;
  justify-content: space-between;
`;
const Bullet = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const BulletValue = styled.span`
  display: block;
  font-size: 68px;
`;
const BulletLabel = styled.span`
  display: block;
  font-size: 28px;
`;
