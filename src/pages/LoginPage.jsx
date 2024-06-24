import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles/LoginPage.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function LoginPage({ setEstaAutenticado }) {
  const [ruc, setRuc] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();


  const Enviar = async (e) => {
    e.preventDefault();

    if (ruc === '' && password === '') {
      setError('Ingrese el RUC y la contraseña para poder continuar');
      return;
    }

    if (ruc === '') {
      setError('Ingrese el RUC para continuar');
      return;
    }
    if (password === '') {
      setError('Ingrese la contraseña para continuar');
      return;
    }
    
    try {
      const response = await axios.get(`http://localhost:4000/passwords/${ruc}`);
      const usuario = response.data;

      if (usuario.length > 0){
        const user = usuario.find((user) => user.PASSWORD === password);
          if (user) {
            setError('');
            setEstaAutenticado(true);
            navigate(`/dashboard`, { state: { ruc: ruc } });
          } else {
            setError('RUC o contraseña incorrecta');
          }
      } else {
        setError('RUC o contraseña incorrecta');
      }
    } catch (e) {
      setError('No se pudo obtener la información del usuario');
    }
  }

  return (
      <>
        <div id="template-bg-1">
          <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
            <div className="card p-4 text-light bg-dark mb-5">
              <div className="card-header" align="center">
                <h3>INICIAR SESION</h3>
              </div>
              <div className="card-body w-100">
                <form name="login" onSubmit={Enviar}>
                  <div className="input-group form-group mt-3">
                    <div className="bg-secondary rounded-start">
                      <span className="m-3"><i className="fas fa-user mt-2"></i></span>
                    </div>
                    <input type="text" className="form-control" placeholder="RUC" value={ruc} onChange={(e) => setRuc(e.target.value)} />
                  </div>
                  <div className="input-group form-group mt-3">
                    <div className="bg-secondary rounded-start">
                      <span className="m-3"><i className="fas fa-key mt-2"></i></span>
                    </div>
                    <input type="password" className="form-control" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
                  </div>
                  {error && <div className="text-danger mt-3" align="center">{error}</div>}
                  <div className="form-group mt-3">
                    <button type="submit" className="btn bg-secondary float-end text-white w-100" name="login-btn">Acceder</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}
