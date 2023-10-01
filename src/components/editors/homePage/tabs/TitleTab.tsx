import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import useSnackbar from 'src/hooks/useSnackbar';
import Input from 'src/components/Input';
import Button from 'src/components/Button';
import { Box, FormControlLabel, Switch } from '@mui/material';
import { DeviderStyled } from 'src/components/globalStyles';
import { TTitleTab } from 'src/utils/types';
import { fetchPageBlock, updatePageBlock } from 'src/utils/api';
import FileUploader from 'src/components/upload/FileUploader';
import ImagePreview from 'src/components/ImagePreview';

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
        const data = await fetchPageBlock('home', 'title');
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
      await updatePageBlock('home', 'title', { content: JSON.stringify(formData.content) });
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

          <FileUploader
            inputName="content.bgImage"
            setValue={setValue}
            folder="pages"
            prefix="header"
          />
          <ImagePreview src={watch('content.bgImage')} alt="Header Background" height={200} />
          <Input
            shrink={getValues('content.bgImage')}
            label="Background image"
            fullWidth
            {...register('content.bgImage', { required: 'This field is required' })}
            error={Boolean(errors.content?.bgImage)}
            helperText={errors.content?.bgImage?.message}
          />

          <FileUploader
            inputName="content.bgImageMobile"
            setValue={setValue}
            folder="pages"
            prefix="headerMobile"
          />
          <ImagePreview
            src={watch('content.bgImageMobile')}
            alt="Mobile Header Background"
            height={200}
          />
          <Input
            shrink={getValues('content.bgImageMobile')}
            label="Background image mor mobile"
            fullWidth
            {...register('content.bgImageMobile', { required: 'This field is required' })}
            error={Boolean(errors.content?.bgImageMobile)}
            helperText={errors.content?.bgImageMobile?.message}
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
