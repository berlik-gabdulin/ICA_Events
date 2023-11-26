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
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import FileUploader from 'src/components/upload/FileUploader';
import CustomEditor from 'src/components/CustomEditor';
import Loader from 'src/components/Loader';
import ImagePreview from 'src/components/ImagePreview';

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
  isPublic: boolean;
}

const InitialState = {
  title: '',
  alias: '',
  content: '',
  image_url: '',
  isPublic: false,
};

const AddNewsModal: React.FC<IAddNewsModalProps> = ({ isOpen, onClose, onSave, id }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { control, handleSubmit, watch, setValue, getValues, reset } = useForm<INewsData>({
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
