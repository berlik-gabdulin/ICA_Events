// EventCard.js
import React from 'react';
import {
  BtnStyles,
  Card,
  CardImgWrp,
  CardInner,
  CardItemAddress,
  CardItemDate,
  CardText,
  CardTitle,
  CardWrapper,
} from './styles';
import Image from 'next/image';
import Button from '../Button';
import palette from 'src/theme/palette';
import { TEvent } from 'src/utils/types';
import { useDispatch } from 'react-redux';
import { setSelectedIndustry, openModal } from 'src/redux/slices/contactModalSlice';

export const EventCard = ({ event, isPromo = false }: { event: TEvent; isPromo?: boolean }) => {
  const dispatch = useDispatch();

  const openInNewTab = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const bookAStand = (industry: string) => {
    dispatch(setSelectedIndustry(industry)); // Устанавливаем выбранную индустрию
    dispatch(openModal()); // Открываем модальное окно
  };

  return (
    <CardWrapper>
      <Card>
        <CardImgWrp>
          <Image src={event.image_profile} alt={event.title} width={390} height={195} priority />
        </CardImgWrp>
        <CardInner>
          <CardTitle>{event.title}</CardTitle>
          <CardText>{event.description}</CardText>
          <CardItemDate>{event.dateRange}</CardItemDate>
          <CardItemAddress>{event.location}</CardItemAddress>
          {isPromo ? (
            <Button
              onClick={() => bookAStand(event.industry)} // Вызываем новую функцию при нажатии на кнопку
              customcolor={palette.light.primary.dark}
              style={BtnStyles}
            >
              Book a stand
            </Button>
          ) : (
            <Button
              onClick={() => openInNewTab(event.website)}
              customcolor={palette.light.primary.dark}
              style={BtnStyles}
            >
              Go to website
            </Button>
          )}
        </CardInner>
      </Card>
    </CardWrapper>
  );
};
