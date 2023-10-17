import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, TextField } from '@mui/material';
import FileUploader from 'src/components/upload/FileUploader';
import CustomEditor from 'src/components/CustomEditor';

interface NewsFormProps {
  newsId?: number;
  onSaved?: () => void;
}

const NewsForm: React.FC<NewsFormProps> = ({ newsId, onSaved }) => {
  const { register, handleSubmit, setValue, control, watch } = useForm();
  const [newsData, setNewsData] = useState<any>(null);

  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        if (newsId) {
          const response = await fetch(`/api/news?id=${newsId}`);
          const data = await response.json();
          setNewsData(data);
          setValue('title', data.title);
          setValue('content.post', data.content.post);
          setValue('content.meta', data.content.meta);
          setValue('thumbnail', data.thumbnail);
        }
      } catch (error) {
        console.error('Error fetching news data:', error);
      }
    };

    fetchNewsData();
  }, [newsId, setValue]);

  const onSubmit = async (data: any) => {
    try {
      const response = newsId
        ? await fetch('/api/news', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...data, id: newsId }),
          })
        : await fetch('/api/news', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });

      if (response.ok && onSaved) onSaved();
    } catch (error) {
      console.error('Error saving news:', error);
    }
  };

  const handleDelete = async () => {
    try {
      if (newsId) {
        const response = await fetch(`/api/news?id=${newsId}`, {
          method: 'DELETE',
        });
        if (response.ok && onSaved) onSaved();
      }
    } catch (error) {
      console.error('Error deleting news:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box mb={3}>
        <TextField
          label="Title"
          {...register('title', { required: true })}
          defaultValue={newsData?.title}
          fullWidth
        />
      </Box>
      <FileUploader inputName="thumbnail" setValue={setValue} folder="news" preview />
      <Box mb={3}>
        <CustomEditor name="content.post" control={control} watch={watch} />
      </Box>
      <Box mb={3}>
        <TextField
          label="Meta Information"
          {...register('content.meta', { required: true })}
          defaultValue={newsData?.content?.meta}
          fullWidth
          multiline
        />
      </Box>
      <Button type="submit" variant="contained" color="primary">
        Save
      </Button>
      {newsId && (
        <Button onClick={handleDelete} variant="contained" color="secondary">
          Delete
        </Button>
      )}
    </form>
  );
};

export default NewsForm;
