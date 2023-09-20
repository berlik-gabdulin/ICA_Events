import React, { useCallback, useState } from 'react';
import { Accept, useDropzone } from 'react-dropzone';
import { UseFormSetValue } from 'react-hook-form';
import styled from '@emotion/styled';
import ImageWrapper from '../ImageWrapper';

interface FileUploaderProps {
  inputName: string;
  setValue: UseFormSetValue<any>;
  folder?: string;
  prefix?: string;
  maxFiles?: number;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  inputName,
  setValue,
  folder,
  prefix,
  maxFiles = 1,
}) => {
  const [files, setFiles] = useState<string[]>([]);

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
        const response = await fetch(`/api/upload${folder ? `?folder=${folder}` : ''}`, {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();
        setFiles([...files, ...data.urls]);
        setValue(inputName, prefix === 'preview' ? data.urls[0] : data.urls);
      } catch (error) {
        console.error('Error uploading files:', error);
      }
    },
    [files, folder, inputName, setValue, prefix]
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
      <div>
        {files.map((fileUrl, index) => (
          <ImageWrapper
            key={index}
            url={fileUrl}
            onDelete={() => setFiles(files.filter((file) => file !== fileUrl))}
          />
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
