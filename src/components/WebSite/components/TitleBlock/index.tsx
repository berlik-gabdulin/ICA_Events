import React from 'react';
import { TPageType, TTitleBlock } from 'src/utils/types';
import BGBox from '../BGBox';
import Button from '../Button';
import { MainTitle } from 'src/components/globalStyles';
import { Buttons, ContainerStyles } from './styles';

const TitleBlock: React.FC<TPageType<TTitleBlock>> = ({ block_title, content }) => {
  const { title, buttons, bgImage } = content;

  const btnMargin = { margin: '0 16px' };

  return (
    <BGBox textAlign="center" bgImage={bgImage} containerStyles={ContainerStyles}>
      <MainTitle>{title}</MainTitle>
      <Buttons>
        {buttons?.events?.isActive ? (
          <Button variant="outlined" style={btnMargin}>
            {buttons.events.label}
          </Button>
        ) : null}
        {buttons?.stand?.isActive ? (
          <Button variant="outlined" style={btnMargin}>
            {buttons.stand.label}
          </Button>
        ) : null}
        {buttons?.contact?.isActive ? (
          <Button variant="outlined" style={btnMargin}>
            {buttons.contact.label}
          </Button>
        ) : null}
      </Buttons>
    </BGBox>
  );
};

export default TitleBlock;
