import styled from '@emotion/styled';
import React, { useState } from 'react';
import { Container, Section } from 'src/components/globalStyles';
import customTheme from 'src/theme/customTheme';
import { TReportProps, TReportsBlockProps } from 'src/utils/types';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

const ReportsBlock: React.FC<TReportsBlockProps> = ({ reports, title }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentGallery, setCurrentGallery] = useState<TReportProps | null>(null);

  const openLightbox = (image: TReportProps) => {
    setCurrentGallery(image);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setCurrentGallery(null);
  };

  return (
    <Section style={{ backgroundColor: customTheme.main[100] }}>
      <ContainerGrid>
        <TextBlock>{title}</TextBlock>
        <ImageContainer>
          {reports.map((image: TReportProps, index: number) => (
            <ImageBlock key={index} onClick={() => openLightbox(image)}>
              <img src={image.urls[0]} alt={image.alt} />{' '}
              {/* Показываем первое изображение из массива */}
              <SquareTextBlock>
                <SquareSubtitle>{image.subtitle}</SquareSubtitle>
                <SquareText>{image.text}</SquareText>
              </SquareTextBlock>
            </ImageBlock>
          ))}
        </ImageContainer>

        {lightboxOpen && currentGallery && (
          <Lightbox
            open={lightboxOpen}
            close={closeLightbox}
            slides={currentGallery.urls.map((url) => ({ src: url }))}
          />
        )}
      </ContainerGrid>
    </Section>
  );
};

export default ReportsBlock;

const ContainerGrid = styled(Container)`
  display: grid;
  grid-template-columns: 1fr 2fr;
  height: 100vh;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
  }

  @media (max-width: 480px) {
    height: auto;
  }
`;

const TextBlock = styled.div`
  background-color: ${customTheme.main[100]};
  padding: 20px;
`;

const ImageContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
  }
`;

const ImageBlock = styled.div`
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &:first-child {
    grid-row: span 2;
  }

  @media (max-width: 480px) {
    &:first-child {
      grid-row: span 1;
    }
  }
`;

const SquareTextBlock = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 10px;
`;

const SquareSubtitle = styled.h3`
  margin: 0;
  font-size: 20px;
`;

const SquareText = styled.p`
  margin: 0;
  font-size: 16px;
`;
