import customTheme from 'src/theme/customTheme';
import styled from '@emotion/styled';
import { Box } from '@mui/material';
import palette from 'src/theme/palette';
import { Section } from 'src/components/globalStyles';

export const SectionStyled = styled(Section)`
  background-color: ${customTheme.main[80]};
  padding-top: 40px;
  padding-bottom: 33px;
  color: #fff;
  font-size: 24px;
`;

export const Bullets = styled(Box)`
  display: flex;
  margin-top: 48px;
  justify-content: space-between;
`;

export const Bullet = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const BulletValue = styled.span`
  display: block;
  margin-bottom: 4px;
  font-size: 68px;
  line-height: 80px;
  color: ${palette.light.primary.light};
`;

export const BulletLabel = styled.span`
  display: block;
  font-size: 28px;
  font-family: 'Gilroy-SemiBold', sans-serif;
`;
