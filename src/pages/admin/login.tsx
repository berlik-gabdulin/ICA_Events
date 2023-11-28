import React, { useState } from 'react';
import { Button, TextField, Container, Typography } from '@mui/material';
import useSnackbar from 'src/hooks/useSnackbar';
import { useRouter } from 'next/router';

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { showError, showSuccess } = useSnackbar();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      console.log(data);

      if (response.ok) {
        localStorage.setItem('token', data.token);
        showSuccess('LogIn Success');
        router.push('/admin');
      } else {
        showError(data.error);
      }
    } catch (error) {
      showError(error);
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      style={{
        display: 'flex',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <Typography component="h1" variant="h5">
        Login
      </Typography>
      <form noValidate onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email"
          name="email"
          autoComplete="email"
          autoFocus
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
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default LoginPage;
