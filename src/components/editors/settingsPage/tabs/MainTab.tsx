import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { fetchPageBlock, updatePageBlock } from 'src/utils/api';
import useSnackbar from 'src/hooks/useSnackbar';
import Button from 'src/components/Button';
import { TSettingsMain } from 'src/utils/types';
import CustomEditor from 'src/components/CustomEditor';

const MainTab = () => {
  const [loading, setLoading] = useState(true);

  const { handleSubmit, setValue, watch, control } = useForm<TSettingsMain>({
    defaultValues: {
      footer: '',
    },
  });
  const { showError, showSuccess } = useSnackbar();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPageBlock('settings', 'main');
      const parsedData = JSON.parse(data.content);
      setValue('footer', parsedData.footer);

      setLoading(false);
    };
    fetchData();
  }, [setValue]);

  const handleSave: SubmitHandler<TSettingsMain> = async (formData) => {
    try {
      await updatePageBlock('settings', 'main', { content: JSON.stringify(formData) });
      showSuccess('Successfully saved!');
    } catch (error) {
      showError('An error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit(handleSave)}>
      {!loading ? (
        <>
          <CustomEditor name="footer" watch={watch} control={control} />

          <Button>Save</Button>
        </>
      ) : null}
    </form>
  );
};

export default MainTab;
