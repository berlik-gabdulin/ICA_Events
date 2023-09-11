import styled from '@emotion/styled';
import palette from 'src/theme/palette';

export const FooterWrapper = styled('footer')`
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  padding: 16px 24px;
  min-height: 68px;
  background: ${palette.light.primary.darker};
  color: ${palette.light.primary.light};
  font-size: 20px;
  a {
    text-decoration: none;
    color: ${palette.light.primary.light};
    transition: all 0.2s ease-in-out;
    &:hover {
      color: #fff;
      text-decoration: underline;
    }
  }
`;
