import styled from '@emotion/styled';
import { FC } from 'react';
import customTheme from 'src/theme/customTheme';
import { FONT_PRIMARY_BOLD } from 'src/theme/typography';

const SquareComponent: FC<{
  imageSrc?: string;
  title?: string;
  subtitle?: string;
  text?: string;
  onClick?: () => void;
}> = ({ imageSrc, title, subtitle, text, onClick }) => {
  const isImage = !!imageSrc;

  return (
    <SquareContainer onClick={onClick} isImage={isImage}>
      <SquareContent>
        {isImage ? (
          <SquareImage src={imageSrc} alt="Description" className="SquareImage" />
        ) : (
          <SquareTitle>{title}</SquareTitle>
        )}
        {subtitle && (
          <SquareTextBlock className="SquareTextBlock">
            <SquareSubtitle>{subtitle}</SquareSubtitle>
            <SquareText>{text}</SquareText>
          </SquareTextBlock>
        )}
      </SquareContent>
    </SquareContainer>
  );
};

export default SquareComponent;

// Контейнер для квадрата
const SquareContainer = styled.div<{ isImage: boolean }>`
  position: relative;
  width: 100%;
  padding-bottom: 100%;
  overflow: hidden;
  background-color: ${customTheme.main[100]};
  cursor: ${(props) => (props.isImage ? 'pointer' : 'inherit')};

  &:hover .SquareTextBlock {
    background-color: rgba(0, 0, 0, 0.7);
  }
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
  margin: auto;
  margin-top: 25px;
  padding: 0 33px;
  font-size: 52px;
  text-align: left;
  color: ${customTheme.light[100]};
`;

// Блок с текстом на дне
export const SquareTextBlock = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  align-items: flex-start;
  background-color: rgba(0, 0, 0, 0.3);
  color: white;
  padding: 12px 40px;
  font-family: ${FONT_PRIMARY_BOLD};
  transition: all 0.3s ease-in-out;
`;

export const SquareSubtitle = styled.h3`
  margin: 0;
  font-size: 24px;
`;

export const SquareText = styled.span`
  margin: 0;
  font-size: 16px;
`;
