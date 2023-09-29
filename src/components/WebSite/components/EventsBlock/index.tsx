import React, { FC } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Container, Section, Title } from 'src/components/globalStyles';
import { Typography } from '@mui/material';
import { TEvent, TPageType } from 'src/utils/types';
import { EventCard } from '../EventCard';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Button from '../Button';
import { Arrow } from './styles';
import { useRouter } from 'next/router';

const EventsBlock: FC<TPageType<TEvent[]>> = ({ block_title, content }) => {
  const router = useRouter();

  const handleGoRoute = (route: string) => {
    router.push(route);
  };

  const settings = {
    dots: false,
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
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
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Section>
      <Container>
        <Title>{block_title}</Title>

        {content && content.length ? (
          <Slider {...settings}>
            {content.map((event, index) => (
              <EventCard key={index} event={event} />
            ))}
          </Slider>
        ) : (
          <Typography variant="body2">No data</Typography>
        )}

        <Button
          variant="outlined"
          style={{ margin: '60px auto 0' }}
          onClick={() => handleGoRoute('/events')}
        >
          All Events
        </Button>
      </Container>
    </Section>
  );
};

export default EventsBlock;
