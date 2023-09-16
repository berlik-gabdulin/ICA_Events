import styled from '@emotion/styled';
import customTheme from 'src/theme/customTheme';

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
