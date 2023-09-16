import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { fetchPageBlock, updatePageBlock } from 'src/utils/api';
import useSnackbar from 'src/hooks/useSnackbar';
import { DeviderStyled } from 'src/components/globalStyles';
import Input from 'src/components/Input';
import Button from 'src/components/Button';
import { TMembership } from 'src/utils/types';

const MembershipTab: React.FC = () => {
  const [loading, setLoading] = useState(true);

  const { register, handleSubmit, setValue, getValues } = useForm<TMembership>({
    defaultValues: {
      label: '',
      image: '',
    },
  });
  const { showError, showSuccess } = useSnackbar();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPageBlock('home', 'membership');
      const parsedData = JSON.parse(data.content);
      setValue('label', parsedData.label);
      setValue('image', parsedData.image);
      setLoading(false);
    };
    fetchData();
  }, [setValue]);

  const handleSave: SubmitHandler<TMembership> = async (formData) => {
    try {
      await updatePageBlock('home', 'membership', { content: JSON.stringify(formData) });
      showSuccess('Successfully saved!');
    } catch (error) {
      showError('An error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit(handleSave)}>
      {!loading ? (
        <>
          <Input shrink={getValues('label')} label="Label" fullWidth {...register('label')} />
          <DeviderStyled />
          <Input shrink={getValues('image')} label="Image" fullWidth {...register('image')} />

          <Button>Save</Button>
        </>
      ) : null}
    </form>
  );
};

export default MembershipTab;
