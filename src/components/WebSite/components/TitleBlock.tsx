import React from 'react';
import { Button, Typography, Box } from '@mui/material';
import { TPageType, TTitleBlock } from 'src/utils/types';
import BGBox from './BGBox';

const TitleBlock: React.FC<TPageType<TTitleBlock>> = ({ block_title, content }) => {
  const { title, buttons, bgImage } = content;

  return (
    <BGBox
      textAlign="center"
      bgImage={bgImage}
      styles={{
        height: 'calc(100vh - 200px) !important',
        maxHeight: '800px',
        minHeight: '300px',
        borderRadius: '40px',
        color: '#fff',
      }}
    >
      <Typography fontSize={68}>{title}</Typography>
      <Box mt={3}>
        {buttons?.events?.isActive ? (
          <Button variant="contained">{buttons.events.label}</Button>
        ) : null}
        {buttons?.stand?.isActive ? (
          <Button variant="contained">{buttons.stand.label}</Button>
        ) : null}
        {buttons?.contact?.isActive ? (
          <Button variant="contained">{buttons.contact.label}</Button>
        ) : null}
      </Box>
    </BGBox>
  );
};

export default TitleBlock;
