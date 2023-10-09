import styled from '@emotion/styled';
import { Dialog } from '@mui/material';
import customTheme from 'src/theme/customTheme';
import { ButtonStyled } from '../Button/styles';

export const FooterWrapper = styled('footer')`
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  padding: 16px 24px;
  min-height: 68px;
  background: ${customTheme.darker[100]};
  color: ${customTheme.light[100]};
  font-size: 20px;
  a {
    text-decoration: none;
    color: ${customTheme.light[100]};
    transition: all 0.2s ease-in-out;
    &:hover {
      color: #fff;
      text-decoration: underline;
    }
  }
`;

export const DialogStyled = styled(Dialog)`
  .MuiPaper-rounded,
  .MuiInputBase-root,
  .MuiButtonBase-root {
    width: 100%;
    max-width: 800px;
    border-radius: 0;
    padding: 30px;
  }
  p {
    margin: 1rem 0;
  }
  h2:first-of-type {
    margin-top: 0;
  }
`;

export const CloseButton = styled(ButtonStyled)`
  max-width: 180px !important;
  min-width: auto;
  max-height: 32px;
  margin: 24px auto 0;
`;
