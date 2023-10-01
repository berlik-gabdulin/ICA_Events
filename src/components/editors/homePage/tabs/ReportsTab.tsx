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
  const { register, handleSubmit, setValue, watch } = useForm<FormData>();
  const { showError, showSuccess } = useSnackbar();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPageBlock('galleries', 'page');
      const homeData = await fetchPageBlock('home', 'reports');
      const content = JSON.parse(data.content);
      const blockContent = JSON.parse(homeData.content);

      console.log(blockContent);

      setValue('title', blockContent.title);
      setValue('buttonText', blockContent.buttonText);
      setValue('block1', blockContent.reports.block1.id);
      setValue('block2', blockContent.reports.block2.id);
      setValue('block3', blockContent.reports.block3.id);
      setGalleries(content.galleries);
      setLoading(false);
    };

    fetchData();
  }, [setValue]);

  const handleSave: SubmitHandler<FormData> = async (formData) => {
    try {
      setLoading(true);
      const selectedGalleries = {
        block1: galleries.find((gallery) => gallery.id === formData.block1),
        block2: galleries.find((gallery) => gallery.id === formData.block2),
        block3: galleries.find((gallery) => gallery.id === formData.block3),
      };
      await updatePageBlock('home', 'reports', {
        content: JSON.stringify({
          title: formData.title,
          buttonText: formData.buttonText,
          reports: selectedGalleries,
        }),
      });
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
              <InputLabel
                id={`block${blockNumber}-label`}
                style={{ background: '#fff', padding: 3 }}
              >
                Block {blockNumber}
              </InputLabel>
              <Select
                labelId={`block${blockNumber}-label`}
                {...register(`block${blockNumber}` as keyof FormData)}
                defaultValue={watch(`block${blockNumber}` as keyof FormData)}
                fullWidth
              >
                {galleries.map((gallery) => (
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
