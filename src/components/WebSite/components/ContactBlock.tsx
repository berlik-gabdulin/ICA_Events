import React from 'react';
import { Box, IconButton } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faLinkedin, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { TContactsBlock, TPageType } from 'src/utils/types';

const ContactBlock: React.FC<TPageType<TContactsBlock>> = ({ block_title, content }) => {
  const { contactsHtml, socialLinks } = content;

  return (
    <Box display="flex">
      <Box flex={1}>
        <img src="your-image-url.jpg" alt="Contacts" />
      </Box>
      <Box flex={1}>
        <div dangerouslySetInnerHTML={{ __html: contactsHtml }} />

        <Box display="flex">
          {socialLinks?.linkedin?.isActive ? (
            <IconButton color="inherit">
              <FontAwesomeIcon icon={faLinkedin} />
            </IconButton>
          ) : null}
          {socialLinks?.youtube?.isActive ? (
            <IconButton color="inherit">
              <FontAwesomeIcon icon={faYoutube} />
            </IconButton>
          ) : null}
          {socialLinks?.facebook?.isActive ? (
            <IconButton color="inherit">
              <FontAwesomeIcon icon={faFacebook} />
            </IconButton>
          ) : null}
          {socialLinks?.instagram?.isActive ? (
            <IconButton color="inherit">
              <FontAwesomeIcon icon={faInstagram} />
            </IconButton>
          ) : null}
        </Box>
      </Box>
    </Box>
  );
};

export default ContactBlock;
