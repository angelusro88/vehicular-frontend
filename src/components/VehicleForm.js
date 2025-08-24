import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Paper } from '@mui/material';
import axios from 'axios';

const VehicleForm = ({ onVehicleAdded }) => {
  const [formData, setFormData] = useState({
    marca: '',
    modelo: '',
    placa: '',
    año: '',
    color: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/api/vehicles', formData);

      if (response.data.success) {
        alert('✅ Vehículo registrado exitosamente!');
        setFormData({ marca: '', modelo: '', placa: '', año: '', color: '' });
        onVehicleAdded(); // Notificar que se agregó un vehículo
      }
    } catch (error) {
      alert('❌ Error al registrar vehículo: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" gutterBottom>
        📝 Registrar Nuevo Vehículo
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          <TextField
            label="Marca *"
            value={formData.marca}
            onChange={(e) => setFormData({...formData, marca: e.target.value})}
            required
            sx={{ flex: 1 }}
          />
          <TextField
            label="Modelo *"
            value={formData.modelo}
            onChange={(e) => setFormData({...formData, modelo: e.target.value})}
            required
            sx={{ flex: 1 }}
          />
          <TextField
            label="Placa *"
            value={formData.placa}
            onChange={(e) => setFormData({...formData, placa: e.target.value})}
            required
            sx={{ flex: 1 }}
          />
          <TextField
            label="Año *"
            type="number"
            value={formData.año}
            onChange={(e) => setFormData({...formData, año: e.target.value})}
            required
            sx={{ flex: 1 }}
          />
          <TextField
            label="Color"
            value={formData.color}
            onChange={(e) => setFormData({...formData, color: e.target.value})}
            sx={{ flex: 1 }}
          />
        </Box>
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          🚗 Registrar Vehículo
        </Button>
      </form>
    </Paper>
  );
};

export default VehicleForm;