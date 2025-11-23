import React, { useState, useEffect } from "react";
import { getAreas } from "../api/solicitudes";
import { crearSubcategoria } from "../api/admin";
import { Link } from 'react-router-dom';

export default function CrearSubcategoria() {
  const [nombre, setNombre] = useState("");
  const [area_id, setAreaId] = useState("");
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    getAreas().then(setAreas);
  }, []);

  const enviar = async (e) => {
    e.preventDefault();
    await crearSubcategoria({ nombre, area_id });
    alert("Subcategoría creada");
    setNombre("");
    setAreaId("");
  };

  return (
    <div>
      <p>¡Ingresa la información de la subcategoría que deseas crear!</p>
      <form onSubmit={enviar}>
        <select value={area_id} onChange={e => setAreaId(e.target.value)} required>
          <option value="">Seleccione área</option>
          {areas.map(a => <option key={a.id} value={a.id}>{a.nombre}</option>)}
        </select>

        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <button type="submit">Crear</button>
        <Link to="/admin" className="btn secondary" style={{ marginLeft: 10 }} aria-label="Volver al inicio">Volver al inicio</Link>
                    
      </form>
    </div>
  );
}
