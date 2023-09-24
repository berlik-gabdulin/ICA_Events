import React from 'react';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import styled from '@emotion/styled';
import Image from 'next/image';
import { removeFS } from 'src/utils/api';

type ImageWrapperProps = {
  url: string;
  fileName?: string;
  onDelete: () => void;
};

const ImageWrapper: React.FC<ImageWrapperProps> = ({ url, fileName, onDelete }) => (
  <Wrapper>
    {!fileName ? (
      <Image src={url} alt="Preview" width={100} height={100} />
    ) : (
      <FileName>{fileName}</FileName>
    )}
    <IconButton
      onClick={async (e) => {
        e.stopPropagation();
        await removeFS({ fileUrl: url });
        onDelete();
      }}
    >
      <CloseIcon />
    </IconButton>
  </Wrapper>
);

export default ImageWrapper;

const Wrapper = styled.div`
  position: relative;
  width: 100px;
  margin-top: 30px;
  img {
    border-radius: 8px;
    object-fit: cover;
  }
  button {
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(50%, -50%);
    background: #fff;
    box-shadow: rgba(145, 158, 171, 0.2) 0px 0px 2px 0px,
      rgba(145, 158, 171, 0.12) 0px 12px 24px -4px;
    &:hover {
      background-color: #eee;
      cursor: pointer;
    }
  }
`;

const FileName = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  font-size: 14px;
  padding: 10px;
  border-radius: 8px;
  box-shadow: rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;
