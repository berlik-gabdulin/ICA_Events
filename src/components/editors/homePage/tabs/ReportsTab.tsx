import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { fetchPageBlock, updatePageBlock } from 'src/utils/api';
import useSnackbar from 'src/hooks/useSnackbar';
import Input from 'src/components/Input';
import Button from 'src/components/Button';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

type FormData = {
  title: string;
  buttonText: string;
  block1: string;
  block2: string;
  block3: string;
};

const ReportsTab: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [galleries, setGalleries] = useState<any[]>([]);
  const { register, handleSubmit, watch } = useForm<FormData>();
  const { showError, showSuccess } = useSnackbar();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPageBlock('galleries', 'page');
      setGalleries(JSON.parse(data.content).galleries);
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleSave: SubmitHandler<FormData> = async (formData) => {
    try {
      setLoading(true);
      const selectedGalleries = galleries.filter((gallery) =>
        [formData.block1, formData.block2, formData.block3].includes(gallery.id)
      );
      await updatePageBlock('home', 'reports', { content: JSON.stringify(selectedGalleries) });
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
          <Input label="Title" fullWidth {...register('title')} />
          <Input label="Button Text" fullWidth {...register('buttonText')} />

          {[1, 2, 3].map((blockNumber) => (
            <FormControl fullWidth margin="normal" key={blockNumber}>
              <InputLabel id={`block${blockNumber}-label`}>Block {blockNumber}</InputLabel>
              <Select
                labelId={`block${blockNumber}-label`}
                {...register(`block${blockNumber}` as any)} // Используйте as const для обхода ошибки
                fullWidth
              >
                {galleries
                  .filter(
                    (gallery) =>
                      ![watch('block1'), watch('block2'), watch('block3')].includes(gallery.id)
                  )
                  .map((gallery) => (
                    <MenuItem key={gallery.id} value={gallery.id}>
                      {gallery.gallery_title}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          ))}

          <Button variant="contained" color="primary" type="submit">
            Save
          </Button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </form>
  );
};

export default ReportsTab;
