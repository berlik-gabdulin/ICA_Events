import styled from '@emotion/styled';
import { Section } from 'src/components/globalStyles';
import customTheme from 'src/theme/customTheme';
import { FONT_PRIMARY, FONT_PRIMARY_BOLD } from 'src/theme/typography';

export const Text = styled.div`
  p {
    font-size: 20px;
  }
  h1,
  h2,
  h3,
  h4,
  h5 {
    font-family: ${FONT_PRIMARY};
    line-height: 1.2;
    margin-top: 28px;
    margin-bottom: 14px;
  }

  h1 {
    font-size: 36px;
  }
  h2 {
    font-size: 34px;
  }
  h3 {
    font-size: 32px;
  }
  h4 {
    font-size: 30px;
  }
  h5 {
    font-size: 28px;
  }
  h6 {
    height: 26px;
  }

  @media screen and (max-width: 480px) {
    font-size: 18px;
  }
`;

export const ThemeSection = styled(Section)`
  &:nth-of-type(odd) {
    background-color: ${customTheme.dark[20]};
    h2 {
      color: ${customTheme.dark[100]};
    }
    & > div > div {
      flex-direction: row-reverse;
      & > div:nth-of-type(1) {
        padding: 0 0 0 79px;
        @media screen and (max-width: 1200px) {
          padding: 0 0 0 30px;
        }
      }
      & > div:nth-of-type(2) {
        padding: 0 79px 0 0;
        @media screen and (max-width: 1200px) {
          padding: 0 30px 0 0;
        }
      }
    }
  }
  &:nth-of-type(even) {
    background-color: #fff;
    h2 {
      color: ${customTheme.light[100]};
    }
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

  h2 {
    margin-bottom: 60px;
    font-size: 48px;
    line-height: 1.2;
    @media screen and (max-width: 1024px) {
      font-size: 40px;
      margin-bottom: 16px;
    }
    @media screen and (max-width: 768px) {
      font-size: 32px;
    }
    @media screen and (max-width: 480px) {
      font-size: 24px;
    }
  }
  @media screen and (max-width: 768px) {
    & > div > div {
      flex-direction: column !important;
      & > div {
        padding: 15px 0 !important;
      }
    }
  }
`;

export const ContentBlock = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  padding: 0;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    padding: 0;
  }
`;

export const ImageBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  justify-content: center;
  align-items: flex-start;
  padding: 0 0 0 79px;

  img {
    width: 100%;
    height: auto;
  }

  @media screen and (max-width: 1200px) {
    padding: 0 0 0 30px;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    padding: 15px 0;
    align-items: center;
  }
`;

export const TextBlock = styled.div`
  flex: 1;
  display: flex;
  width: 50%;
  flex-direction: column;
  padding: 0 79px 0 0;
  justify-content: space-between;

  @media screen and (max-width: 1200px) {
    padding: 0 30px 0 0;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    padding: 15px 0;
    align-items: center;
  }
`;

export const Intro = styled.div`
  margin-top: 40px;
  margin-bottom: 10px;
  font-size: 24px;

  @media screen and (max-width: 768px) {
    margin-top: 20px;
    margin-bottom: 5px;
    font-size: 20px;
  }

  @media screen and (max-width: 480px) {
    margin-top: 15px;
    margin-bottom: 5px;
    font-size: 18px;
  }
`;

export const ContactsBlock = styled.div`
  padding-bottom: 100px;
  color: #fff;
  font-size: 24px;
  h2 {
    margin-top: 30px;
    margin-bottom: 30px;
    font-size: 48px;
    line-height: 1.2;
    color: ${customTheme.light[100]};
    @media screen and (max-width: 1024px) {
      font-size: 40px;
    }
    @media screen and (max-width: 768px) {
      font-size: 32px;
    }
    @media screen and (max-width: 480px) {
      font-size: 24px;
    }
  }

  @media screen and (max-width: 768px) {
    padding-bottom: 50px;
  }

  @media screen and (max-width: 480px) {
    font-size: 18px;
    padding-bottom: 0;
  }
`;

export const LinksBlock = styled.div`
  display: flex;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const IconLink = styled.a`
  display: flex;
  align-items: center;
  margin-right: 110px;
  color: #fff;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  svg {
    color: ${customTheme.light[100]};
    height: 40px;
    margin-right: 20px;
  }
  &:hover {
    color: ${customTheme.light[100]};
  }
  @media screen and (max-width: 768px) {
    margin-right: auto;
    margin-bottom: 15px;
    svg {
      height: 30px;
    }
  }
`;
