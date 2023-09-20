import React, { useEffect } from 'react';
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
import { TGalleryModalProps, TGallery } from 'src/utils/types';
import Input from './Input';
import Button from './Button';
import { ourNetwork } from 'src/utils/network';
import { InitialGallery } from './editors/galleriesPage/tabs/PageTab';
import styled from '@emotion/styled';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';

type FormData = {
  gallery: TGallery;
};

const GalleryModal: React.FC<TGalleryModalProps> = ({ open, onClose, gallery }) => {
  const { register, handleSubmit, setValue, getValues, control, watch } = useForm<FormData>({
    defaultValues: { gallery },
  });

  useEffect(() => {
    setValue('gallery', gallery);
  }, [gallery]);

  const setPath = () => {
    // Проверяем, существует ли имя галереи и не является ли оно пустой строкой
    if (getValues('gallery.isNew') && getValues('gallery.gallery_title').length > 8) {
      // Преобразуем имя галереи в snake_case
      const initialFolderName = getValues('gallery.gallery_title').replace(/ /g, '_');
      // Устанавливаем начальное имя папки
      setValue('gallery.path', initialFolderName);
      setValue('gallery.id', uuidv4());
      setValue('gallery.isNew', false);
    }
  };

  // console.log(watch('gallery'));

  const onSubmit: SubmitHandler<FormData> = (formData) => {
    onClose(formData.gallery);
  };

  const removePhoto = (url: string) =>
    setValue(
      'gallery.urls',
      getValues('gallery.urls').filter((item) => item !== url)
    );

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
          {!watch('gallery.isNew') ? (
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
                shrink={getValues('gallery.preview')}
              />

              {watch('gallery.preview') ? (
                <Box sx={{ width: '100%', height: 100, position: 'relative', marginBottom: 3 }}>
                  <ImageStyled
                    src={getValues('gallery.preview')}
                    alt="Header Background"
                    layout="fill"
                    style={{ objectFit: 'cover', borderRadius: 8 }}
                  />
                </Box>
              ) : null}

              <FormControl fullWidth>
                <InputLabel id={`country-label}`}>Country</InputLabel>
                <Controller
                  name={`gallery.country`}
                  control={control}
                  render={({ field }) => (
                    <Select label="Country" fullWidth {...field} style={{ marginBottom: 15 }}>
                      {ourNetwork.map((country) => (
                        <MenuItem key={country} value={country}>
                          {country}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </FormControl>
              <Input label="Year" fullWidth {...register('gallery.year')} />
              <FileUploader
                inputName="gallery.urls"
                setValue={setValue}
                prefix="photo"
                folder={`galleries/${getValues('gallery.path')}`}
                maxFiles={20}
              />
              <Box>
                {watch('gallery.urls').length ? (
                  <GridBox marginTop={3}>
                    {getValues('gallery.urls').map((url, index) => (
                      <Box key={url} position="relative" width="100%">
                        <ImageStyled src={url} alt={`Photo ${index}`} width={168} height={100} />
                        <Box sx={{ position: 'absolute', top: 5, right: 5 }}>
                          <IconButtonStyled onClick={() => removePhoto(url)}>
                            <CloseIcon />
                          </IconButtonStyled>
                        </Box>
                      </Box>
                    ))}
                  </GridBox>
                ) : null}
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

const ImageStyled = styled(Image)`
  border-radius: 8px;
  object-fit: cover !important;
  margin-bottom: 15px;
  img {
    width: 100%;
    height: 100%;
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
