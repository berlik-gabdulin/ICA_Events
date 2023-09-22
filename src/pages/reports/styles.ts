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
  &:nth-of-type(odd) {
    background-color: #fff;
    h2 {
      color: ${customTheme.main[100]};
    }
  }
  &:nth-of-type(even) {
    background-color: ${customTheme.main[20]};

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
`;

// Контейнер для квадрата
export const SquareContainer = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 100%;
  overflow: hidden;
`;

// Содержимое квадрата
export const SquareContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

// Изображение
export const SquareImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

// Заголовок
export const SquareTitle = styled.h2`
  font-size: 2rem;
  text-align: center;
  margin: auto;
`;

// Блок с текстом на дне
export const SquareTextBlock = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 10px;
`;

export const SquareSubtitle = styled.h3`
  margin: 0;
`;

export const SquareText = styled.span`
  margin: 0;
`;