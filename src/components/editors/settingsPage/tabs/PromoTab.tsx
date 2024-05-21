import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import useSnackbar from 'src/hooks/useSnackbar';
import Input from 'src/components/Input';
import Button from 'src/components/Button';
import { fetchPageBlock, updatePageBlock } from 'src/utils/api';

interface FormData {
  page_title: string;
}

const PromoTab = () => {
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
    },
  });
  const { showError, showSuccess } = useSnackbar();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPageBlock('settings', 'promo');
      const parsedData = JSON.parse(data.content);
      setValue('page_title', parsedData.page_title);
      setLoading(false);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSave: SubmitHandler<FormData> = async (formData) => {
    try {
      await updatePageBlock('settings', 'promo', { content: JSON.stringify(formData) }, '#');
      showSuccess('Successfully saved!');
    } catch (error) {
      showError('An error occurred');
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

      <Button>Save</Button>
    </form>
  ) : (
    <p>Loading</p>
  );
};

export default PromoTab;
