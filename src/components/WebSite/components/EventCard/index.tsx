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

export const EventCard = ({ event }: any) => {
  const openInNewTab = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <CardWrapper>
      <Card>
        <CardImgWrp>
          <Image src={event.image_profile} alt={event.title} width={390} height={195} />
        </CardImgWrp>
        <CardInner>
          <CardTitle>{event.title}</CardTitle>
          <CardText>{event.description}</CardText>
          <CardItemDate>{event.beginDate}</CardItemDate>
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
