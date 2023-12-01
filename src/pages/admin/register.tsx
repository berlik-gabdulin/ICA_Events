import React, { useState } from 'react';
import { Button, TextField, Container, Typography } from '@mui/material';
import AdminLayout from 'src/components/AdminLayout';
import useSnackbar from 'src/hooks/useSnackbar';

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const { showError, showSuccess } = useSnackbar();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        showSuccess(data.message);
      } else {
        showError(data.error);
      }
    } catch (error) {
      showError(error);
    }
  };

  return (
    <AdminLayout>
      <Container component="main" maxWidth="xs">
        <Typography component="h1" variant="h5">
          New user registration
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="E-mail"
            name="email"
            autoComplete="email"
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
          />
          <Button type="submit" fullWidth variant="contained" color="primary">
            Register
          </Button>
        </form>
      </Container>
    </AdminLayout>
  );
};

export default RegisterPage;
