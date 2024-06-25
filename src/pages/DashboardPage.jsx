import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/DashboardPage.css';
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function DashboardPage() {
  const [servicios, setServicios] = useState([]);
  const [servicioSeleccionado, setServicioSeleccionado] = useState(null);
  const [error, setError] = useState('');
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [formularioData, setFormularioData] = useState({});
  const [cargando, setCargando] = useState(false);
  const location = useLocation();
  const ruc = location.state?.ruc;

  const obtenerServicios = async () => {
      if (!ruc) {
        console.log("No se encontró el RUC");
        return;
      }
      console.log("Ruc ingresado: " + ruc);
      try {
        const response = await axios.get(
          `http://localhost:4000/clientes/ruc/${ruc}`
        );
        setServicios(response.data);
      } catch (e) {
        console.error(e);
      }
  };

  useEffect(() => {
    if (ruc){
      obtenerServicios();
    }
  }, [ruc]);

  if (servicios.length === 0) {
    return <div className="container mt-5">Cargando datos...</div>
  }

  const RadioChange = (abonado) => {
    setServicioSeleccionado(abonado);
    setMostrarFormulario(false);
    setError("Abonado seleccionado: " + abonado);
  };

  const Actualizar = () => {
    if (servicioSeleccionado) {
      const servicioParaEditar = servicios.find(s => s.ABONADO === servicioSeleccionado);
      setFormularioData(servicioParaEditar);
      setMostrarFormulario(true);
    } else {
      setError("Por favor, seleccione un servicio para actualizar.");
    }
  };

  const InputData = (e) => {
    const { name, value } = e.target;
    setFormularioData(prevState => ({ ...prevState, [name]: value }));
  };

  const Guardar = async (e) => {
    e.preventDefault();

    const datosActualizados = {
      nombre: formularioData.NOMBRE,
      correo: formularioData.CORREO,
      contacto: formularioData.CONTACTO,
      telefono: formularioData.TELEFONO,
      whatsapp: formularioData.WHATSAPP,
      rol: formularioData.ROL
    };
    
    try {
      await axios.put(`http://localhost:4000/clientes/${servicioSeleccionado}`, datosActualizados, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setError("El servicio se ha actualizado correctamente.");
      setMostrarFormulario(false);
      await obtenerServicios();
    } catch (e) {
      setError("Error al actualizar el servicio.");
      console.log(e);
    }
  }

  return (
    <div className="container">
      <h1 className="mt-5 mb-4" />
      <table className="table table-hover table-bordered" key={servicios.length}>
        <thead className="thead-dark"> 
          <tr>
            <th>ABONADO</th>
            <th>NOMBRE</th>
            <th>CORREO</th>
            <th>CONTACTO</th>
            <th>TELEFONO</th>
            <th>WHATSAPP</th>
            <th>ROL</th>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {servicios.map((servicio, index) => (
            <tr key={index}>
              <td>{servicio.ABONADO}</td>
              <td>{servicio.NOMBRE}</td>
              <td>{servicio.CORREO}</td>
              <td>{servicio.CONTACTO}</td>
              <td>{servicio.TELEFONO}</td>
              <td>{servicio.WHATSAPP}</td>
              <td>{servicio.ROL}</td>
              <td><input type="radio" name="servicio"
                  value={servicio.ABONADO}
                  onChange={() => RadioChange(servicio.ABONADO)}
                  checked={servicioSeleccionado === servicio.ABONADO}/></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-grid gap-2">
        <div className="footer">
        {error && <div className="text-danger mt-3" align="left">{error}</div>}
        <button className="btn btn-primary" type="button" onClick={Actualizar}>Actualizar</button>
        </div>
      </div>
      {mostrarFormulario && (
        <form onSubmit={Guardar}>
          <h2 className="mt-5 mb-4">Actualización de datos del RUC {formularioData.RUC}</h2>
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">Nombre:</label>
            <input type="text" className="form-control" id="nombre" name="NOMBRE" value={formularioData.NOMBRE || ''} onChange={InputData} required/>
          </div>
          <div className="mb-3">
            <label htmlFor="correo" className="form-label">Correo:</label>
            <input type="email" className="form-control" id="correo" name="CORREO" value={formularioData.CORREO || ''} onChange={InputData} required/>
          </div>
          <div className="mb-3">
            <label htmlFor="contacto" className="form-label">Contacto:</label>
            <input type="text" className="form-control" id="contacto" name="CONTACTO" value={formularioData.CONTACTO || ''} onChange={InputData} required/>
          </div>
          <div className="mb-3">
            <label htmlFor="telefono" className="form-label">Teléfono:</label>
            <input type="text" className="form-control" id="telefono" name="TELEFONO" value={formularioData.TELEFONO || ''} onChange={InputData} required/>
          </div>
          <div className="mb-3">
            <label htmlFor="whatsapp" className="form-label">WhatsApp:</label>
            <input type="text" className="form-control" id="whatsapp" name="WHATSAPP" value={formularioData.WHATSAPP || ''} onChange={InputData} required/>
          </div>
          <div className="mb-3">
            <label htmlFor="rol" className="form-label">Rol:</label>
            <input type="text" className="form-control" id="rol" name="ROL" value={formularioData.ROL || ''} onChange={InputData} required/>
          </div>
          <button type="submit" className="btn btn-primary" disabled={cargando}>{cargando ? 'Guardando ...' : 'Guardar'}</button>
        </form>
      )}
    </div>
  );
}
