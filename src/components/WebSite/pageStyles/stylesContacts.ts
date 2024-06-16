import styled from '@emotion/styled';
import Button from 'src/components/Button';
import BtnFront from 'src/components/WebSite/components/Button';
import customTheme from 'src/theme/customTheme';
import { FONT_PRIMARY_BOLD } from 'src/theme/typography';

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
  &:nth-of-type(odd) {
    flex-direction: row-reverse;
    background-color: ${customTheme.main[20]};
    h2 {
      color: ${customTheme.main[100]};
    }

    .text_block {
      justify-content: start;
      padding-left: 60px;
      padding-right: 15px;
      @media screen and (max-width: 992px) {
        padding: 0;
      }
    }
  }
  &:nth-of-type(even) {
    background-color: ${customTheme.main[100]};

    h2,
    h3 {
      color: ${customTheme.light[100]};
    }

    p {
      color: #fff;
    }

    button,
    a {
      color: #fff;
      &:hover {
        color: ${customTheme.light[100]};
      }
    }

    .image_block {
      justify-content: flex-start;
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

  @media screen and (max-width: 992px) {
    flex-direction: column !important;
  }
`;

export const ImageBlock = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  min-height: 300px;
  position: relative;
  width: 50%;
  margin-right: -1px;

  img {
    object-fit: cover;
  }

  &:hover {
    img {
      filter: blur(2px) brightness(0.7);
    }
  }

  @media screen and (max-width: 992px) {
    width: 100%;
  }

  .image_inner_block {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 625px;
  }
`;

export const TextBlock = styled.div`
  flex: 1;
  display: flex;
  padding: 50px 0 140px;
  width: 50%;
  justify-content: flex-end;

  @media screen and (max-width: 768px) {
    width: 100% !important;
    padding: 0;
    align-items: center;
  }

  h2 {
    font-size: 64px;
    margin-bottom: 22px;
    color: ${customTheme.main[100]};
    @media screen and (max-width: 768px) {
      font-size: 36px;
      margin-bottom: 0px;
    }
  }
  h3 {
    font-size: 44px;
    line-height: 1.2;
    margin-top: 45px;
    margin-bottom: 0;
    color: ${customTheme.main[100]};
    @media screen and (max-width: 768px) {
      font-size: 36px;
      margin-top: 30px;
      margin-bottom: 16px;
    }
  }

  p {
    a {
      color: #000;
      transition: all 0.3s ease-in-out;
      text-decoration: none;
      &:hover {
        color: ${customTheme.light[100]};
      }
    }
  }

  .text_inner_block {
    width: 100%;
    max-width: 625px;
    padding-left: 15px;
    padding-right: 15px;
    @media screen and (max-width: 768px) {
      padding: 30px 15px !important;
    }
  }
`;

export const LookMap = styled(Button)`
  margin-top: 5px;
  margin-left: -11px;
  font-size: 24px;
  font-family: ${FONT_PRIMARY_BOLD};
  font-weight: 700;
  color: ${customTheme.dark[100]};
  svg {
    height: 28px;
    margin-right: 10px;
  }
`;

export const MapButton = styled(BtnFront)`
  cursor: pointer;
  color: #000 !important;
  opacity: 0;
  transition: all 0.3s ease;
  &:hover {
    background-color: transparent;
    color: ${customTheme.light[100]} !important;
  }

  .image_block:hover & {
    opacity: 1;
  }
`;
