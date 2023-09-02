import { useEffect, useState } from 'react';
import { fetchHomePageBlock, updateHomePageBlock } from 'src/utils/api';
import { useForm, SubmitHandler } from 'react-hook-form';
import useSnackbar from 'src/hooks/useSnackbar';
import Input from 'src/components/Input/Input';
import Button from 'src/components/Button';
import { Box, FormControlLabel, Switch } from '@mui/material';
import { DeviderStyled } from 'src/components/globalStyles';
import { TTitleTab } from 'src/utils/types';

const TitleTab: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const { showError, showSuccess } = useSnackbar();

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<TTitleTab>();

  useEffect(() => {
    const fetchTitle = async () => {
      try {
        const data = await fetchHomePageBlock('title');
        setValue('content', JSON.parse(data.content));
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTitle();
  }, [setValue]);

  const handleSave: SubmitHandler<TTitleTab> = async (formData) => {
    try {
      await updateHomePageBlock('title', JSON.stringify(formData.content));
      showSuccess('Successfully saved!');
    } catch (error) {
      showError('An error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit(handleSave)}>
      {!loading ? (
        <>
          <Input
            shrink={getValues('content.title')}
            label="Title"
            fullWidth
            {...register('content.title', { required: 'This field is required' })}
            error={Boolean(errors.content?.title)}
            helperText={errors.content?.title?.message}
          />

          <Input
            shrink={getValues('content.bgImage')}
            label="Background Image"
            fullWidth
            {...register('content.bgImage', { required: 'This field is required' })}
            error={Boolean(errors.content?.bgImage)}
            helperText={errors.content?.bgImage?.message}
          />

          {Object.keys(watch('content.buttons')).map((button, index) => {
            const label = getValues(`content.buttons.${button}.label`);
            const toggle = watch(`content.buttons.${button}.isActive`);

            return (
              <Box key={index}>
                <DeviderStyled />
                <Input
                  shrink={label}
                  label={label}
                  fullWidth
                  {...register(`content.buttons.${button}.label`, {
                    required: 'This field is required',
                  })}
                />
                <FormControlLabel
                  control={
                    <Switch {...register(`content.buttons.${button}.isActive`)} checked={toggle} />
                  }
                  label={toggle ? 'Show' : 'Hide'}
                />
              </Box>
            );
          })}

          <Button>Save</Button>
        </>
      ) : (
        <p>Loading</p>
      )}
    </form>
  );
};

export default TitleTab;
