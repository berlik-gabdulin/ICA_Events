import React, { FC } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Section } from 'src/components/globalStyles';
import { Container, Typography } from '@mui/material';
import { TEvent, TPageType } from 'src/utils/types';

const EventsBlock: FC<TPageType<TEvent[]>> = ({ block_title, content }) => {
  // const { events } = content;

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };

  return (
    <Section>
      <Typography variant="h2">{block_title}</Typography>
      <Container>
        {content && content.length ? (
          <Slider {...settings}>
            {content.map((event, index) => (
              <div key={index}>
                <img src={event.image_profile} alt={event.title} />
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <p>{`${event.beginDate} - ${event.endDate}`}</p>
                <p>{event.location}</p>
                <a href={event.website}>Go to website</a>
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

export default EventsBlock;
