import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { fetchPageBlock, updatePageBlock } from 'src/utils/api';
import useSnackbar from 'src/hooks/useSnackbar';
import { v4 as uuidv4 } from 'uuid';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
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
import { TTestimonials } from 'src/utils/types';

const TestimonialsTab: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [toBeDeleted, setToBeDeleted] = useState<string | null>(null);
  const { register, handleSubmit, setValue, control, watch } = useForm<TTestimonials>();
  const { showError, showSuccess } = useSnackbar();

  const testimonials = watch('testimonials') || [];

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPageBlock('home', 'testimonials');
      const parsedData = JSON.parse(data.content);
      setValue('testimonials', parsedData);
      setLoading(false);
    };

    fetchData();
  }, [setValue]);

  const handleSave: SubmitHandler<TTestimonials> = async (formData) => {
    try {
      await updatePageBlock('home', 'testimonials', {
        content: JSON.stringify(formData.testimonials),
      });
      showSuccess('Successfully saved!');
    } catch (error) {
      showError('An error occurred');
    }
  };

  const handleDelete = (id: string) => {
    const updatedTestimonials = testimonials.filter((testimonial) => testimonial.id !== id);
    setValue('testimonials', updatedTestimonials);
    setOpenDialog(false);
    setToBeDeleted(null);
  };

  const addNewTestimonial = () => {
    if (testimonials.length < 10) {
      const updatedTestimonials = [...testimonials, { id: uuidv4(), author: '', testimonial: '' }];
      setValue('testimonials', updatedTestimonials);
    }
  };

  const hasEmptyFields = testimonials
    ? testimonials.some((testimonial) => !testimonial.author || !testimonial.testimonial)
    : false;

  return !loading ? (
    <form onSubmit={handleSubmit(handleSave)}>
      <Box style={{ marginBottom: '30px' }}>
        {testimonials.map((testimonial, index) => (
          <Accordion key={testimonial.id}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{testimonial.author || 'New Testimonial'}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Input
                label="Author"
                {...register(`testimonials.${index}.author`, {
                  required: 'This field is required',
                })}
                fullWidth
              />
              <CustomEditor
                name={`testimonials.${index}.testimonial`}
                control={control}
                watch={watch}
                style={{ marginBottom: '15px' }}
              />
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => {
                  setOpenDialog(true);
                  setToBeDeleted(testimonial.id);
                }}
              >
                Delete
              </Button>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
      <Button
        variant="outlined"
        color="primary"
        onClick={addNewTestimonial}
        style={{ marginRight: '15px' }}
        disabled={!(testimonials.length < 10)}
      >
        Add New +
      </Button>
      <Button type="submit" variant="contained" color="primary" disabled={hasEmptyFields}>
        Save
      </Button>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{'Are you sure you want to delete this testimonial?'}</DialogTitle>
        <DialogContent>
          <DialogContentText>This action cannot be undone.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
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

export default TestimonialsTab;
