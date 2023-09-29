import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler, useFieldArray, Controller } from 'react-hook-form';
import { fetchPageBlock, updatePageBlock } from 'src/utils/api';
import useSnackbar from 'src/hooks/useSnackbar';
import DeleteIcon from '@mui/icons-material/Delete';
import Input from 'src/components/Input';
import Button from 'src/components/Button';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FileUploader from 'src/components/upload/FileUploader';
import ImagePreview from 'src/components/ImagePreview';
import { v4 as uuidv4 } from 'uuid';
import { formatDateRange } from 'src/utils/formatDateRange';
import { countries } from 'src/utils/network';

const InitEvent = {
  id: uuidv4(),
  title: '',
  description: '',
  website: '',
  image_profile: '',
  beginDate: '',
  dateRange: '',
  endDate: '',
  location: '',
  industry: '',
  country: '',
};

type FormData = {
  events: (typeof InitEvent)[];
};

const EventInputPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const { register, handleSubmit, setValue, control, getValues, watch } = useForm<FormData>({
    defaultValues: {
      events: [],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'events',
  });
  const { showError, showSuccess } = useSnackbar();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPageBlock('events', 'manual');
      setValue('events', JSON.parse(data.content).events);
      setLoading(false);
    };

    fetchData();
  }, [setValue]);

  const handleSave: SubmitHandler<FormData> = async (formData) => {
    const events = formData.events.map((event: any) => ({
      ...event,
      dateRange: formatDateRange(event),
    }));

    console.log(events);

    try {
      setLoading(true);
      await updatePageBlock('events', 'manual', { content: JSON.stringify({ events }) });
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
          {fields.map((item, index) => (
            <Accordion key={item.id}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{watch(`events.${index}.title`) || 'New Event'}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box display="flex" flexDirection="column" gap={2}>
                  <Input label="Title" fullWidth {...register(`events.${index}.title`)} />
                  <Input
                    label="Description"
                    fullWidth
                    {...register(`events.${index}.description`)}
                  />
                  <Input label="Website" fullWidth {...register(`events.${index}.website`)} />
                  <FileUploader
                    inputName={`events.${index}.image_profile`}
                    setValue={setValue}
                    folder="events"
                  />
                  <ImagePreview src={watch(`events.${index}.image_profile`)} />
                  <Input label="Begin Date" fullWidth {...register(`events.${index}.beginDate`)} />
                  <Input label="End Date" fullWidth {...register(`events.${index}.endDate`)} />
                  <Input label="Location" fullWidth {...register(`events.${index}.location`)} />
                  <Input label="Industry" fullWidth {...register(`events.${index}.industry`)} />

                  <FormControl fullWidth>
                    <InputLabel id={`country-label}`}>Country</InputLabel>
                    <Controller
                      name={`events.${index}.country`}
                      control={control}
                      render={({ field }) => (
                        <Select label="Country" fullWidth {...field} style={{ marginBottom: 15 }}>
                          {countries.map((country) => (
                            <MenuItem key={country} value={country}>
                              {country}
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                    />
                  </FormControl>
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
            onClick={() => append(InitEvent)}
            style={{ marginRight: '15px' }}
          >
            Add New Event +
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

export default EventInputPage;
