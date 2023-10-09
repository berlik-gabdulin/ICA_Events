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

export const EventCard = ({ event }: { event: TEvent }) => {
  const openInNewTab = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
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
          <Button
            onClick={() => openInNewTab(event.website)}
            customcolor={palette.light.primary.dark}
            style={BtnStyles}
          >
            Go to website
          </Button>
        </CardInner>
      </Card>
    </CardWrapper>
  );
};
