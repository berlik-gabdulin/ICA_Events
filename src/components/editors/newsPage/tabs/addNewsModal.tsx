import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  DialogActions,
  TextField,
  FormControlLabel,
  Switch,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useForm, Controller } from 'react-hook-form';
import FileUploader from 'src/components/upload/FileUploader';
import CustomEditor from 'src/components/CustomEditor';
import Loader from 'src/components/Loader';
import ImagePreview from 'src/components/ImagePreview';
import Input from 'src/components/Input';

// Определяем типы пропсов для компонента AddNewsModal
interface IAddNewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newsData: INewsData) => void;
  id: number | null;
}

// Определяем тип для данных новости
export interface INewsData {
  title: string;
  alias: string;
  content: string;
  image_url: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  og_description: string;
  og_locale: string;
  og_image: string;
  isPublic: boolean;
}

const InitialState = {
  title: '',
  alias: '',
  content: '',
  image_url: '',
  meta_title: '',
  meta_description: '',
  meta_keywords: '',
  og_description: '',
  og_locale: '',
  og_image: '',
  isPublic: false,
};

const AddNewsModal: React.FC<IAddNewsModalProps> = ({ isOpen, onClose, onSave, id }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
    register,
    reset,
    formState: { errors },
  } = useForm<INewsData>({
    defaultValues: InitialState,
  });

  const handleClose = () => {
    setLoading(false);
    reset(InitialState);
    onClose();
  };

  const handleSave = (data: INewsData) => {
    onSave({ ...data });
    setLoading(true);
    handleClose();
  };

  const handleAlias = () => {
    const titleValue = getValues('title');

    const alias = titleValue
      .toLowerCase()
      .replace(/[\W_]+/g, '-')
      .replace(/^-+|-+$/g, '');

    setValue('alias', alias);
  };

  const handleAliasOnBlur = () => {
    if (!getValues('alias')) handleAlias();
  };

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        setLoading(true);
        try {
          const response = await fetch(`/api/news?id=${id}`);
          const data: INewsData = await response.json();
          reset(data);
        } catch (error) {
          console.error('Error fetching news data:', error);
        }
      }
      setLoading(false);
    };

    fetchData();
  }, [id, reset]);

  return (
    <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>Add new material</DialogTitle>

      <DialogContent>
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              autoFocus
              margin="dense"
              label="Title"
              type="text"
              fullWidth
              variant="outlined"
              onBlur={handleAliasOnBlur}
            />
          )}
        />

        <Controller
          name="alias"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              margin="dense"
              label="Alias"
              type="text"
              fullWidth
              variant="outlined"
            />
          )}
        />

        <Button onClick={handleAlias} color="secondary" style={{ marginTop: 15 }}>
          Generate auto alias
        </Button>

        <CustomEditor
          name="content"
          control={control}
          watch={watch}
          style={{ marginTop: '20px' }}
        />

        <FileUploader
          inputName="image_url"
          setValue={setValue}
          folder="news_images"
          prefix="news"
          maxFiles={1}
        />

        <ImagePreview src={getValues('image_url')} alt="Preview" height={200} />

        <FormControlLabel
          control={
            <Controller
              name="isPublic"
              control={control}
              render={({ field }) => (
                <Switch checked={field.value} onChange={(e) => field.onChange(e.target.checked)} />
              )}
            />
          }
          label="Publish"
        />
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Meta Data</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Input
              label="Meta Title"
              shrink={getValues('meta_title')}
              fullWidth
              {...register('meta_title', { required: 'This field is required' })}
              error={Boolean(errors.meta_title)}
              helperText={errors.meta_title?.message}
            />

            <Input
              label="Meta Description"
              shrink={getValues('meta_description')}
              fullWidth
              {...register('meta_description', { required: 'This field is required' })}
              error={Boolean(errors.meta_description)}
              helperText={errors.meta_description?.message}
            />

            <Input
              label="Meta Keywords"
              shrink={getValues('meta_keywords')}
              fullWidth
              {...register('meta_keywords', { required: 'This field is required' })}
              error={Boolean(errors.meta_keywords)}
              helperText={errors.meta_keywords?.message}
            />

            <Input
              label="OG Description"
              shrink={getValues('og_description')}
              fullWidth
              {...register('og_description', { required: 'This field is required' })}
              error={Boolean(errors.og_description)}
              helperText={errors.og_description?.message}
            />

            <Input
              label="OG Locale"
              shrink={getValues('og_locale')}
              fullWidth
              {...register('og_locale', { required: 'This field is required' })}
              error={Boolean(errors.og_locale)}
              helperText={errors.og_locale?.message}
            />

            <FileUploader
              inputName="og_image"
              setValue={setValue}
              prefix="preview"
              folder={`pages/news`}
            />

            <ImagePreview
              src={watch('og_image')}
              alt="Header Background"
              width={300}
              height={200}
            />

            <Input
              label="OG Image URL"
              shrink={watch('og_image')}
              fullWidth
              {...register('og_image', { required: 'This field is required' })}
              error={Boolean(errors.og_image)}
              helperText={errors.og_image?.message}
            />
          </AccordionDetails>
        </Accordion>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit(handleSave)} color="primary">
          {id ? 'Save material' : 'Create new material'}
        </Button>
      </DialogActions>

      <Loader loading={loading} />
    </Dialog>
  );
};

export default AddNewsModal;
