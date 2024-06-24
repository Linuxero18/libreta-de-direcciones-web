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
  const location = useLocation();
  const ruc = location.state?.ruc;

  useEffect(() => {
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

  const Editar = () => {
    if (servicioSeleccionado) {
      const servicioParaEditar = servicios.find(s => s.ABONADO === servicioSeleccionado);
      setFormularioData(servicioParaEditar);
      setMostrarFormulario(true);
    } else {
      setError("Por favor, seleccione un servicio para actualizar.");
    }
  };

  return (
    <div className="container">
      <h1 className="mt-5 mb-4" />
      <table className="table table-hover table-bordered">
        <thead className="thead-dark"> 
          <tr>
            <th>ABONADO</th>
            <th>NOMBRE</th>
            <th>CORREO</th>
            <th>CONTACTO</th>
            <th>TELEFONO</th>
            <th>WHATSAPP</th>
            <th>ROL</th>
            <th></th>
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
        <button className="btn btn-primary" type="button">Actualizar</button>
        </div>
      </div>
    </div>
  );
}
