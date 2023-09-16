import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { fetchPageBlock, updatePageBlock } from 'src/utils/api';
import useSnackbar from 'src/hooks/useSnackbar';
import { v4 as uuidv4 } from 'uuid';
import {
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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Input from 'src/components/Input';
import CustomEditor from 'src/components/CustomEditor';
import { TContactsPage, TOffice } from 'src/utils/types';
import { AccordionCustom } from 'src/components/globalStyles';

const themes = ['Medium', 'Light', 'Dark'];

const PageTab: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [toBeDeleted, setToBeDeleted] = useState<string | null>(null);
  const { register, handleSubmit, setValue, getValues, control, watch } = useForm<TContactsPage>();
  const { showError, showSuccess } = useSnackbar();

  const offices = watch('offices') || [];

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPageBlock('contacts', 'page');
      const parsedData = JSON.parse(data.content);
      setValue('offices', parsedData.offices);
      setValue('image', parsedData.image);
      setLoading(false);
    };

    fetchData();
  }, [setValue]);

  const handleSave: SubmitHandler<TContactsPage> = async (formData) => {
    try {
      await updatePageBlock('contacts', 'page', { content: JSON.stringify(formData) });
      showSuccess('Successfully saved!');
    } catch (error) {
      showError('An error occurred');
    }
  };

  const handleDelete = (id: string) => {
    const updatedOffices = offices.filter((office) => office.id !== id);
    setValue('offices', updatedOffices);
    setOpenDialog(false);
    setToBeDeleted(null);
  };

  const addNewOffice = () => {
    const updatedOffices = [
      ...offices,
      {
        id: uuidv4(),
        image: '',
        city: '',
        text: '',
        hours: '',
        theme: 'Light',
        map: '',
      },
    ];
    setValue('offices', updatedOffices as TOffice[]);
  };

  return !loading ? (
    <form onSubmit={handleSubmit(handleSave)}>
      <Box style={{ marginBottom: '30px' }}>
        <Input
          label="Meta Description"
          shrink={getValues('image')}
          fullWidth
          {...register('image', { required: 'This field is required' })}
        />
      </Box>
      <Box style={{ marginBottom: '30px' }}>
        {offices.map((office, index) => (
          <AccordionCustom key={office.id}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{office.city || 'New Office'}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box display="flex" flexDirection="column" gap={2}>
                <Input label="City" {...register(`offices.${index}.city`)} fullWidth />
                <CustomEditor name={`offices.${index}.text`} control={control} watch={watch} />
                <Input label="Image" {...register(`offices.${index}.image`)} fullWidth />
                <CustomEditor name={`offices.${index}.hours`} control={control} watch={watch} />
                <Input label="Map" {...register(`offices.${index}.map`)} fullWidth />
                <FormControl fullWidth>
                  <InputLabel id={`theme-label-${index}`}>Theme</InputLabel>
                  <Controller
                    name={`offices.${index}.theme`}
                    control={control}
                    render={({ field }) => (
                      <Select labelId={`theme-label-${index}`} label="Theme" {...field}>
                        {themes.map((theme) => (
                          <MenuItem key={theme} value={theme}>
                            {theme}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </FormControl>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => {
                    setOpenDialog(true);
                    setToBeDeleted(office.id);
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
        onClick={addNewOffice}
        style={{ marginRight: '15px' }}
      >
        Add New +
      </Button>
      <Button type="submit" variant="contained" color="primary">
        Save
      </Button>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{'Are you sure you want to delete this office?'}</DialogTitle>
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

export default PageTab;
