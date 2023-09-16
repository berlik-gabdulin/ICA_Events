// components/editors/homePage/tabs/AboutTab.tsx

import { useState, useEffect } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';
import { fetchPageBlock, updatePageBlock } from 'src/utils/api';
import useSnackbar from 'src/hooks/useSnackbar';
import CustomEditor from 'src/components/CustomEditor';
import Button from 'src/components/Button';
import Input from 'src/components/Input';
import { TAboutPage } from 'src/utils/types';

type FormData = {
  about: TAboutPage;
};

const ContentTab: React.FC = () => {
  const [loading, setLoading] = useState(true);

  const { watch, control, handleSubmit, register, getValues, setValue } = useForm<FormData>({
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

  return (
    <form onSubmit={handleSubmit(handleSave)}>
      {!loading ? (
        <>
          <Input
            label="Image"
            shrink={getValues('about.image')}
            fullWidth
            {...register('about.image')}
          />
          <CustomEditor name="about.text" watch={watch} control={control} />
        </>
      ) : (
        <p>Loading</p>
      )}
      <Button>Save</Button>
    </form>
  );
};

export default ContentTab;
