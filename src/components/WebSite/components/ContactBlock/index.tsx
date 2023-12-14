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
import { SocialBox, Wrapper, PhotoBox, Text, SocialTitle } from './styles';
import { Path } from 'src/components/globalStyles';
import Image from 'next/image';
import Link from 'next/link';
import PathImg from 'public/assets/arc_light.png';
import { Title } from '../Title';
import { useScrollAnimation } from 'src/utils/useScrollAnimation';

const ContactBlock: React.FC<TPageType<TContactsBlock> & { socialLinks: TSocialLinks }> = ({
  content,
  socialLinks,
}) => {
  const imgRef = useScrollAnimation('animate__fadeInLeft');
  const text1Ref = useScrollAnimation('animate__fadeInRight', 0, 300);
  const text2Ref = useScrollAnimation('animate__fadeInRight', 0, 600);
  const { contactsHtml, photo } = content;

  const hasActiveLink = Object.values(socialLinks).some((link) => link.isActive);

  return (
    <Box display="flex">
      <PhotoBox ref={imgRef} flex={1}>
        <Image src={photo} alt="Contacts" layout="fill" />
      </PhotoBox>
      <Wrapper flex={1}>
        <Title style={{ textAlign: 'left' }}>Contact Us</Title>
        <Text dangerouslySetInnerHTML={{ __html: contactsHtml }} ref={text1Ref} />
        {hasActiveLink ? (
          <>
            <SocialTitle style={{ textAlign: 'left', marginTop: 50 }}>Get social</SocialTitle>

            <SocialBox display="flex" ref={text2Ref}>
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
        <Path style={{ maxWidth: '500px', margin: 'auto', zIndex: 1 }}>
          <Image src={PathImg} layout="fill" alt="Path" />
        </Path>
      </Wrapper>
    </Box>
  );
};

export default ContactBlock;
