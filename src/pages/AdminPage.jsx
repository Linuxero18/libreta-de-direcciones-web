import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function AdminPage() {
  const [servicios, setServicios] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(false);

  const obtenerServicios = async () => {
    try {
      setCargando(true);
      const response = await axios.get(`http://localhost:4000/clientes`);
      setServicios(response.data);
      console.log(response.data);
    } catch (e) {
      console.error(e);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerServicios();
  }, []);

  const serviciosfiltrados = useMemo(() => {
    return servicios.filter((servicio) => 
      Object.values(servicio).some((valor) =>
        String(valor).toLowerCase().includes(busqueda.toLowerCase())
      )
    )
  }, [servicios, busqueda]);

  const Buscar = (e) => {
    setBusqueda(e.target.value);
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4" align="center">Listado de Servicios</h1>
      <input type="text" className="form-control mb-4" placeholder="Buscar ..." onChange={Buscar} />
      <p align="center">Se encontraron {serviciosfiltrados.length} servicios.</p>
      {cargando > 0 ? (
        <p>Cargando servicios ...</p>
      ) : serviciosfiltrados.length > 0 ? (
        <>
          <table className="table table-striped mb-5">
            <thead className="thead-dark">
              <tr>
                <th>Abonado</th>
                <th>Nombre</th>
                <th>RUC</th>
                <th>Correo</th>
                <th>Contacto</th>
                <th>Teléfono</th>
                <th>WhatsApp</th>
                <th>Rol</th>
              </tr>
            </thead>
            <tbody>
              {serviciosfiltrados.map((servicio, index) => (
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
        </>
        ) : (
          <p>No se encontraron servicios que coincidan con la búsqueda.</p>
        )}
      </div>
  );
}
