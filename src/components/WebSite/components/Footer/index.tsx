import React, { FC, useState, useEffect } from 'react';
import { FooterWrapper, DialogStyled, CloseButton } from './style';
import { TFooter } from 'src/utils/types';

const Footer: FC<{ content: TFooter }> = ({ content }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { footer, privacyPolicy } = content;

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  const handleOpen = () => {
    setIsDialogOpen(true);
  };

  useEffect(() => {
    const link = document.querySelector('a[href="#privacyModal"]');
    if (link) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        handleOpen();
      });
    }

    return () => {
      if (link) {
        link.removeEventListener('click', handleOpen);
      }
    };
  }, [footer, privacyPolicy]);

  return (
    <>
      <FooterWrapper dangerouslySetInnerHTML={{ __html: footer }} />
      <DialogStyled open={isDialogOpen} onClose={handleClose}>
        <div dangerouslySetInnerHTML={{ __html: privacyPolicy }} />
        <CloseButton type="button" onClick={handleClose}>
          Close
        </CloseButton>
      </DialogStyled>
    </>
  );
};

export default Footer;
