// GalleryCard.tsx
import React from 'react';
import { Box, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { TGallery } from 'src/utils/types';
import styled from '@emotion/styled';
import ImagePreview from './ImagePreview';

type GalleryCardProps = {
  gallery: TGallery;
  onEdit: () => void;
  onDelete: (path: string) => void;
};

const GalleryCard: React.FC<GalleryCardProps> = ({ gallery, onEdit, onDelete }) => (
  <Box sx={{ width: 300, height: 200, position: 'relative' }}>
    <ImagePreview
      src={gallery.preview ? gallery.preview : '/assets/placeholder.jpg'}
      alt={gallery.gallery_title}
      width={300}
      height={200}
    />
    <Title>{gallery.gallery_title}</Title>
    <Box sx={{ position: 'absolute', top: 5, right: 5 }}>
      <IconButtonStyled onClick={onEdit}>
        <EditIcon />
      </IconButtonStyled>
    </Box>
    <Box sx={{ position: 'absolute', top: 5, right: 55 }}>
      <IconButtonStyled onClick={() => onDelete(gallery.path)}>
        <DeleteIcon />
      </IconButtonStyled>
    </Box>
  </Box>
);

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

const IconButtonStyled = styled(IconButton)`
  background-color: rgba(255, 255, 255, 0.6);
  &:hover {
    background-color: rgba(255, 255, 255, 0.8);
  }
`;
