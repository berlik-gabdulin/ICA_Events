import React, { useState, useEffect, useCallback } from 'react';
import { TEvent, TPageType, TTitleBlock } from 'src/utils/types';
import BGBox from '../BGBox';
import Button from '../Button';
import { MainTitle } from 'src/components/globalStyles';
import { Buttons, ContainerStyles } from './styles';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { openModal } from 'src/redux/slices/contactModalSlice';

type TitleBlockProps = TPageType<TTitleBlock> & {
  events: TEvent[];
};

const TitleBlock: React.FC<TitleBlockProps> = ({ block_title, content, events }) => {
  const { title, buttons, bgImage, bgImageMobile } = content;
  const router = useRouter();

  const dispatch = useDispatch();

  const handleOpen = useCallback(() => {
    dispatch(openModal());
  }, [dispatch]);

  const handleGoRoute = useCallback(
    (route: string) => {
      router.push(route);
    },
    [router]
  );

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const renderButton = useCallback(
    (type: string, label: string, onClick: () => void) => (
      <Button variant="outlined" type="button" onClick={onClick}>
        {label}
      </Button>
    ),
    []
  );

  return (
    <BGBox
      textAlign="center"
      bgImage={isMobile ? bgImageMobile : bgImage}
      containerStyles={ContainerStyles}
    >
      <MainTitle>{title}</MainTitle>
      <Buttons gap="8px">
        {buttons?.events?.isActive &&
          renderButton('events', buttons.events.label, () => handleGoRoute('/events'))}
        {buttons?.stand?.isActive && renderButton('stand', buttons.stand.label, handleOpen)}
        {buttons?.contact?.isActive &&
          renderButton('contact', buttons.contact.label, () => handleGoRoute('/contacts'))}
      </Buttons>
    </BGBox>
  );
};

export default TitleBlock;
