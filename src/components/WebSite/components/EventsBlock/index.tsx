import React, { FC } from 'react';
import Slider from 'react-slick';
import { Container, Section, Title } from 'src/components/globalStyles';
import { Typography } from '@mui/material';
import { TEvent, TPageType } from 'src/utils/types';
import { EventCard } from '../EventCard';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Arrow, ButtonStyled } from './styles';
import { useRouter } from 'next/router';
import customTheme from 'src/theme/customTheme';

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
          arrows: false,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Section>
      <Container>
        <Title color={customTheme.main[100]}>{block_title}</Title>

        {content && content.length ? (
          <Slider {...settings}>
            {content.map((event, index) => (
              <EventCard key={index} event={event} />
            ))}
          </Slider>
        ) : (
          <Typography variant="body2">There is no upcomming events...</Typography>
        )}

        <ButtonStyled
          variant="outlined"
          style={{ margin: '60px auto 0' }}
          customcolor={customTheme.main[100]}
          onClick={() => handleGoRoute('/events')}
        >
          All Events
        </ButtonStyled>
      </Container>
    </Section>
  );
};

export default EventsBlock;
