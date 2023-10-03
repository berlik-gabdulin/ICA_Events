import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { UseFormSetValue } from 'react-hook-form';
import styled from '@emotion/styled';
import ImageWrapper from '../ImageWrapper';
import { Box } from '@mui/material';
import { uploadFiles } from 'src/utils/api';
import { TUpload } from 'src/utils/types';

interface FileUploaderProps {
  inputName: string;
  setValue: UseFormSetValue<any>;
  folder?: string;
  prefix?: string;
  preview?: boolean;
  maxFiles?: number;
  onUpload?: (data?: any) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  inputName,
  setValue,
  folder,
  prefix,
  preview = true,
  maxFiles = 1,
  onUpload,
}) => {
  const [files, setFiles] = useState<TUpload[]>([]);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const formData = new FormData();

      acceptedFiles.forEach((file) => {
        const newFile = new File([file], `${prefix}_${file.name}`, {
          type: file.type,
        });
        formData.append(inputName, newFile);
      });

      try {
        const data = await uploadFiles(folder || 'default', formData);

        setFiles([...files, ...data.files]);
        setValue(inputName, maxFiles === 1 ? data.urls[0] : data.urls);
        if (onUpload) onUpload(data.files);
      } catch (error) {
        console.error('Error uploading files:', error);
      }
    },
    [files, folder, inputName, setValue, prefix, onUpload, maxFiles]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: true,
    maxFiles: maxFiles,
  });

  return (
    <Wrapper {...getRootProps()}>
      <input {...getInputProps()} />
      <p>Drag 'n' drop some files here, or click to select files</p>

      <GridBox marginTop={3}>
        {files.map((file, index) => (
          <ImageWrapper
            key={index}
            url={file.url}
            fileName={file.name && !preview ? file.name : undefined}
            onDelete={() => setFiles(files.filter((item) => item.url !== file.url))}
          />
        ))}
      </GridBox>
    </Wrapper>
  );
};

export default FileUploader;

const Wrapper = styled.div`
  box-shadow: rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px;
  background-color: #fff;
  z-index: 100;
  margin-bottom: 30px;
  padding: 16px 14px;
  border: 1px solid #fff;
  border-radius: 8px;

  &:hover {
    background-color: #eee3;
    border: 1px solid #ddd;
    cursor: pointer;
  }
`;

const GridBox = styled(Box)`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
`;
