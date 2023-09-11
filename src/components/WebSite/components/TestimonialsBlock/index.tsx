import React, { FC } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { TPageType, TTestimonial } from 'src/utils/types';
import { Typography } from '@mui/material';
import { Section, Title } from 'src/components/globalStyles';
import {
  SliderContainer,
  Author,
  Slide,
  Arrow,
  QuoteImage,
  QuoteImageRotate,
  BackgroundText,
  BackgroundTextWrapper,
} from './styles';
import Quote from './quote.svg';
import BgText from './icaevents.svg';
import Image from 'next/image';

const TestimonialsBlock: FC<TPageType<TTestimonial[]>> = ({ block_title, content }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: (
      <Arrow>
        <ArrowForwardIosIcon color="secondary" />
      </Arrow>
    ),
    prevArrow: (
      <Arrow>
        <ArrowForwardIosIcon color="secondary" />
      </Arrow>
    ),
  };

  return (
    <Section style={{ backgroundColor: '#cddcdc' }}>
      <BackgroundTextWrapper>
        <BackgroundText>
          <Image src={BgText} layout="fill" alt="" />
        </BackgroundText>
      </BackgroundTextWrapper>
      <SliderContainer>
        {/* <Title>{block_title}</Title> */}
        {content && content.length ? (
          <Slider {...settings}>
            {content.map((testimonial: TTestimonial, index: number) => (
              <Slide key={index}>
                <QuoteImage>
                  <Image src={Quote} alt="" />
                </QuoteImage>
                <div dangerouslySetInnerHTML={{ __html: testimonial.testimonial }} />
                <Author> - {testimonial.author}</Author>
                <QuoteImageRotate>
                  <Image src={Quote} alt="" />
                </QuoteImageRotate>
              </Slide>
            ))}
          </Slider>
        ) : (
          <Typography variant="body2">No data</Typography>
        )}
      </SliderContainer>
    </Section>
  );
};

export default TestimonialsBlock;
