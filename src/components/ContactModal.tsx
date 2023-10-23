import React, { useEffect } from 'react';
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
import { countriesDropdown, industries } from 'src/utils/network';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'src/redux/rootReducer';
import { closeModal, submitForm } from 'src/redux/slices/contactModalSlice';
import { useRouter } from 'next/router';

interface IFormInput {
  name: string;
  email: string;
  phone: string;
  message: string;
  industry: string;
  country: string;
}

const ContactModal: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { control, handleSubmit, setValue } = useForm<IFormInput>();
  const isModalOpen = useSelector((state: RootState) => state.contactModal.open);
  const selectedIndustry = useSelector((state: RootState) => state.contactModal.selectedIndustry); // Получаем выбранную индустрию из состояния

  useEffect(() => {
    if (selectedIndustry) {
      setValue('industry', selectedIndustry); // Устанавливаем значение выбранной индустрии в форму
    }
  }, [selectedIndustry, setValue]);

  const onClose = () => {
    dispatch(closeModal());
  };

  const onSubmit = (data: IFormInput) => {
    dispatch(submitForm(new URLSearchParams(Object.entries(data))));
  };

  return (
    <DialogStyled open={isModalOpen} onClose={onClose}>
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
            name="phone"
            control={control}
            defaultValue=""
            render={({ field }) => <TextField {...field} label="Phone" fullWidth margin="normal" />}
          />

          <Controller
            name="message"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField {...field} label="Message" fullWidth margin="normal" />
            )}
          />

          <FormControl fullWidth margin="normal">
            <InputLabel id="exhibition-label">Industry</InputLabel>
            <Controller
              name="industry"
              control={control}
              defaultValue={selectedIndustry || ''} // Устанавливаем значение по умолчанию из состояния Redux
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

          {!router.query.promo && (
            <FormControl fullWidth margin="normal">
              <InputLabel id="country-label">Country</InputLabel>
              <Controller
                name="country"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Select {...field} label="Country">
                    {countriesDropdown.map((country: string) => (
                      <MenuItem key={country} value={country}>
                        {country}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
          )}
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
