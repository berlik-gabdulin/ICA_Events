import styled from '@emotion/styled';
import Image from 'next/image';
import React, { useState } from 'react';
import { Container, Section, Title } from 'src/components/globalStyles';
import customTheme from 'src/theme/customTheme';
import { TReport, TReportsBlockProps } from 'src/utils/types';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import Button from '../Button';

const ReportsBlock: React.FC<{ block_title: string; content: TReportsBlockProps }> = ({
  block_title,
  content,
}) => {
  const { reports, title, buttonText } = content;

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentGallery, setCurrentGallery] = useState<TReport | null>(null);

  const openLightbox = (image: TReport) => {
    setCurrentGallery(image);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setCurrentGallery(null);
  };

  return (
    <Section style={{ backgroundColor: customTheme.main[100], padding: 0 }}>
      <ContainerGrid style={{ maxWidth: 1800 }}>
        <TextBlock>
          <TitleStyled>{title}</TitleStyled>
          <div>
            <Button type="button" variant="outlined">
              {buttonText}
            </Button>
          </div>
        </TextBlock>
        <ImageContainer>
          {Object.values(reports).map((image: TReport, index: number) => (
            <ImageBlock key={index} onClick={() => openLightbox(image)}>
              <ImageStyled
                src={image.preview}
                alt={image.gallery_title}
                layout="fill"
                className="ImageStyled"
              />
              <SquareTextBlock className="SquareTextBlock">
                <SquareSubtitle>{image.gallery_title}</SquareSubtitle>
                <SquareText>{`${image.location}, ${
                  image.countryInLocation ? image.countryInLocation : image.country
                }`}</SquareText>
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

const TitleStyled = styled(Title)`
  text-align: left;
`;

const ContainerGrid = styled(Container)`
  display: grid;
  grid-template-columns: 1fr 2fr;
  height: 100vh;
  max-height: 620px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
  }

  @media (max-width: 480px) {
    height: auto;
  }
`;

const TextBlock = styled.div`
  display: flex;
  max-width: 530px;
  flex-direction: column;
  justify-content: space-between;
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

const ImageStyled = styled(Image)`
  filter: grayscale(1);
  transition: all 0.3s ease-in-out;
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

  &:hover {
    cursor: pointer;
    .ImageStyled {
      filter: grayscale(0);
      transform: scale(1.2);
      img {
      }
    }
    .SquareTextBlock {
      height: 100px;
    }
  }

  @media (max-width: 480px) {
    &:first-child {
      grid-row: span 1;
    }
  }
`;

const SquareTextBlock = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 10px;
  transition: all 0.3s ease-in-out;
`;

const SquareSubtitle = styled.h3`
  margin: 0;
  font-size: 20px;
`;

const SquareText = styled.p`
  margin: 0;
  font-size: 16px;
`;
