import React from "react";
import { Link } from "react-router-dom";

export default function AdminPanel() {
  return (
    <div className="page-card" style={{ maxWidth: "900px", margin: "30px auto" }}>
      <div className="page-header" style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: "26px" }}>Panel de Administración</h2>
      </div>

      <hr style={{ margin: '24px 0', border: 'none', borderTop: '1px solid rgba(15,30,60,0.06)' }} />

      <div className="page-header">
        <h2 style={{ fontSize: '20px' }}>Listados rápidos</h2>
      </div>



      <p className="muted" style={{ marginBottom: 24 }}>
        Selecciona una acción administrativa:
      </p>

      {/* GRID DE TARJETAS LIMPIO Y ORDENADO */}
      <div
        className="dashboard-grid"
        style={{ marginTop: 10, alignItems: "stretch" }}
      >
        <Link className="card action" to="/admin/areas">
          <h3>Crear Área</h3>
          <p className="muted">Agregar nuevas áreas al hospital.</p>
          <div className="grid-actions">
            <button>Ir</button>
          </div>
        </Link>

        <Link className="card action" to="/admin/subcategorias">
          <h3>Crear Subcategoría</h3>
          <p className="muted">Gestionar subcategorías dentro de cada área.</p>
          <div className="grid-actions">
            <button>Ir</button>
          </div>
        </Link>

        <Link className="card action" to="/admin/requerimientos">
          <h3>Crear Requerimiento</h3>
          <p className="muted">Definir requerimientos vinculados a subcategorías.</p>
          <div className="grid-actions">
            <button>Ir</button>
          </div>
        </Link>

        <Link className="card action" to="/admin/usuarios">
          <h3>Crear Usuario</h3>
          <p className="muted">Registrar nuevos usuarios y asignarles roles.</p>
          <div className="grid-actions">
            <button>Ir</button>
          </div>
        </Link>

        <Link className="card action" to="/admin/solicitudes">
          <h3>Ver Solicitudes</h3>
          <p className="muted">Revisar y gestionar todas las solicitudes del sistema.</p>
          <div className="grid-actions">
            <button>Ir</button>
          </div>
        </Link>
      </div>
    </div>
  );
}