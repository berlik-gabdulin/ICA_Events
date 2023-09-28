import styled from '@emotion/styled';
import customTheme from 'src/theme/customTheme';

export const Text = styled.div`
  font-size: 24px;
  p {
  }
  @media screen and (max-width: 480px) {
    font-size: 18px;
  }
`;

export const ThemeSection = styled.section`
  display: flex;
  position: relative;
  &:nth-of-type(odd) {
    background-color: #fff;
  }
  &:nth-of-type(even) {
    background-color: ${customTheme.main[20]};
  }

  p {
    color: #000;
    font-size: 24px;

    @media screen and (max-width: 1200px) {
      font-size: 20px;
    }

    @media screen and (max-width: 480px) {
      font-size: 18px;
    }
  }

  @media screen and (max-width: 768px) {
    div[class*='empty-'] {
      display: none !important;
    }
  }
`;
