import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { fetchPageBlock, updatePageBlock } from 'src/utils/api';
import useSnackbar from 'src/hooks/useSnackbar';
import { AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CustomEditor from 'src/components/CustomEditor';
import Button from 'src/components/Button';
import Input from 'src/components/Input';
import { TAboutPage } from 'src/utils/types';
import FileUploader from 'src/components/upload/FileUploader';
import ImagePreview from 'src/components/ImagePreview';
import { AccordionCustom, DeviderStyled } from 'src/components/globalStyles';

type FormData = {
  about: TAboutPage;
};

const PageTab: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const { register, handleSubmit, watch, control, setValue, getValues } = useForm<FormData>({
    defaultValues: { about: { text: '' } },
  });
  const { showError, showSuccess } = useSnackbar();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPageBlock('about', 'page');
      setValue('about', JSON.parse(data.content));
      setLoading(false);
    };

    fetchData();
  }, [setValue]);

  const handleSave: SubmitHandler<FormData> = async (formData) => {
    try {
      setLoading(true);
      await updatePageBlock('about', 'page', { content: JSON.stringify(formData.about) });
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
          <Box display="flex" flexDirection="column" gap={2} marginBottom={2}>
            <AccordionCustom>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Page settings</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <FileUploader inputName="about.image" setValue={setValue} folder="pages" />
                <Input
                  label="Image"
                  shrink={getValues('about.image')}
                  fullWidth
                  {...register('about.image')}
                />
                <ImagePreview src={getValues('about.image')} />
              </AccordionDetails>
            </AccordionCustom>
          </Box>

          <CustomEditor name="about.text" control={control} watch={watch} />
        </>
      ) : (
        <p>Loading</p>
      )}
      <Button variant="contained" color="primary">
        Save
      </Button>
    </form>
  );
};

export default PageTab;
