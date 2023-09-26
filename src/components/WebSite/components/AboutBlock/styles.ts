import customTheme from 'src/theme/customTheme';
import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { Section } from 'src/components/globalStyles';

export const SectionStyled = styled(Section)`
  background-color: ${customTheme.main[100]};
  padding-top: 40px;
  padding-bottom: 33px;
  color: #fff;
  font-size: 24px;
`;

export const Bullets = styled(Box)`
  display: flex;
  margin-top: 48px;
  justify-content: space-between;
  flex-wrap: wrap;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Bullet = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const BulletValue = styled.span`
  position: relative;
  display: block;
  margin-bottom: 4px;
  font-size: 68px;
  line-height: 1.2;
  color: ${customTheme.light[100]};
  span {
    position: absolute;
    font-size: 40px;
    top: 0;
  }

  @media screen and (max-width: 1200px) {
    font-size: 56px;
    margin-bottom: 0;
  }

  @media screen and (max-width: 768px) {
    font-size: 44px;
  }
`;

export const BulletLabel = styled.span`
  display: block;
  font-size: 28px;
  font-family: 'Gilroy-SemiBold', sans-serif;
  @media screen and (max-width: 1200px) {
    font-size: 24px;
    line-height: 1;
    margin-bottom: 10px;
    margin-top: 0;
  }
`;
