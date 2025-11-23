import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({ usuario, onLogout }) {
  return (
    <header className="navbar">
     
      <div className="navbar-left">
        <Link to="/dashboard" className="brand">
          <img src="/Icono.png" alt="Logo" className="logo" />
          Mesa de Servicios
        </Link>
      </div>

      
      <nav className="navbar-right">

        {usuario ? (
          <>
            <span className="user-info">
              {usuario.nombre || usuario.name} {"  "}
              ({usuario.rol || usuario.role || "usuario"}
              )
            </span>

            <Link to="/solicitudes" className="nav-link">
              Solicitudes
            </Link>

            {(usuario.rol === "admin" || usuario.role === "admin") && (
              <Link to="/admin" className="nav-link">
                Menú
              </Link>
            )}

             {(usuario.rol === "usuario" || usuario.role === "usuario") && (
              <Link to="/dashboard" className="nav-link">
                Menú
              </Link>
            )}

            <button
              className="btn-logout"
              onClick={() => {
                localStorage.removeItem("usuario");
                if (typeof onLogout === "function") onLogout();
                window.location.href = "/login";
              }}
            >
              Cerrar sesión
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">
              Iniciar sesión
            </Link>

            <Link to="/register" className="nav-link">
              Registrar
            </Link>
          </>
        )}

      </nav>
    </header>
  );
}
