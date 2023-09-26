import React from 'react';
import { TPageType, TTitleBlock } from 'src/utils/types';
import BGBox from '../BGBox';
import Button from '../Button';
import { MainTitle } from 'src/components/globalStyles';
import { Buttons, ContainerStyles } from './styles';

const TitleBlock: React.FC<TPageType<TTitleBlock>> = ({ block_title, content }) => {
  const { title, buttons, bgImage } = content;

  return (
    <BGBox textAlign="center" bgImage={bgImage} containerStyles={ContainerStyles}>
      <MainTitle>{title}</MainTitle>
      <Buttons gap="8px">
        {buttons?.events?.isActive ? (
          <Button variant="outlined" type="button">
            {buttons.events.label}
          </Button>
        ) : null}
        {buttons?.stand?.isActive ? (
          <Button variant="outlined" type="button">
            {buttons.stand.label}
          </Button>
        ) : null}
        {buttons?.contact?.isActive ? (
          <Button variant="outlined" type="button">
            {buttons.contact.label}
          </Button>
        ) : null}
      </Buttons>
    </BGBox>
  );
};

export default TitleBlock;
