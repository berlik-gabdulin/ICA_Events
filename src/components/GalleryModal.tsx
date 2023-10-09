import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FileUploader from 'src/components/upload/FileUploader';
import { TReportModalProps, TReport } from 'src/utils/types';
import Input from './Input';
import Button from './Button';
import { countries, galleryCountries } from 'src/utils/network';
import { InitialGallery } from './editors/reportsPage/tabs/PageTab';
import styled from '@emotion/styled';
import { v4 as uuidv4 } from 'uuid';
import ImagePreview from './ImagePreview';
import { removeFS } from 'src/utils/api';

type FormData = {
  gallery: TReport;
};

const GalleryModal: React.FC<TReportModalProps> = ({ open, onClose, gallery }) => {
  const [showForm, setShowForm] = useState(false);
  const [removedPhoto, setRemovedPhoto] = useState<string[]>([]);

  const { register, handleSubmit, setValue, getValues, control, watch } = useForm<FormData>({
    defaultValues: { gallery },
  });

  const setPath = () => {
    // Проверяем, существует ли имя галереи и не является ли оно пустой строкой
    if (watch('gallery.isNew') && getValues('gallery.gallery_title').length > 8) {
      // Преобразуем имя галереи в snake_case
      const initialFolderName = getValues('gallery.gallery_title')
        .replace(/[\s&]/g, '_')
        .replace('__', '_')
        .replace('__', '_');
      // Устанавливаем начальное имя папки
      setValue('gallery.path', initialFolderName);
      setValue('gallery.id', uuidv4());
      setValue('gallery.isNew', false);
      setShowForm(true);
    }
  };

  useEffect(() => {
    if (!watch('gallery.isNew')) {
      setShowForm(true);
    }
  }, [watch]);

  const onSubmit: SubmitHandler<FormData> = (formData) => {
    removedPhoto.map(async (url) => await removeFS({ fileUrl: url }));
    onClose(formData.gallery);
  };

  const removePhoto = (url: string) => {
    setRemovedPhoto((prev) => [...prev, url]);

    setValue(
      'gallery.urls',
      getValues('gallery.urls').filter((item) => item !== url)
    );
  };
  return (
    <DialogStyled
      open={open}
      onClose={() => {
        setValue('gallery', InitialGallery);
        onClose();
      }}
    >
      <DialogTitle>Edit Gallery</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Input
            label="Gallery Title"
            fullWidth
            {...register('gallery.gallery_title')}
            onBlur={setPath}
          />
          {showForm ? (
            <>
              <FileUploader
                inputName="gallery.preview"
                setValue={setValue}
                prefix="preview"
                folder={`galleries/${getValues('gallery.path')}`}
              />
              <Input
                label="Preview"
                fullWidth
                {...register('gallery.preview')}
                shrink={watch('gallery.preview')}
              />
              <ImagePreview src={watch('gallery.preview')} />

              <FormControl fullWidth>
                <InputLabel id={`country-label}`}>Country</InputLabel>
                <Controller
                  name={`gallery.countryInLocation`}
                  control={control}
                  render={({ field }) => (
                    <Select label="Country" fullWidth {...field} style={{ marginBottom: 15 }}>
                      {countries.map((country) => (
                        <MenuItem key={country} value={country}>
                          {country}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </FormControl>

              <FormControl fullWidth>
                <InputLabel id={`country-label}`}>Group Country</InputLabel>
                <Controller
                  name={`gallery.country`}
                  control={control}
                  render={({ field }) => (
                    <Select label="Country" fullWidth {...field} style={{ marginBottom: 15 }}>
                      {galleryCountries.map((country) => (
                        <MenuItem key={country} value={country}>
                          {country}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </FormControl>

              <Input label="Location" fullWidth {...register('gallery.location')} />

              <Input label="Year" fullWidth {...register('gallery.year')} />

              <Input label="Order" fullWidth {...register('gallery.order')} />

              <FileUploader
                inputName="gallery.urls"
                setValue={setValue}
                prefix="photo"
                folder={`galleries/${getValues('gallery.path')}`}
                maxFiles={20}
              />

              <Box>
                <GridBox marginTop={3}>
                  {getValues('gallery.urls').map((url, index) => (
                    <Box key={url} position="relative" width="100%">
                      <ImagePreview src={url} alt={`Photo ${index}`} width={168} height={100} />
                      <Box sx={{ position: 'absolute', top: 5, right: 5 }}>
                        <IconButtonStyled onClick={() => removePhoto(url)}>
                          <CloseIcon />
                        </IconButtonStyled>
                      </Box>
                    </Box>
                  ))}
                </GridBox>
              </Box>
            </>
          ) : (
            <p>Set report title first...</p>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setValue('gallery', InitialGallery);
              onClose();
            }}
            color="primary"
            type="button"
          >
            Cancel
          </Button>
          <Button type="submit" color="primary">
            Save
          </Button>
        </DialogActions>
      </form>
    </DialogStyled>
  );
};

export default GalleryModal;

const DialogStyled = styled(Dialog)`
  width: 750px;
  margin: 0 auto;
  .MuiPaper-root {
    width: 100%;
  }
`;

const IconButtonStyled = styled(IconButton)`
  width: 30px;
  height: 30px;
  background-color: rgba(255, 255, 255, 0.6);
  &:hover {
    background-color: rgba(255, 255, 255, 0.8);
  }
`;

const GridBox = styled(Box)`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
`;
