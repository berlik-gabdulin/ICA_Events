import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { fetchPageBlock, updatePageBlock } from 'src/utils/api';
import useSnackbar from 'src/hooks/useSnackbar';
import { v4 as uuidv4 } from 'uuid';
import {
  AccordionSummary,
  AccordionDetails,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Input from 'src/components/Input';
import CustomEditor from 'src/components/CustomEditor';
import { TSolution, TSolutions } from 'src/utils/types';
import { AccordionCustom, DeviderStyled } from 'src/components/globalStyles';
import styled from '@emotion/styled';
import { FONT_PRIMARY_BOLD } from 'src/theme/typography';
import Button from 'src/components/Button';
import FileUploader from 'src/components/upload/FileUploader';
import ImagePreview from 'src/components/ImagePreview';

const PageTab: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [toBeDeleted, setToBeDeleted] = useState<string | null>(null);
  const { register, handleSubmit, setValue, getValues, control, watch } = useForm<TSolutions>();
  const { showError, showSuccess } = useSnackbar();

  const solutions = watch('solutions') || [];

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPageBlock('solutions', 'page');
      const parsedData = JSON.parse(data.content);

      setValue('intro', parsedData.intro);
      setValue('solutions', parsedData.solutions);
      setValue('image', parsedData.image);
      setValue('contacts', parsedData.contacts);

      setLoading(false);
    };

    fetchData();
  }, [setValue]);

  const handleSave: SubmitHandler<TSolutions> = async (formData) => {
    try {
      await updatePageBlock('solutions', 'page', { content: JSON.stringify(formData) });
      showSuccess('Successfully saved!');
    } catch (error) {
      showError('An error occurred');
    }
  };

  const handleDelete = (id: string) => {
    const updatedSolutions = solutions.filter((solution) => solution.id !== id);
    setValue('solutions', updatedSolutions);
    setOpenDialog(false);
    setToBeDeleted(null);
  };

  const addNewSolution = () => {
    const updatedSolutions = [
      ...solutions,
      {
        id: uuidv4(),
        image: '',
        title: '',
        text: '',
      },
    ];
    setValue('solutions', updatedSolutions as TSolution[]);
  };

  return !loading ? (
    <form onSubmit={handleSubmit(handleSave)}>
      <Box display="flex" justifyContent="space-between" marginBottom={5}>
        <AccordionCustom>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Page settings</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FileUploader inputName="image" setValue={setValue} folder="pages" prefix="solutions" />
            <Input
              label="Background"
              shrink={watch('image')}
              fullWidth
              {...register('image', { required: 'This field is required' })}
            />
            <ImagePreview src={getValues('image')} />
            <DeviderStyled />

            <Heading>Intro text</Heading>
            <CustomEditor name="intro" watch={watch} control={control} />

            <DeviderStyled />

            <Heading>Contact Us</Heading>
            <CustomEditor
              name="contacts.text"
              watch={watch}
              control={control}
              style={{ marginBottom: 15 }}
            />
            <Input
              label="Title"
              shrink={getValues('contacts.title')}
              fullWidth
              {...register('contacts.title', { required: 'This field is required' })}
            />
            <Input
              label="Phone"
              shrink={getValues('contacts.phone')}
              fullWidth
              {...register('contacts.phone', { required: 'This field is required' })}
            />
            <Input
              label="E-mail"
              shrink={getValues('contacts.email')}
              fullWidth
              {...register('contacts.email', { required: 'This field is required' })}
            />
          </AccordionDetails>
        </AccordionCustom>
      </Box>

      <DeviderStyled />

      <Box style={{ marginBottom: '30px' }}>
        <Heading>Solutions</Heading>
        {solutions.map((solution, index) => (
          <AccordionCustom key={solution.id}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{solution.title || 'New Solution'}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box display="flex" flexDirection="column" gap={2}>
                <Input
                  label="Title"
                  {...register(`solutions.${index}.title`)}
                  shrink={getValues(`solutions.${index}.title`)}
                  fullWidth
                />
                <CustomEditor name={`solutions.${index}.text`} control={control} watch={watch} />
                <DeviderStyled />
                <FileUploader
                  inputName={`solutions.${index}.image`}
                  setValue={setValue}
                  folder="pages"
                  prefix="solutions"
                />

                <Input
                  label="Image"
                  {...register(`solutions.${index}.image`)}
                  shrink={getValues(`solutions.${index}.image`)}
                  fullWidth
                />
                <ImagePreview
                  src={getValues(`solutions.${index}.image`)}
                  width={264}
                  height={216}
                />

                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => {
                    setOpenDialog(true);
                    setToBeDeleted(solution.id);
                  }}
                >
                  Delete
                </Button>
              </Box>
            </AccordionDetails>
          </AccordionCustom>
        ))}
      </Box>
      <Button
        variant="outlined"
        color="primary"
        onClick={addNewSolution}
        style={{ marginRight: '15px' }}
      >
        Add New +
      </Button>
      <Button type="submit" variant="contained" color="primary">
        Save
      </Button>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{'Are you sure you want to delete this solution?'}</DialogTitle>
        <DialogContent>
          <DialogContentText>This action cannot be undone.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary" type="button">
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (toBeDeleted !== null) handleDelete(toBeDeleted);
            }}
            color="primary"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  ) : (
    <p>Loading...</p>
  );
};

export default PageTab;

const Heading = styled.h3`
  margin-bottom: 15px;
  font-size: 18px;
  font-family: ${FONT_PRIMARY_BOLD};
`;
