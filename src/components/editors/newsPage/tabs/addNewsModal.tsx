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

interface IAddNewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newsData: INewsData) => void;
  id: number | null;
}

// Определяем тип для данных новости
export interface INewsData {
  id?: number;
  title: string;
  alias: string;
  content: string;
  short_text: string;
  image_url: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  og_description: string;
  og_locale: string;
  og_image: string;
  isPublic: boolean;
  published_at?: Date | string;
}

const InitialState = {
  title: '',
  alias: '',
  content: '',
  short_text: '',
  image_url: '',
  meta_title: '',
  meta_description: '',
  meta_keywords: '',
  og_description: '',
  og_locale: 'en_gb',
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
    const errorFields = (Object.keys(errors) as Array<keyof INewsData>).filter(
      (key) => errors[key]
    );

    if (errorFields.length > 0) {
      const errorMessage = `Please fill in the following fields: ${errorFields.join(', ')}.`;
      console.error(errorMessage);
      return;
    }

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

  const handleTitleBlur = () => {
    if (!getValues('alias')) handleAlias();
    if (!getValues('meta_title') && getValues('title')) setValue('meta_title', getValues('title')); // Установим автоматически meta_title из названия новости, для упрощения работы
  };

  const handleShortTextBlur = () => {
    if (!getValues('meta_description') && getValues('short_text'))
      setValue('meta_description', getValues('short_text')); // Установим автоматически meta_description из короткого описания новости

    if (!getValues('og_description') && getValues('short_text'))
      setValue('og_description', getValues('short_text')); // Установим автоматически og_description из короткого описания новости
  };

  const handleImageChange = () => {
    if (!getValues('og_image') && getValues('image_url'))
      setValue('og_image', getValues('image_url')); // Установим автоматически og_image из image_url
  };

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        setLoading(true);
        try {
          const response = await fetch(`/api/news?id=${id}`);
          const data: INewsData = await response.json();
          console.log('news item', data);
          reset(data);
        } catch (error) {
          console.error('Error fetching news data:', error);
        }
      }
      setLoading(false);
    };

    fetchData();
  }, [id, reset]);

  const MetaIsError =
    Boolean(errors.meta_description) ||
    Boolean(errors.meta_title) ||
    Boolean(errors.og_description) ||
    Boolean(errors.og_locale) ||
    Boolean(errors.og_image);

  return (
    <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>Add new material</DialogTitle>
      {Object.keys(errors).length > 0 && (
        <Typography color="error" style={{ textAlign: 'center', marginTop: 10 }}>
          Please fill in all required fields.
        </Typography>
      )}
      <form onSubmit={handleSubmit(handleSave)}>
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
                onBlur={handleTitleBlur}
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
                inputProps={{
                  maxLength: 20,
                }}
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
            style={{ marginTop: '20px', marginBottom: 30 }}
          />

          <Input
            label="Short Text"
            shrink={watch('short_text')}
            fullWidth
            {...register('short_text', { required: 'This field is required' })}
            error={Boolean(errors.short_text)}
            helperText={errors.short_text?.message}
            onBlurCapture={handleShortTextBlur}
          />

          <FileUploader
            inputName="image_url"
            setValue={setValue}
            folder="pages/news_images"
            prefix="news"
            maxFiles={1}
            onUpload={handleImageChange}
          />

          <ImagePreview src={watch('image_url')} alt="Preview" height={200} />
          <Input
            label="Preview"
            shrink={watch('image_url')}
            fullWidth
            {...register('image_url', { required: 'This field is required' })}
            error={Boolean(errors.image_url)}
            helperText={errors.image_url?.message}
            onBlurCapture={handleImageChange}
          />

          <FormControlLabel
            control={
              <Controller
                name="isPublic"
                control={control}
                render={({ field }) => (
                  <Switch
                    checked={!!field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
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
              <Typography color={MetaIsError ? '#FF4842' : 'inderit'}>Meta Data</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Input
                label="Meta Title"
                shrink={watch('meta_title')}
                fullWidth
                {...register('meta_title', { required: 'This field is required' })}
                error={Boolean(errors.meta_title)}
                helperText={errors.meta_title?.message}
              />

              <Input
                label="Meta Description"
                shrink={watch('meta_description')}
                fullWidth
                {...register('meta_description', { required: 'This field is required' })}
                error={Boolean(errors.meta_description)}
                helperText={errors.meta_description?.message}
              />

              <Input
                label="Meta Keywords"
                shrink={watch('meta_keywords')}
                fullWidth
                {...register('meta_keywords')}
                error={Boolean(errors.meta_keywords)}
                helperText={errors.meta_keywords?.message}
              />

              <Input
                label="OG Description"
                shrink={watch('og_description')}
                fullWidth
                {...register('og_description', { required: 'This field is required' })}
                error={Boolean(errors.og_description)}
                helperText={errors.og_description?.message}
              />

              <Input
                label="OG Locale"
                shrink={watch('og_locale')}
                fullWidth
                {...register('og_locale', { required: 'This field is required' })}
                error={Boolean(errors.og_locale)}
                helperText={errors.og_locale?.message}
              />

              <FileUploader
                inputName="og_image"
                setValue={setValue}
                prefix="preview"
                folder="pages/news_images"
                maxFiles={1}
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
          <Button color="primary" type="submit">
            {id ? 'Save material' : 'Create new material'}
          </Button>
        </DialogActions>
      </form>

      <Loader loading={loading} />
    </Dialog>
  );
};

export default AddNewsModal;
