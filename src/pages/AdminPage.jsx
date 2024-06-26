import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
      <h1>Listado de Servicios</h1>
      {servicios.length > 0 ? (
        <ul>
          {servicios.map((servicio, index) => (
            <li key={index}>
              {servicio.ABONADO},{servicio.NOMBRE} {servicio.RUC}, {servicio.WHATSAPP}
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay servicios disponibles.</p>
      )}
    </div>
  );
}
