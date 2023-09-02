import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import useSnackbar from 'src/hooks/useSnackbar';
import Input from 'src/components/Input/Input';
import Button from 'src/components/Button';

type FormData = {
  id: number;
  page_title: string;
  meta_description: string;
  meta_keywords: string;
  og_description: string;
  og_locale: string;
  og_image: string;
};

type MetaProps = {
  fetchData: (fieldName: string) => Promise<any>;
  updateData: (fieldName: string, data: string) => Promise<any>;
  onSaveSuccess?: () => void;
  onSaveError?: () => void;
};

const Meta: React.FC<MetaProps> = ({ fetchData, updateData, onSaveSuccess, onSaveError }) => {
  const [loading, setLoading] = useState(true);

  const {
    register,
    getValues,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      page_title: '',
      meta_description: '',
      meta_keywords: '',
      og_description: '',
      og_locale: '',
      og_image: '',
    },
  });
  const { showError, showSuccess } = useSnackbar();

  useEffect(() => {
    const fetch = async () => {
      const data = await fetchData('meta');
      console.log(data);
      const parsedData = JSON.parse(data.content);
      for (const [key, value] of Object.entries(parsedData)) {
        setValue(key as keyof FormData, value as keyof FormData);
      }
      setLoading(false);
    };

    fetch();
  }, [setValue]);

  const handleSave: SubmitHandler<FormData> = async (formData) => {
    try {
      await updateData('meta', JSON.stringify(formData));
      showSuccess('Successfully saved!');
      if (onSaveSuccess) onSaveSuccess();
    } catch (error) {
      showError('An error occurred');
      if (onSaveError) onSaveError();
    }
  };

  return !loading ? (
    <form onSubmit={handleSubmit(handleSave)}>
      <Input
        label="Page Title"
        shrink={getValues('page_title')}
        fullWidth
        {...register('page_title', { required: 'This field is required' })}
        error={Boolean(errors.page_title)}
        helperText={errors.page_title?.message}
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
      <Input
        label="OG Image URL"
        shrink={getValues('og_image')}
        fullWidth
        {...register('og_image', { required: 'This field is required' })}
        error={Boolean(errors.og_image)}
        helperText={errors.og_image?.message}
      />
      <Button>Save</Button>
    </form>
  ) : (
    <p>Loading</p>
  );
};

export default Meta;
