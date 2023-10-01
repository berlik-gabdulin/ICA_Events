import { FormControlLabel, Switch } from '@mui/material';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Button from 'src/components/Button';
import Input from 'src/components/Input';
import { DeviderStyled } from 'src/components/globalStyles';
import useSnackbar from 'src/hooks/useSnackbar';
import { fetchPageBlock, updatePageBlock } from 'src/utils/api';
import { TSocialLinks } from 'src/utils/types';

type FormData = {
  socialLinks: TSocialLinks;
};

const SocialTab = () => {
  const [loading, setLoading] = useState(true);

  const { register, handleSubmit, setValue, getValues, watch } = useForm<FormData>({
    defaultValues: {
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
      const data = await fetchPageBlock('settings', 'social');
      const parsedData = JSON.parse(data.content);
      setValue('socialLinks', parsedData.socialLinks);
      setLoading(false);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSave: SubmitHandler<FormData> = async (formData) => {
    try {
      await updatePageBlock('settings', 'social', { content: JSON.stringify(formData) });
      showSuccess('Successfully saved!');
    } catch (error) {
      showError('An error occurred');
    }
  };
  return (
    <form onSubmit={handleSubmit(handleSave)}>
      {!loading ? (
        <>
          {Object.keys(watch('socialLinks')).map((platform: string) => (
            <div key={platform}>
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
              <DeviderStyled />
            </div>
          ))}

          <Button>Save</Button>
        </>
      ) : null}
    </form>
  );
};

export default SocialTab;
