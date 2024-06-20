import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';

export default function LoginPage() {
    return (
        <section className="vh-100 gradient-custom">
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                <div className="card text-white" style={{ borderRadius: '1rem',  maxWidth: '400px', maxHeight: '500px', backgroundColor: '#514EE6'}}>
                  <div className="card-body p-5 text-center">
                    <div className="mb-md-5 mt-md-4 pb-5">
                      <p className="text-black-60 mb-4">Por favor ingrese sus credenciales para acceder al sistema.</p>
                      <div data-mdb-input-init className="form-outline form-white mb-4">
                        <label className="form-label" htmlFor="typeEmailX">Usuario</label>
                        <input type="text" id="typeEmailX" className="form-control form-control-lg" />
                      </div>
                      <div data-mdb-input-init className="form-outline form-white mb-4">
                        <label className="form-label" htmlFor="typePasswordX">Contraseña</label>
                        <input type="password" id="typePasswordX" className="form-control form-control-lg" />
                      </div>
                      <button data-mdb-button-init data-mdb-ripple-init className="btn btn-outline-light btn-lg px-8" type="submit"><a href="/dashboard">Ingresar</a></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
    );
}
