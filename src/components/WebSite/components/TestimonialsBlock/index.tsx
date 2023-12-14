import React, { FC } from 'react';
import Slider from 'react-slick';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { TPageType, TTestimonial } from 'src/utils/types';
import { Typography } from '@mui/material';
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
import { SectionLocation } from '../LocationBlock/styles';
import { useScrollAnimation } from 'src/utils/useScrollAnimation';
// import { Title } from '../Title';

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
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
        },
      },
    ],
  };

  const slidesRef = useScrollAnimation('animate__fadeInUp');
  const bgRef = useScrollAnimation('animate__fadeInDown', 200, 500);

  return (
    <SectionLocation>
      <BackgroundTextWrapper>
        <BackgroundText ref={bgRef}>
          <Image src={BgText} layout="fill" alt="" />
        </BackgroundText>
      </BackgroundTextWrapper>
      <SliderContainer ref={slidesRef}>
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
    </SectionLocation>
  );
};

export default TestimonialsBlock;
