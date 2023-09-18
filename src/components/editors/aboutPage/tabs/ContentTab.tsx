import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { fetchPageBlock, updatePageBlock } from 'src/utils/api';
import useSnackbar from 'src/hooks/useSnackbar';
import CustomEditor from 'src/components/CustomEditor';
import Button from 'src/components/Button';
import Input from 'src/components/Input';
import { TAboutPage } from 'src/utils/types';
import DropzoneDialog from 'react-dropzone';

type FormData = {
  about: TAboutPage;
};

const ContentTab: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const { register, handleSubmit, watch, control, setValue, getValues } = useForm<FormData>({
    defaultValues: { about: { text: '' } },
  });
  const { showError, showSuccess } = useSnackbar();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPageBlock('about', 'content');
      setValue('about', JSON.parse(data.content));
      setLoading(false);
    };

    fetchData();
  }, [setValue]);

  const handleSave: SubmitHandler<FormData> = async (formData) => {
    try {
      setLoading(true);
      await updatePageBlock('about', 'content', { content: JSON.stringify(formData.about) });
      showSuccess('Successfully saved!');
      setLoading(false);
    } catch (error) {
      showError('An error occurred');
    }
  };

  const handleUpload = async () => {
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`file${index + 1}`, file);
    });

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setValue('about.image', data.urls[0]);
    } catch (error) {
      showError('An error occurred during file upload');
    }
  };

  return (
    <form onSubmit={handleSubmit(handleSave)}>
      {!loading ? (
        <>
          <Button variant="contained" type="button" color="primary" onClick={() => setOpen(true)}>
            Загрузить новый файл
          </Button>
          {/* <DropzoneDialog
            open={open}
            onSave={(newFiles: any) => {
              setFiles(newFiles);
              setOpen(false);
              handleUpload();
            }}
            acceptedFiles={['image/*']}
            showPreviews={true}
            maxFileSize={5000000}
            onClose={() => setOpen(false)}
          /> */}
          <Input
            label="Image"
            shrink={getValues('about.image')}
            fullWidth
            {...register('about.image')}
          />
          <CustomEditor name="about.text" control={control} watch={watch} />
        </>
      ) : (
        <p>Loading</p>
      )}
      <Button type="submit" variant="contained" color="primary">
        Save
      </Button>
    </form>
  );
};

export default ContentTab;
