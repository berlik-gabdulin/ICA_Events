import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  AccordionDetails,
  AccordionSummary,
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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AccordionCustom } from 'src/components/globalStyles';

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
  order: 0,
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
      const currentGalleries = { ...getValues('galleries.galleries') };
      const country = updatedGallery.country;

      if (!currentGalleries[country]) {
        currentGalleries[country] = [];
      }

      const index = currentGalleries[country].findIndex((g) => g.id === updatedGallery.id);
      if (index !== -1) {
        currentGalleries[country][index] = updatedGallery;
      } else {
        currentGalleries[country].push(updatedGallery);
      }

      // Сортировка галерей внутри страны по полю order
      currentGalleries[country].sort((a, b) => a.order - b.order);

      setValue('galleries.galleries', currentGalleries);
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

    const currentGalleries = { ...getValues('galleries.galleries') };
    const country = gallery.country;

    if (currentGalleries[country]) {
      currentGalleries[country] = currentGalleries[country].filter((g) => g.id !== gallery.id);

      if (currentGalleries[country].length === 0) {
        delete currentGalleries[country];
      }
    }

    setValue('galleries.galleries', currentGalleries);
    setOpenDialog(false);
    handleSubmit(handleSave)();
  };

  const handleSave: SubmitHandler<FormData> = async (formData) => {
    try {
      setLoading(true);
      const sortedGalleries = { ...formData.galleries.galleries };
      Object.keys(sortedGalleries).forEach((country) => {
        sortedGalleries[country].sort((a, b) => a.order - b.order);
      });

      await updatePageBlock('galleries', 'page', {
        content: JSON.stringify({ galleries: sortedGalleries }),
      });
      showSuccess('Successfully saved!');
      setLoading(false);
    } catch (error) {
      showError('An error occurred');
      setLoading(false);
    }
  };

  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
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
          <Stack marginBottom={3} marginTop={3}>
            {Object.keys(getValues('galleries.galleries')).map((country) => (
              <AccordionCustom
                expanded={expanded === country}
                onChange={handleChange(country)}
                key={country}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`${country}-content`}
                  id={`${country}-header`}
                >
                  {country}
                </AccordionSummary>
                <AccordionDetails>
                  <Stack direction="row" flexWrap="wrap">
                    {getValues('galleries.galleries')[country].map(
                      (gallery: TReport, index: number) => (
                        <GalleryCard
                          key={index}
                          gallery={gallery}
                          onEdit={() => handleEditGallery(gallery)}
                          onDelete={() => {
                            setToBeDeleted(gallery);
                            setOpenDialog(true);
                          }}
                        />
                      )
                    )}
                  </Stack>
                </AccordionDetails>
              </AccordionCustom>
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
