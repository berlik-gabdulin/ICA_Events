import React, { useState, useEffect, useCallback } from 'react';
import { TEvent, TPageType, TTitleBlock } from 'src/utils/types';
import BGBox from '../BGBox';
import Button from '../Button';
import { MainTitle } from 'src/components/globalStyles';
import { Buttons, ContainerStyles } from './styles';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { openModal } from 'src/redux/slices/contactModalSlice';
import { useScrollAnimation } from 'src/utils/useScrollAnimation';

type TitleBlockProps = TPageType<TTitleBlock> & {
  events: TEvent[];
};

const TitleBlock: React.FC<TitleBlockProps> = ({ block_title, content, events }) => {
  const { title, buttons, bgImage, bgImageMobile } = content;
  const router = useRouter();

  const titleRef = useScrollAnimation('animate__fadeInUp');
  const button1Ref = useScrollAnimation('animate__fadeInDown', 0, 200);
  const button2Ref = useScrollAnimation('animate__fadeInDown', 0, 400);
  const button3Ref = useScrollAnimation('animate__fadeInDown', 0, 600);

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
      <Button variant="outlined" type="button" onClick={onClick} className="animate__animated">
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
      style={{ padding: 0 }}
    >
      <MainTitle ref={titleRef} className="animate__animated" style={{ marginBottom: '150px' }}>
        {title}
      </MainTitle>
      <Buttons gap="8px">
        <div ref={button1Ref} style={{ visibility: 'hidden' }}>
          {buttons?.events?.isActive &&
            renderButton('events', buttons.events.label, () => handleGoRoute('/events'))}
        </div>
        <div ref={button2Ref} style={{ visibility: 'hidden' }}>
          {buttons?.stand?.isActive && renderButton('stand', buttons.stand.label, handleOpen)}
        </div>
        <div ref={button3Ref} style={{ visibility: 'hidden' }}>
          {buttons?.contact?.isActive &&
            renderButton('contact', buttons.contact.label, () => handleGoRoute('/contacts'))}
        </div>
      </Buttons>
    </BGBox>
  );
};

export default TitleBlock;
