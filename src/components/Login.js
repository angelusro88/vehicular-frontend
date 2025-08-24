import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', credentials);
      localStorage.setItem('token', response.data.token);
      onLogin();
    } catch (error) {
      alert('Error al iniciar sesión');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Iniciar Sesión</Typography>
      <form onSubmit={handleSubmit}>
        <TextField fullWidth margin="normal" label="Email" type="email" 
          value={credentials.email} onChange={(e) => setCredentials({...credentials, email: e.target.value})} />
        <TextField fullWidth margin="normal" label="Contraseña" type="password" 
          value={credentials.password} onChange={(e) => setCredentials({...credentials, password: e.target.value})} />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Ingresar
        </Button>
      </form>
    </Container>
  );
};

export default Login;