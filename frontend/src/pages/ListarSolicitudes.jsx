import React, { useEffect, useState } from "react";
import { getSolicitudes } from "../api/solicitudes";

export default function ListarSolicitudes({ refresh }) {
  const [solicitudes, setSolicitudes] = useState([]);

  useEffect(() => {
    getSolicitudes().then(setSolicitudes).catch(err => console.error(err));
  }, [refresh]);

  return (
    <div className="page-card">
      <h2>Lista de Solicitudes</h2>
      <table style={{ width: "100%", marginTop: "20px" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Usuario</th>
            <th>Área</th>
            <th>Subcategoría</th>
            <th>Requerimiento</th>
            <th>Descripción</th>
            <th>Estado</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {solicitudes.map(s => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.usuario_nombre || "—"}</td>
              <td>{s.area_nombre || "—"}</td>
              <td>{s.subcategoria_nombre || "—"}</td>
              <td>{s.requerimiento_nombre || "—"}</td>
              <td>{s.descripcion}</td>
              <td>{s.estado}</td>
              <td>{new Date(s.fecha_creacion).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
