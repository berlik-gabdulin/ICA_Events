import React from 'react';
import { Box } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import { TContactsBlock, TPageType, TSocialLinks } from 'src/utils/types';
import { SocialBox, Wrapper, PhotoBox, Text } from './styles';
import { Title } from 'src/components/globalStyles';
import Image from 'next/image';
import Link from 'next/link';

const ContactBlock: React.FC<TPageType<TContactsBlock> & { socialLinks: TSocialLinks }> = ({
  content,
  socialLinks,
}) => {
  const { contactsHtml, photo } = content;

  const hasActiveLink = Object.values(socialLinks).some((link) => link.isActive);

  return (
    <Box display="flex">
      <PhotoBox flex={1}>
        <Image src={photo} alt="Contacts" layout="fill" />
      </PhotoBox>
      <Wrapper flex={1}>
        <Title style={{ textAlign: 'left' }}>Contact Us</Title>
        <Text dangerouslySetInnerHTML={{ __html: contactsHtml }} />
        {hasActiveLink ? (
          <>
            <Title style={{ textAlign: 'left', marginTop: 140 }}>Get social</Title>
            <SocialBox display="flex">
              {socialLinks?.linkedin?.isActive ? (
                <Link href={socialLinks?.linkedin?.url}>
                  <a target="_blank" aria-label="LinkedIn">
                    <FontAwesomeIcon icon={faLinkedinIn} />
                  </a>
                </Link>
              ) : null}
              {socialLinks?.youtube?.isActive ? (
                <Link href={socialLinks?.youtube?.url}>
                  <a target="_blank" aria-label="YouTube">
                    <FontAwesomeIcon icon={faYoutube} />
                  </a>
                </Link>
              ) : null}
              {socialLinks?.facebook?.isActive ? (
                <Link href={socialLinks?.facebook?.url}>
                  <a target="_blank" aria-label="facebook">
                    <FontAwesomeIcon icon={faFacebookF} />
                  </a>
                </Link>
              ) : null}
              {socialLinks?.instagram?.isActive ? (
                <Link href={socialLinks?.instagram?.url}>
                  <a target="_blank" aria-label="instagram">
                    <FontAwesomeIcon icon={faInstagram} />
                  </a>
                </Link>
              ) : null}
            </SocialBox>
          </>
        ) : null}
      </Wrapper>
    </Box>
  );
};

export default ContactBlock;
