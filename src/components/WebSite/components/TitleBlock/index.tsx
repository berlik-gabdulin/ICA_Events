import React, { useState, useEffect } from 'react';
import { TPageType, TTitleBlock } from 'src/utils/types';
import BGBox from '../BGBox';
import Button from '../Button';
import { MainTitle } from 'src/components/globalStyles';
import { Buttons, ContainerStyles } from './styles';
import ContactModal from 'src/components/ContactModal';
import { useRouter } from 'next/router';

const TitleBlock: React.FC<TPageType<TTitleBlock>> = ({ block_title, content }) => {
  const { title, buttons, bgImage,bgImageMobile } = content;
  const router = useRouter();

  const handleGoRoute = (route: string) => {
    router.push(route);
  };

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [isMobile, setIsMobile] = useState(false); // Новое состояние для определения, является ли экран мобильным

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Устанавливаем состояние в зависимости от ширины экрана
    };

    handleResize(); // Вызываем функцию при монтировании компонента

    window.addEventListener('resize', handleResize); // Добавляем слушатель события при изменении размера окна

    return () => {
      window.removeEventListener('resize', handleResize); // Удаляем слушатель события при размонтировании компонента
    };
  }, []);

  return (
    <BGBox
      textAlign="center"
      bgImage={isMobile ? bgImageMobile : bgImage}
      containerStyles={ContainerStyles}
    >
      <MainTitle>{title}</MainTitle>
      <Buttons gap="8px">
        {buttons?.events?.isActive ? (
          <Button variant="outlined" type="button" onClick={() => handleGoRoute('/events')}>
            {buttons.events.label}
          </Button>
        ) : null}
        {buttons?.stand?.isActive ? (
          <Button variant="outlined" type="button" onClick={handleOpen}>
            {buttons.stand.label}
          </Button>
        ) : null}
        {buttons?.contact?.isActive ? (
          <Button variant="outlined" type="button" onClick={() => handleGoRoute('/contacts')}>
            {buttons.contact.label}
          </Button>
        ) : null}
      </Buttons>
      <ContactModal
        open={open}
        onClose={handleClose}
        countries={[]}
        industries={[]}
        exhibitions={[]}
      />
    </BGBox>
  );
};

export default TitleBlock;
