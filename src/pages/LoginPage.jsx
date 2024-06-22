import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './estilos/LoginPage.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [ruc, setRuc] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { navigate } = useNavigate();


  const Enviar = async (e) => {
    const isAuthenticated = true;
 
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      alert("Credenciales incorrectas");
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
                <form name="login">
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
                  {error && <div className="text-danger mt-3">{error}</div>}
                  <div className="form-group mt-3">
                    <input type="submit" value="Acceder" className="btn bg-secondary float-end text-white w-100" name="login-btn" onClick={ Enviar } />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}
