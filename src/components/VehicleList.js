import React, { useState, useEffect } from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, IconButton, Typography 
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const VehicleList = ({ refresh }) => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    fetchVehicles();
  }, [refresh]);

  const fetchVehicles = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/vehicles');
      setVehicles(response.data);
    } catch (error) {
      console.error('Error obteniendo vehículos:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este vehículo?')) {
      try {
        await axios.delete(`http://localhost:5001/api/vehicles/${id}`);
        fetchVehicles(); // Actualizar la lista
        alert('✅ Vehículo eliminado exitosamente');
      } catch (error) {
        alert('❌ Error al eliminar vehículo');
      }
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        📋 Vehículos Registrados
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Marca</strong></TableCell>
              <TableCell><strong>Modelo</strong></TableCell>
              <TableCell><strong>Placa</strong></TableCell>
              <TableCell><strong>Año</strong></TableCell>
              <TableCell><strong>Color</strong></TableCell>
              <TableCell><strong>Acciones</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vehicles.map((vehicle) => (
              <TableRow key={vehicle.id}>
                <TableCell>{vehicle.marca}</TableCell>
                <TableCell>{vehicle.modelo}</TableCell>
                <TableCell>{vehicle.placa}</TableCell>
                <TableCell>{vehicle.año}</TableCell>
                <TableCell>{vehicle.color || 'N/A'}</TableCell>
                <TableCell>
                  <IconButton 
                    onClick={() => handleDelete(vehicle.id)} 
                    color="error"
                    title="Eliminar vehículo"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      {vehicles.length === 0 && (
        <Typography variant="body2" color="textSecondary" sx={{ mt: 2, textAlign: 'center' }}>
          No hay vehículos registrados aún.
        </Typography>
      )}
    </Paper>
  );
};

export default VehicleList;