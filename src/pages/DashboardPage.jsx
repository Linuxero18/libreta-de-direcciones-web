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
      console.log("RUC: " + ruc);
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

  const rolChange = (e) => {
    const rol = e.target.value;
    setFormularioData(prevState => ({ ...prevState, ROL: rol }));
    console.log("Rol seleccionado: ", rol);
  };

  const rolesDisponibles = ["Atencion de alertas", "Control de cambio", "Facturacion"];

  const GuardarRegistrar = async (e) => {
    e.preventDefault();

    const datosActualizados = {
      nombre: formularioData.NOMBRE,
      correo: formularioData.CORREO,
      contacto: formularioData.CONTACTO,
      telefono: formularioData.TELEFONO,
      whatsapp: formularioData.WHATSAPP,
      rol: formularioData.ROL
    };

    console.log("Datos actualizados: ", datosActualizados);

    try {
      const response = await axios.put(`http://localhost:4000/clientes/${servicioSeleccionado}`, datosActualizados, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const responseHistorial = await axios.post(`http://localhost:4000/historial`, {
        abonado: servicioSeleccionado,
        ...datosActualizados,
        fu_modificacion: new Date().toISOString()
      });

      setError("El servicio "+ servicioSeleccionado +" se ha actualizado correctamente.");
      setMostrarFormulario(false);
      await obtenerServicios();
      console.log("DATA:" + JSON.stringify(formularioData));
      console.log("Respuesta del servidor:", response.data); 
      console.log("Respuesta del servidor tabla historial:", responseHistorial.data);
    } catch (e) {
      setError("Error al actualizar el servicio.");
      console.log(e);
    }
  }

  const Cancelar = () => {
    setFormularioData({
      NOMBRE: '',
      CORREO: '',
      CONTACTO: '',
      TELEFONO: '',
      WHATSAPP: '',
      ROL: ''
    });
    setMostrarFormulario(false);
  };

  return (
    <div className="container">
      <h1 className="mt-5 mb-4" />
      <table className="table table-hover table-bordered" key={servicios.length}>
        <thead className="thead-dark"> 
          <tr>
            <th>Nº</th>
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
              <td>{index + 1}</td>
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
          <div className="group-btn">
            <button className="btn btn-secondary" type="button">Detalles</button>
            <button className="btn btn-primary" type="button" onClick={Actualizar}>Actualizar</button>
          </div>
        </div>
      </div>
      <div className="container2" align="center">
        {mostrarFormulario && (
          <div className="card">
            <div class="headerform">DATOS DEL SERVICIO {formularioData.ABONADO} - {formularioData.RUC}</div>
              <form onSubmit={GuardarRegistrar}>
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
                  <input type="number" className="form-control spin" id="telefono" name="TELEFONO" value={formularioData.TELEFONO || ''} onChange={InputData} required onKeyDown={(e) => e.key === 'ArrowUp' || e.key === 'ArrowDown' ? e.preventDefault() : null}/>
                </div>
                <div className="mb-3">
                  <label htmlFor="whatsapp" className="form-label">WhatsApp:</label>
                  <input type="number" className="form-control spin" id="whatsapp" name="WHATSAPP" value={formularioData.WHATSAPP || ''} onChange={InputData} required onKeyDown={(e) => e.key === 'ArrowUp' || e.key === 'ArrowDown' ? e.preventDefault() : null}/>
                </div>
                <div className="mb-3">
                  <label htmlFor="rol" className="form-label">Rol:</label>
                  <select className="form-control" id="rol" name="ROL" value={formularioData.ROL}  onChange={rolChange}>
                    {rolesDisponibles.map((rol, index) => (
                      <option key={index} value={rol}>{rol}</option>
                    ))}
                  </select>
                </div>
                <div className="footer">
                  <button type="button" className="btn btn-danger btnform" onClick={Cancelar}>Cancelar</button>
                  <button type="submit" className="btn btn-primary btnform" disabled={cargando}>{cargando ? 'Guardando ...' : 'Guardar'}</button>
                </div>
              </form>
          </div>
        )}
      </div>
      <div className='container3'>
      </div>
    </div>
  );
}
