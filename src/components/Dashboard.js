import React, { useState } from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import VehicleForm from './VehicleForm';
import VehicleList from './VehicleList';

const Dashboard = ({ onLogout }) => {
  const [refresh, setRefresh] = useState(0);

  const handleVehicleAdded = () => {
    setRefresh(prev => prev + 1); // Forzar actualización de la lista
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h3" gutterBottom>
            🚗 Dashboard - Sistema Vehicular
          </Typography>
          <Button variant="outlined" onClick={onLogout} color="secondary">
            🚪 Cerrar Sesión
          </Button>
        </Box>

        {/* Formulario de registro */}
        <VehicleForm onVehicleAdded={handleVehicleAdded} />
        
        {/* Lista de vehículos */}
        <VehicleList refresh={refresh} />
      </Box>
    </Container>
  );
};

export default Dashboard;