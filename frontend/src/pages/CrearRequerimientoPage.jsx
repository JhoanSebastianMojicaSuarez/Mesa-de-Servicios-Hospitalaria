import React from 'react';
import CrearRequerimiento from './CrearRequerimiento';

export default function CrearRequerimientoPage() {
  return (
    <div className="page-card" style={{ maxWidth: 760, margin: '30px auto' }}>
      <h2>Crear Requerimiento</h2>
      <CrearRequerimiento />
    </div>
  );
}
