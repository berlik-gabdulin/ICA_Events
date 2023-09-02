import React, { FC } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { TPageType, TTestimonial } from 'src/utils/types';
import { Container, Typography } from '@mui/material';
import { Section } from 'src/components/globalStyles';

const TestimonialsBlock: FC<TPageType<TTestimonial[]>> = ({ block_title, content }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Section>
      <Container>
        <Typography variant="h2">{block_title}</Typography>
        {content && content.length ? (
          <Slider {...settings}>
            {content.map((testimonial: TTestimonial, index: number) => (
              <div key={index}>
                <div dangerouslySetInnerHTML={{ __html: testimonial.testimonial }} />
                <h3> - {testimonial.author}</h3>
              </div>
            ))}
          </Slider>
        ) : (
          <Typography variant="body2">No data</Typography>
        )}
      </Container>
    </Section>
  );
};

export default TestimonialsBlock;
