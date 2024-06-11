import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form';
import { fetchPageBlock, updatePageBlock } from 'src/utils/api';
import Input from 'src/components/Input';
import Button from 'src/components/Button';
import { Box, FormControlLabel, Switch } from '@mui/material';
import useSnackbar from 'src/hooks/useSnackbar';
import CustomEditor from 'src/components/CustomEditor';
import { TAboutTab, Bullet } from 'src/utils/types';

type FormData = {
  about: Omit<TAboutTab, 'bullets'> & { bullets: Bullet[] };
};

const AboutTab: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const { showError, showSuccess } = useSnackbar();
  const { register, handleSubmit, setValue, watch, getValues, control } = useForm<FormData>({
    defaultValues: {
      about: {
        title: '',
        text: '',
        bullets: [
          { key: 'countries', label: 'Countries', value: '8', order: 1, isActive: true },
          { key: 'events', label: 'Events', value: '60+', order: 2, isActive: true },
          { key: 'industries', label: 'Industries', value: '18', order: 3, isActive: true },
          { key: 'attendees', label: 'Attendees', value: '340.000+', order: 4, isActive: true },
          { key: 'exhibitors', label: 'Exhibitors', value: '9000+', order: 5, isActive: true },
        ],
      },
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'about.bullets',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPageBlock('home', 'about');
        const aboutData = JSON.parse(data.content) as TAboutTab;
        setValue('about', aboutData);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [setValue]);

  const handleSave: SubmitHandler<FormData> = async (formData) => {
    try {
      setLoading(true);
      await updatePageBlock('home', 'about', { content: JSON.stringify(formData.about) });
      showSuccess('Successfully saved!');
      setLoading(false);
    } catch (error) {
      showError('An error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit(handleSave)}>
      {!loading ? (
        <>
          <Input
            shrink={getValues('about.title')}
            label="Block title"
            fullWidth
            {...register('about.title')}
          />
          <CustomEditor
            name="about.text"
            watch={watch}
            control={control}
            style={{ marginBottom: '30px' }}
          />
          {fields.map((field, index) => (
            <Box key={field.id} display="flex" gap={2} alignItems="center" mb={2}>
              <Input
                shrink={getValues(`about.bullets.${index}.label`)}
                label="Bullet Label"
                fullWidth
                {...register(`about.bullets.${index}.label`)}
              />
              <Input
                shrink={getValues(`about.bullets.${index}.value`)}
                label="Bullet Value"
                fullWidth
                {...register(`about.bullets.${index}.value`)}
              />
              <Input
                shrink={getValues(`about.bullets.${index}.order`).toString()}
                label="Order"
                type="number"
                fullWidth
                {...register(`about.bullets.${index}.order`)}
              />
              <FormControlLabel
                control={
                  <Switch
                    {...register(`about.bullets.${index}.isActive`)}
                    checked={watch(`about.bullets.${index}.isActive`)}
                  />
                }
                label={watch(`about.bullets.${index}.isActive`) ? 'Active' : 'Inactive'}
                style={{ marginBottom: 15 }}
              />
            </Box>
          ))}
          <Button type="submit">Save</Button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </form>
  );
};

export default AboutTab;
