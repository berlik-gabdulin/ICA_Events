// components/editors/homePage/tabs/AboutTab.tsx

import { useState, useEffect } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';
import { fetchAboutPageBlock, updateAboutPageBlock } from 'src/utils/api';
import useSnackbar from 'src/hooks/useSnackbar';
import CustomEditor from 'src/components/CustomEditor';
import Button from 'src/components/Button';

type FormData = {
  about: string;
};

const ContentTab: React.FC = () => {
  const [loading, setLoading] = useState(true);

  const {
    watch,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({ defaultValues: { about: '' } });
  const { showError, showSuccess } = useSnackbar();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAboutPageBlock('content');
      setValue('about', data.content);
      setLoading(false);
    };

    fetchData();
  }, [setValue]);

  const handleSave: SubmitHandler<FormData> = async (formData) => {
    try {
      setLoading(true);
      await updateAboutPageBlock('about', formData.about);
      showSuccess('Successfully saved!');
      setLoading(false);
    } catch (error) {
      showError('An error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit(handleSave)}>
      {!loading ? <CustomEditor name="about" watch={watch} control={control} /> : <p>Loading</p>}
      <Button>Save</Button>
    </form>
  );
};

export default ContentTab;
