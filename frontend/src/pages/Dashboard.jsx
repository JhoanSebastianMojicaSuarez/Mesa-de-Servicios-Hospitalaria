import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';

export default function Dashboard() {
  const usuario = JSON.parse(localStorage.getItem('usuario') || 'null');

  if (!usuario) {
    return (
      <div className="page-card content-wrapper">
        <h2>Bienvenido</h2>
        <p>No hay usuario autenticado.</p>
      </div>
    );
  }

  const rol = usuario.rol || usuario.role || "usuario";

  return (
    <div className="page-card content-wrapper">
      {/* Encabezado */}
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">
            Bienvenido, {usuario.nombre || usuario.name}
          </h1>
          <p className="dashboard-role">
            Rol: <strong>{rol}</strong>
          </p>
        </div>

        <img
          src="/hospital.svg"
          alt="Hospital"
          className="dashboard-logo"
          onError={(e) => (e.target.style.display = "none")}
        />
      </div>

      <hr className="divider" />

      {/* Contenido según rol */}
      <div className="dashboard-grid">
        {rol === "usuario" && (
          <Card className="dashboard-card">
            <h3>Crear y ver solicitudes</h3>
            <p className="muted">
              Registra nuevas solicitudes y consulta el estado de tus tickets.
            </p>
            <div className="card-actions">
              <Link to="/solicitudes">
                <Button>Ir a Solicitudes</Button>
              </Link>
            </div>
          </Card>
        )}

        {rol === "admin" && (
          <>
            <Card className="dashboard-card">
              <h3>Panel de Administración</h3>
              <p className="muted">
                Gestiona áreas, subcategorías, requerimientos y usuarios.
              </p>
              <div className="card-actions">
                <Link to="/admin">
                  <Button>Ir al Panel</Button>
                </Link>
              </div>
            </Card>

            <Card className="dashboard-card">
              <h3>Ver todas las solicitudes</h3>
              <p className="muted">
                Revisa, administra y da seguimiento a todas las solicitudes.
              </p>
              <div className="card-actions">
                <Link to="/solicitudes">
                  <Button>Ver Solicitudes</Button>
                </Link>
              </div>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
