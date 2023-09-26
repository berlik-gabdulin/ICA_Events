import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form';
import { fetchPageBlock, updatePageBlock } from 'src/utils/api';
import useSnackbar from 'src/hooks/useSnackbar';
import DeleteIcon from '@mui/icons-material/Delete';
import Input from 'src/components/Input';
import Button from 'src/components/Button';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FileUploader from 'src/components/upload/FileUploader';
import ImagePreview from 'src/components/ImagePreview';

const InitAPI = {
  label: '',
  apiUrl: '',
  apiKey: '',
  country: '',
};

type FormData = {
  image: string;
  apis: {
    label: string;
    apiUrl: string;
    apiKey: string;
    country: string;
  }[];
};

const ApiTab: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const { register, handleSubmit, setValue, control, getValues, watch } = useForm<FormData>({
    defaultValues: {
      image: '',
      apis: [],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'apis',
  });
  const { showError, showSuccess } = useSnackbar();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPageBlock('events', 'api');
      setValue('image', JSON.parse(data.content).image);
      setValue('apis', JSON.parse(data.content).apis);
      setLoading(false);
    };

    fetchData();
  }, [setValue]);

  const handleSave: SubmitHandler<FormData> = async (formData) => {
    try {
      setLoading(true);
      await updatePageBlock('events', 'api', { content: JSON.stringify(formData) });
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
          <FileUploader inputName="image" setValue={setValue} folder="pages" />
          <Input label="Image" shrink={getValues('image')} fullWidth {...register('image')} />
          <ImagePreview src={watch('image')} />
          {fields.map((item, index) => (
            <Accordion key={item.id}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{watch(`apis.${index}.label`) || 'New API'}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box display="flex" flexDirection="column" gap={2}>
                  <Input label="Label" fullWidth {...register(`apis.${index}.label`)} />
                  <Input label="API URL" fullWidth {...register(`apis.${index}.apiUrl`)} />
                  <Input label="API Key" fullWidth {...register(`apis.${index}.apiKey`)} />
                  <Input label="Country" fullWidth {...register(`apis.${index}.country`)} />
                  <Button variant="outlined" color="secondary" onClick={() => remove(index)}>
                    Remove <DeleteIcon style={{ fontSize: 20 }} />
                  </Button>
                </Box>
              </AccordionDetails>
            </Accordion>
          ))}
          <Button
            variant="outlined"
            color="primary"
            type="button"
            onClick={() => append(InitAPI)}
            style={{ marginRight: '15px' }}
          >
            Add New API +
          </Button>
          <Button variant="contained" color="primary">
            Save
          </Button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </form>
  );
};

export default ApiTab;
