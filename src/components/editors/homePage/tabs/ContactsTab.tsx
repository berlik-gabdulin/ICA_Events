import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { fetchPageBlock, updatePageBlock } from 'src/utils/api';
import useSnackbar from 'src/hooks/useSnackbar';
import { DeviderStyled } from 'src/components/globalStyles';
import Input from 'src/components/Input';
import CustomEditor from 'src/components/CustomEditor';
import Button from 'src/components/Button';
import { TContactsBlock } from 'src/utils/types';

const ContactsTab: React.FC = () => {
  const [loading, setLoading] = useState(true);

  const { control, register, handleSubmit, setValue, getValues, watch } = useForm<TContactsBlock>({
    defaultValues: {
      contactsHtml: '',
      photo: '',
    },
  });
  const { showError, showSuccess } = useSnackbar();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPageBlock('home', 'contacts');
      const parsedData = JSON.parse(data.content);
      setValue('contactsHtml', parsedData.contactsHtml);
      setValue('photo', parsedData.photo);
      setLoading(false);
    };
    fetchData();
  }, [setValue]);

  const handleSave: SubmitHandler<TContactsBlock> = async (formData) => {
    try {
      await updatePageBlock('home', 'contacts', { content: JSON.stringify(formData) });
      showSuccess('Successfully saved!');
    } catch (error) {
      showError('An error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit(handleSave)}>
      {!loading ? (
        <>
          <CustomEditor name="contactsHtml" watch={watch} control={control} />
          <DeviderStyled />
          <Input shrink={getValues('photo')} label="Photo" fullWidth {...register('photo')} />

          <Button>Save</Button>
        </>
      ) : null}
    </form>
  );
};

export default ContactsTab;
