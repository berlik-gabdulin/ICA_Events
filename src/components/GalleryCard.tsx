// GalleryCard.tsx
import React from 'react';
import { Box, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { TGallery } from 'src/utils/types';
import Image from 'next/image';
import styled from '@emotion/styled';

type GalleryCardProps = {
  gallery: TGallery;
  onEdit: () => void;
};

const GalleryCard: React.FC<GalleryCardProps> = ({ gallery, onEdit }) => {
  console.log('Card Gallery', gallery);
  return (
    <Box sx={{ width: 300, height: 200, position: 'relative' }}>
      <ImageStyled src={gallery.preview} alt={gallery.gallery_title} layout="fill" />
      <Title>{gallery.gallery_title}</Title>
      <Box sx={{ position: 'absolute', top: 5, right: 5 }}>
        <IconButtonStyled onClick={onEdit}>
          <EditIcon />
        </IconButtonStyled>
      </Box>
    </Box>
  );
};

export default GalleryCard;

const Title = styled.span`
  position: absolute;
  display: block;
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
  bottom: 5px;
  left: 5px;
  right: 5px;
  font-size: 16px;
`;

const ImageStyled = styled(Image)`
  border-radius: 8px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
  }
`;

const IconButtonStyled = styled(IconButton)`
  background-color: rgba(255, 255, 255, 0.6);
  &:hover {
    background-color: rgba(255, 255, 255, 0.8);
  }
`;
