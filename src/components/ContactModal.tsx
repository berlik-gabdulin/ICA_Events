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
import { countries, industries } from 'src/utils/network';
import { TEvent } from 'src/utils/types';
import styled from '@emotion/styled';

interface IFormInput {
  name: string;
  email: string;
  phone: string;
  message: string;
  industry: string;
  country: string;
}

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
  events: TEvent[];
}

const ContactModal: React.FC<ContactModalProps> = ({ open, onClose, events }) => {
  const { control, handleSubmit, reset } = useForm<IFormInput>();

  const onSubmit = (data: IFormInput) => {
    const formData = new URLSearchParams();

    Object.keys(data).forEach((key) => {
      formData.append(key, (data as any)[key]);
    });

    fetch('/public/sendmail.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    })
      .then((response) => response.text())
      .then((data) => {
        reset();
        onClose();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <DialogStyled open={open} onClose={onClose}>
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
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField {...field} label="E-Mail" fullWidth margin="normal" />
            )}
          />

          <Controller
            name="message"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField {...field} label="Messege" fullWidth margin="normal" />
            )}
          />

          <FormControl fullWidth margin="normal">
            <InputLabel id="exhibition-label">Industry</InputLabel>
            <Controller
              name="industry"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select {...field} label="Industry">
                  {industries.map((industry: string) => (
                    <MenuItem key={industry} value={industry}>
                      {industry.replace(/_/g, ' ').replace(/,/g, ', ').replace(/\s+/g, ' ')}
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
                  {countries.map((country: string) => (
                    <MenuItem key={country} value={country}>
                      {country}
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
    </DialogStyled>
  );
};

export default ContactModal;

const DialogStyled = styled(Dialog)`
  .MuiPaper-rounded,
  .MuiInputBase-root,
  .MuiButtonBase-root {
    border-radius: 0;
  }
`;
