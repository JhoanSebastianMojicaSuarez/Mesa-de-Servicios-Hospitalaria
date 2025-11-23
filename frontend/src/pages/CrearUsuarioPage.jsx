import React from 'react';
import CrearUsuario from './CrearUsuario';

export default function CrearUsuarioPage() {
  return (
    <div className="page-card" style={{ maxWidth: 760, margin: '30px auto' }}>
      <h2>Crear Usuario</h2>
      <CrearUsuario />
    </div>
  );
}
