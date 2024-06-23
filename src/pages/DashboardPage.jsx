import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function DashboardPage() {
  const [servicio, setServicios] = useState([ ]);
  const { ruc } = useParams();

  useEffect(() => {
    const obtenerServicios = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/clientes/ruc/${ruc}`
        );
        setServicios(response.data);
      } catch (e) {
        console.error(e);
      }
    };
    obtenerServicios();
  }, [ruc]);
  return (
    <div className="container">
      <h1 className="mt-5 mb-4" />
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">ABONADO</th>
            <th scope="col">NOMBRE</th>
            <th scope="col">CORREO</th>
            <th scope="col">CONTACTO</th>
            <th scope="col">TELEFONO</th>
            <th scope="col">WHATSAPP</th>
            <th scope="col">ROL</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{servicio.NOMBRE}</td>
            <td>{servicio.CORREO}</td>
            <td>{servicio.CONTACTO}</td>
            <td>{servicio.TELEFONO}</td>
            <td>{servicio.WHATSAPP}</td>
            <td>{servicio.ROL}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
