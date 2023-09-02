import React, { useState, useEffect } from 'react';
import { Switch, FormControlLabel } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { fetchHomePageBlock, updateHomePageBlock } from 'src/utils/api';
import useSnackbar from 'src/hooks/useSnackbar';
import { DeviderStyled } from 'src/components/globalStyles';
import Input from 'src/components/Input/Input';
import CustomEditor from 'src/components/CustomEditor';
import Button from 'src/components/Button';
import { TContactsBlock } from 'src/utils/types';

const ContactsTab: React.FC = () => {
  const [loading, setLoading] = useState(true);

  const {
    control,
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm<TContactsBlock>({
    defaultValues: {
      contactsHtml: '',
      socialLinks: {
        linkedin: {
          url: '',
          isActive: false,
        },
        instagram: {
          url: '',
          isActive: false,
        },
        youtube: {
          url: '',
          isActive: false,
        },
        facebook: {
          url: '',
          isActive: false,
        },
      },
    },
  });
  const { showError, showSuccess } = useSnackbar();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchHomePageBlock('contacts');
      const parsedData = JSON.parse(data.content);
      setValue('contactsHtml', parsedData.contactsHtml);
      setValue('socialLinks', parsedData.socialLinks);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleSave: SubmitHandler<TContactsBlock> = async (formData) => {
    try {
      await updateHomePageBlock('contacts', JSON.stringify(formData));
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
          {Object.keys(watch('socialLinks')).map((platform: string) => (
            <div key={platform}>
              <DeviderStyled />
              <Input
                shrink={getValues(`socialLinks.${platform}.url`)}
                label={platform}
                fullWidth
                {...register(`socialLinks.${platform}.url`)}
                disabled={!watch(`socialLinks.${platform}.isActive`)}
              />
              <FormControlLabel
                control={
                  <Switch
                    {...register(`socialLinks.${platform}.isActive`)}
                    checked={watch(`socialLinks.${platform}.isActive`)}
                  />
                }
                label={watch(`socialLinks.${platform}.isActive`) ? 'Show' : 'Hide'}
              />
            </div>
          ))}

          <Button>Save</Button>
        </>
      ) : null}
    </form>
  );
};

export default ContactsTab;
