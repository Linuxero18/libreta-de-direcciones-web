import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './estilos/LoginPage.css';
import React from 'react';

export default function LoginPage() {
    return (
      <>
        <div id="template-bg-1">
          <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
            <div className="card p-4 text-light bg-dark mb-5">
              <div className="card-header">
                <h3>Iniciar sesión</h3>
              </div>
              <div className="card-body w-100">
                <form name="login">
                  <div className="input-group form-group mt-3">
                    <div className="bg-secondary rounded-start">
                      <span className="m-3"><i className="fas fa-user mt-2"></i></span>
                    </div>
                    <input type="text" className="form-control" placeholder="Usuario" name="username" />
                  </div>
                  <div className="input-group form-group mt-3">
                    <div className="bg-secondary rounded-start">
                      <span className="m-3"><i className="fas fa-key mt-2"></i></span>
                    </div>
                    <input type="password" className="form-control" placeholder="Contraseña" name="password" />
                  </div>
                  <div className="form-group mt-3">
                    <input type="submit" value="Acceder" className="btn bg-secondary float-end text-white w-100" name="login-btn" />
                  </div>
                </form>
              </div>
              <div className="card-footer">
                <div className="d-flex justify-content-center">
                  <div className="text-primary">Si es un usuario registrado, inicie sesión aquí.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}
