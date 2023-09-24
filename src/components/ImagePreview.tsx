import styled from '@emotion/styled';
import { Box } from '@mui/material';
import Image from 'next/image';
import { FC } from 'react';
import { TImagePreviewProps } from 'src/utils/types';

const ImagePreview: FC<TImagePreviewProps> = ({
  src,
  alt = 'Image',
  width = '100%',
  height = 100,
}) => (
  <Box sx={{ width: width, height: height, position: 'relative', marginBottom: 3 }}>
    <ImageStyled
      src={src ? src : '/assets/placeholder.jpg'}
      alt={alt}
      layout="fill"
      objectFit="cover"
    />
  </Box>
);

export default ImagePreview;

const ImageStyled = styled(Image)`
  border-radius: 8px;
  margin-bottom: 15px;
  img {
    width: 100%;
    height: 100%;
  }
`;
