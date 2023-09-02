import React from 'react';
import { Typography, Box } from '@mui/material';
import { TAboutTab, TPageType } from 'src/utils/types';

const AboutBlock: React.FC<TPageType<TAboutTab>> = ({ block_title, content }) => {
  const { text, bullets } = content;
  return (
    <Box>
      <Typography variant="h2">{block_title}</Typography>
      <div dangerouslySetInnerHTML={{ __html: text }} />
      <Box>
        {bullets
          ? Object.entries(bullets).map(([label, value]) => (
              <Box key={label}>
                <Typography variant="h4">{value}</Typography>
                <Typography variant="body2">{label}</Typography>
              </Box>
            ))
          : null}
      </Box>
    </Box>
  );
};

export default AboutBlock;
