import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';

interface IFormInput {
  name: string;
  email: string;
  phone: string;
  message: string;
  exhibition: string;
  country: string;
  industry: string;
}

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
  countries: string[];
  industries: string[];
  exhibitions: string[];
}

const ContactModal: React.FC<ContactModalProps> = ({
  open,
  onClose,
  countries,
  industries,
  exhibitions,
}) => {
  const { control, handleSubmit, reset } = useForm<IFormInput>();

  const onSubmit = (data: IFormInput) => {
    console.log(data);
    // TODO: Call API to send email
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Contact Us</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            render={({ field }) => <TextField {...field} label="Name" fullWidth margin="normal" />}
          />
          <Controller
            name="message"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField {...field} label="Messege" fullWidth margin="normal" />
            )}
          />
          {/* ... other fields */}
          <FormControl fullWidth margin="normal">
            <InputLabel id="exhibition-label">Exhibition</InputLabel>
            <Controller
              name="exhibition"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select {...field} label="Exhibition">
                  {exhibitions.map((exhibition) => (
                    <MenuItem key={exhibition} value={exhibition}>
                      {exhibition}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel id="country-label">Country</InputLabel>
            <Controller
              name="country"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select {...field} label="Country">
                  {countries.map((country) => (
                    <MenuItem key={country} value={country}>
                      {country}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel id="industry-label">Industry</InputLabel>
            <Controller
              name="industry"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select {...field} label="Country">
                  {industries.map((industry) => (
                    <MenuItem key={industry} value={industry}>
                      {industry}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Close</Button>
          <Button type="submit">Send</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ContactModal;
