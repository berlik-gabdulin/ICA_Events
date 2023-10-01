import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
} from '@mui/material';
import { fetchPageBlock, removeFS, updatePageBlock } from 'src/utils/api';
import useSnackbar from 'src/hooks/useSnackbar';
import Input from 'src/components/Input';
import FileUploader from 'src/components/upload/FileUploader';
import { TReports, TReport } from 'src/utils/types';
import GalleryCard from 'src/components/GalleryCard';
import GalleryModal from 'src/components/GalleryModal';
import Button from 'src/components/Button';
import ImagePreview from 'src/components/ImagePreview';

type FormData = {
  galleries: TReports;
};

export const InitialGallery = {
  id: '',
  gallery_title: '',
  country: '',
  countryInLocation: '',
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
  const [openDialog, setOpenDialog] = useState(false);
  const [toBeDeleted, setToBeDeleted] = useState<TReport | null>(null);
  const [selectedGallery, setSelectedGallery] = useState<TReport | null>(null);
  const { register, handleSubmit, setValue, getValues } = useForm<FormData>();
  const { showError, showSuccess } = useSnackbar();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPageBlock('galleries', 'page');
      setValue('galleries', JSON.parse(data.content));
      setLoading(false);
    };

    fetchData();
  }, [setValue]);

  const handleCloseModal = (updatedGallery?: TReport) => {
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
    setSelectedGallery(null);
    setOpenModal(false);

    handleSubmit(handleSave)();
  };

  const handleEditGallery = (gallery: TReport) => {
    setSelectedGallery(gallery);
    setOpenModal(true);
  };

  const handleDeleteGallery = async (gallery: TReport) => {
    await removeFS({ folder: `galleries/${gallery.path}` });

    const galleries = getValues('galleries.galleries').filter((item) => item.id !== gallery.id);

    setValue('galleries.galleries', galleries);
    setOpenDialog(false);
    handleSubmit(handleSave)();
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
          <ImagePreview src={getValues('galleries.image')} alt="Header Background" height={200} />
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
          <Stack direction="row" spacing={2} marginBottom={3} marginTop={3} flexWrap="wrap">
            {getValues('galleries.galleries').map((gallery: TReport, index: number) => (
              <GalleryCard
                key={index}
                gallery={gallery}
                onEdit={() => handleEditGallery(gallery)}
                onDelete={() => {
                  setToBeDeleted(gallery);
                  setOpenDialog(true);
                }}
              />
            ))}
          </Stack>

          {openModal && selectedGallery ? (
            <GalleryModal open={openModal} onClose={handleCloseModal} gallery={selectedGallery} />
          ) : null}
        </>
      ) : (
        <p>Loading</p>
      )}
      <Button variant="contained" color="primary">
        Save
      </Button>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{'Are you sure you want to delete this photo report?'}</DialogTitle>
        <DialogContent>
          <DialogContentText>This action cannot be undone.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (toBeDeleted !== null) handleDeleteGallery(toBeDeleted);
            }}
            color="primary"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
};

export default PageTab;
