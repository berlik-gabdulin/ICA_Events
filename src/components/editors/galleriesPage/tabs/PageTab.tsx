import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Box, Stack } from '@mui/material';
import { fetchPageBlock, updatePageBlock } from 'src/utils/api';
import useSnackbar from 'src/hooks/useSnackbar';
import Input from 'src/components/Input';
import FileUploader from 'src/components/upload/FileUploader';
import { TGalleries, TGallery } from 'src/utils/types';
import GalleryCard from 'src/components/GalleryCard';
import GalleryModal from 'src/components/GalleryModal';
import Image from 'next/image';
import Button from 'src/components/Button';
import styled from '@emotion/styled';

type FormData = {
  galleries: TGalleries;
};

export const InitialGallery = {
  id: '',
  gallery_title: '',
  country: '',
  preview: '',
  year: '',
  location: '',
  urls: [],
  path: '',
  isNew: true,
};

const PageTab: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedGallery, setSelectedGallery] = useState<TGallery>(InitialGallery);
  const { register, handleSubmit, setValue, getValues, watch } = useForm<FormData>();
  const { showError, showSuccess } = useSnackbar();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPageBlock('galleries', 'page');
      setValue('galleries', JSON.parse(data.content));
      setLoading(false);
    };

    fetchData();
  }, [setValue]);

  const handleCloseModal = (updatedGallery?: TGallery) => {
    if (updatedGallery) {
      const currentGalleries = getValues('galleries.galleries');
      let newGalleries;

      const index = currentGalleries.findIndex((g) => g.id === updatedGallery.id);
      if (index !== -1) {
        // Обновляем существующую галерею
        newGalleries = [...currentGalleries];
        newGalleries[index] = updatedGallery;
      } else {
        // Добавляем новую галерею
        newGalleries = [...currentGalleries, updatedGallery];
      }

      setValue('galleries.galleries', newGalleries);
    }
    setSelectedGallery(InitialGallery);
    setOpenModal(false);
  };

  const handleEditGallery = (gallery: TGallery) => {
    setSelectedGallery(gallery);
    setOpenModal(true);
  };

  const handleSave: SubmitHandler<FormData> = async (formData) => {
    console.log('Saved');
    try {
      setLoading(true);
      await updatePageBlock('galleries', 'page', { content: JSON.stringify(formData.galleries) });
      showSuccess('Successfully saved!');
      setLoading(false);
    } catch (error) {
      showError('An error occurred');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleSave)}>
      {!loading ? (
        <>
          <FileUploader
            inputName="galleries.image"
            setValue={setValue}
            folder="reports"
            prefix="preview"
          />
          {watch('galleries.image') ? (
            <Box sx={{ width: '100%', height: 200, position: 'relative', marginBottom: 3 }}>
              <ImageStyled
                src={getValues('galleries.image')}
                alt="Header Background"
                layout="fill"
                style={{ objectFit: 'cover', borderRadius: 8 }}
              />
            </Box>
          ) : null}
          <Input
            label="Image"
            shrink={getValues('galleries.image')}
            fullWidth
            {...register('galleries.image')}
          />
          <Button
            variant="contained"
            color="primary"
            type="button"
            onClick={() => {
              setSelectedGallery(InitialGallery);
              setOpenModal(true);
            }}
          >
            Add New Gallery
          </Button>
          <Stack direction="row" spacing={2} marginBottom={3} marginTop={3}>
            {getValues('galleries.galleries').map((gallery: TGallery, index: number) => (
              <GalleryCard
                key={index}
                gallery={gallery}
                onEdit={() => handleEditGallery(gallery)}
              />
            ))}
          </Stack>
          <GalleryModal open={openModal} onClose={handleCloseModal} gallery={selectedGallery} />
        </>
      ) : (
        <p>Loading</p>
      )}
      <Button variant="contained" color="primary">
        Save
      </Button>
    </form>
  );
};

export default PageTab;

const ImageStyled = styled(Image)`
  border-radius: 8px;
  object-fit: cover !important;
  img {
    width: 100%;
    height: 100%;
  }
`;
