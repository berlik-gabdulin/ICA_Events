import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { fetchPageBlock, updatePageBlock } from 'src/utils/api';
import useSnackbar from 'src/hooks/useSnackbar';
import Button from 'src/components/Button';
import { TSettingsMain } from 'src/utils/types';
import CustomEditor from 'src/components/CustomEditor';
import { DeviderStyled } from 'src/components/globalStyles';
import { Typography } from '@mui/material';
import Input from 'src/components/Input';

const MainTab = () => {
  const [loading, setLoading] = useState(true);

  const {
    handleSubmit,
    setValue,
    getValues,
    register,
    watch,
    control,
    formState: { errors },
  } = useForm<TSettingsMain>({
    defaultValues: {
      footer: '',
      privacyPolicy: '',
      privacyPolicyBanner: '',
    },
  });
  const { showError, showSuccess } = useSnackbar();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPageBlock('settings', 'main');
      const parsedData = JSON.parse(data.content);
      setValue('footer', parsedData.footer);
      setValue('privacyPolicy', parsedData.privacyPolicy);
      setValue('privacyPolicyBanner', parsedData.privacyPolicyBanner);

      setLoading(false);
    };
    fetchData();
  }, [setValue]);

  const handleSave: SubmitHandler<TSettingsMain> = async (formData) => {
    try {
      await updatePageBlock('settings', 'main', { content: JSON.stringify(formData) }, '#');
      showSuccess('Successfully saved!');
    } catch (error) {
      showError('An error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit(handleSave)}>
      {!loading ? (
        <>
          <Typography variant="h3" marginBottom="15px">
            Footer
          </Typography>
          <CustomEditor name="footer" watch={watch} control={control} />
          <DeviderStyled />
          <Typography variant="h3" marginBottom="15px">
            Privacy Policy
          </Typography>
          <CustomEditor name="privacyPolicy" watch={watch} control={control} />

          <Input
            label="Privacy Policy Banner"
            shrink={getValues('privacyPolicyBanner')}
            fullWidth
            {...register('privacyPolicyBanner', { required: 'This field is required' })}
            error={Boolean(errors.privacyPolicyBanner)}
            helperText={errors.privacyPolicyBanner?.message}
            style={{ marginTop: 30 }}
          />

          <Button>Save</Button>
        </>
      ) : null}
    </form>
  );
};

export default MainTab;
