import React, { useCallback, useState } from 'react';
import { Accept, useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { UseFormSetValue } from 'react-hook-form';
import styled from '@emotion/styled';

interface FileUploaderProps {
  inputName: string;
  setValue: UseFormSetValue<any>;
  folder?: string;
  maxFiles?: number;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  inputName,
  setValue,
  folder,
  maxFiles = 1,
}) => {
  const [files, setFiles] = useState<string[]>([]);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const formData = new FormData();
      formData.append(inputName, acceptedFiles[0]);

      try {
        const response = await fetch(`/api/upload${folder ? `?folder=${folder}` : null}`, {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();
        setFiles([...files, ...data.urls]);
        setValue(inputName, data.urls[0]);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    },
    [files, folder, inputName, setValue]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept:
      'image/jpeg, image/png, application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-excel, application/zip, image/svg+xml' as unknown as Accept,
    maxFiles: maxFiles,
  });

  const removeFile = async (url: string) => {
    try {
      await fetch(`/api/delete-file?fileUrl=${url}`, {
        method: 'DELETE',
      });
      setFiles(files.filter((file) => file !== url));
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  return (
    <Wrapper {...getRootProps()}>
      <input {...getInputProps()} />
      <p>Drag 'n' drop some files here, or click to select files</p>
      <div>
        {files.map((fileUrl, index) => (
          <ImageWrapper key={index}>
            <Image src={fileUrl} alt={`Preview ${index}`} width={100} height={100} />
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                removeFile(fileUrl);
              }}
            >
              <CloseIcon />
            </IconButton>
          </ImageWrapper>
        ))}
      </div>
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

const ImageWrapper = styled.div`
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
