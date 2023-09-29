import React, { useState } from 'react';
import { TPageType, TTitleBlock } from 'src/utils/types';
import BGBox from '../BGBox';
import Button from '../Button';
import { MainTitle } from 'src/components/globalStyles';
import { Buttons, ContainerStyles } from './styles';
import ContactModal from 'src/components/ContactModal';
import { useRouter } from 'next/router';

const TitleBlock: React.FC<TPageType<TTitleBlock>> = ({ block_title, content }) => {
  const { title, buttons, bgImage } = content;
  const router = useRouter();

  const handleGoRoute = (route: string) => {
    router.push(route);
  };

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <BGBox textAlign="center" bgImage={bgImage} containerStyles={ContainerStyles}>
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
