import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function AdminPage() {
  const [servicios, setServicios] = useState([]);

  const obtenerServicios = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/clientes`);
      setServicios(response.data);
      console.log(response.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    obtenerServicios();
  }, []);

  return (
    <div className="container mt-5">
      <h1 style={{fontFamily: 'inherit'}} className="mb-4">Listado de Servicios</h1>
      {servicios.length > 0 ? (
        <table className="table table-striped mb-5">
          <thead>
            <tr>
              <th style={{ backgroundColor: 'GrayText', color: 'white' }}>Abonado</th>
              <th style={{ backgroundColor: 'GrayText', color: 'white' }}>Nombre</th>
              <th style={{ backgroundColor: 'GrayText', color: 'white' }}>RUC</th>
              <th style={{ backgroundColor: 'GrayText', color: 'white' }}>Correo</th>
              <th style={{ backgroundColor: 'GrayText', color: 'white' }}>Contacto</th>
              <th style={{ backgroundColor: 'GrayText', color: 'white' }}>Teléfono</th>
              <th style={{ backgroundColor: 'GrayText', color: 'white' }}>WhatsApp</th>
              <th style={{ backgroundColor: 'GrayText', color: 'white' }}>Rol</th>
            </tr>
          </thead>
          <tbody>
            {servicios.map((servicio, index) => (
              <tr key={index}>
                <td>{servicio.ABONADO}</td>
                <td>{servicio.NOMBRE}</td>
                <td>{servicio.RUC}</td>
                <td>{servicio.CORREO}</td>
                <td>{servicio.CONTACTO}</td>
                <td>{servicio.TELEFONO}</td>
                <td>{servicio.WHATSAPP}</td>
                <td>{servicio.ROL}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay servicios disponibles.</p>
      )}
    </div>
  );
}
