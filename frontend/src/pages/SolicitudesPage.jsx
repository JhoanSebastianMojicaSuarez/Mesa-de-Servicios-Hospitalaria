import React, { useState, useCallback } from "react";
import CrearSolicitud from "./CrearSolicitud";
import ListarSolicitudes from "./ListarSolicitudes";

export default function SolicitudesPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCreated = useCallback(() => {
    
    setRefreshKey(k => k + 1);
  }, []);

  const usuario = JSON.parse(localStorage.getItem('usuario') || 'null');

  return (
    <div>
      {/* Mostrar el formulario sólo para usuarios no-admin */}
      {usuario && (usuario.rol === 'admin' || usuario.role === 'admin') ? (
        <div style={{marginBottom:12,color:'#fff'}}>
          <strong>Nota: Estás viendo las solicitudes como administrador. La creación de nuevas solicitudes está deshabilitada para administradores.</strong>
        </div>
      ) : (
        <>
          <CrearSolicitud onCreated={handleCreated} />
          <div style={{ height: 18 }} />
        </>
      )}

      <ListarSolicitudes refresh={refreshKey} />
    </div>
  );
}
