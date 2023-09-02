import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import AdminLayout from 'src/components/AdminLayout';

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

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
        setMessage(data.message);
      } else {
        setMessage(data.error);
      }

      setOpen(true);
    } catch (error) {
      setMessage('Ошибка при регистрации');
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <AdminLayout>
      <Container component="main" maxWidth="xs">
        <Typography component="h1" variant="h5">
          Регистрация
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Имя"
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
            label="Электронная почта"
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
            label="Пароль"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
          />
          <Button type="submit" fullWidth variant="contained" color="primary">
            Зарегистрироваться
          </Button>
        </form>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={handleClose}
            severity={message === 'Пользователь успешно зарегистрирован' ? 'success' : 'error'}
          >
            {message}
          </MuiAlert>
        </Snackbar>
      </Container>
    </AdminLayout>
  );
};

export default RegisterPage;
