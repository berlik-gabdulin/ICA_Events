import React, { FC } from 'react';
import Slider from 'react-slick';
import { Container, Section } from 'src/components/globalStyles';
import { Typography } from '@mui/material';
import { TEvent, TEventsBlock, TPageType } from 'src/utils/types';
import { EventCard } from '../EventCard';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Arrow, ButtonStyled } from './styles';
import { useRouter } from 'next/router';
import customTheme from 'src/theme/customTheme';
import { Title } from '../Title';
import { useScrollAnimation } from 'src/utils/useScrollAnimation';

const EventsBlock: FC<TPageType<TEventsBlock>> = ({ block_title, content }) => {
  const router = useRouter();

  const { title, events, eventWebsiteBtn, eventPromoBtn, viewAllBtn } = content;

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

  const slidesRef = useScrollAnimation('animate__fadeInUp');
  const btnRef = useScrollAnimation('animate__fadeInDown');

  return (
    <Section>
      <Container>
        <Title style={{ color: customTheme.main[100] }}>{title}</Title>

        {events && events.length ? (
          <div ref={slidesRef}>
            <Slider {...settings}>
              {events.map((event: TEvent, index: number) => (
                <EventCard key={index} event={event} buttons={{ eventWebsiteBtn, eventPromoBtn }} />
              ))}
            </Slider>
          </div>
        ) : (
          <Typography variant="body2">There is no upcomming events...</Typography>
        )}

        <div ref={btnRef}>
          <ButtonStyled
            variant="outlined"
            style={{ margin: '60px auto 0' }}
            customcolor={customTheme.main[100]}
            onClick={() => handleGoRoute('/events')}
          >
            {viewAllBtn}
          </ButtonStyled>
        </div>
      </Container>
    </Section>
  );
};

export default EventsBlock;
