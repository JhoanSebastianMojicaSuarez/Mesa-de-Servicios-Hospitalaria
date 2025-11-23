import React, { useState, useEffect } from "react";
import { getAreas, getSubcategorias } from "../api/solicitudes";
import { crearRequerimiento } from "../api/admin";
import { Link } from 'react-router-dom';

export default function CrearRequerimiento() {
  const [nombre, setNombre] = useState("");
  const [area_id, setAreaId] = useState("");
  const [subcategoria_id, setSubcategoriaId] = useState("");
  const [areas, setAreas] = useState([]);
  const [subcategorias, setSubcategorias] = useState([]);

  useEffect(() => {
    
    getAreas().then(setAreas).catch(err => {
      console.error("Error cargando áreas:", err);
      setAreas([]);
    });
  }, []);

  useEffect(() => {
    
    if (area_id) {
      getSubcategorias(area_id).then(setSubcategorias).catch(err => {
        console.error("Error cargando subcategorías:", err);
        setSubcategorias([]);
      });
    } else {
      setSubcategorias([]);
    }
  }, [area_id]);

  const enviar = async (e) => {
    e.preventDefault();
    await crearRequerimiento({ nombre, subcategoria_id });
    alert("Requerimiento creado");
    setNombre("");
    setSubcategoriaId("");
    setAreaId("");
  };

  return (
    <div>
      <p>¡Ingresa la información del requerimiento que deseas crear!</p>

      <form onSubmit={enviar}>
        <label>Área</label>
        <select value={area_id} onChange={e => setAreaId(e.target.value)} required>
          <option value="">Seleccione área</option>
          {areas.map(a => <option key={a.id} value={a.id}>{a.nombre}</option>)}
        </select>

        <label>Subcategoría</label>
        <select value={subcategoria_id} onChange={e => setSubcategoriaId(e.target.value)} required>
          <option value="">Seleccione subcategoría</option>
          {subcategorias.map(s => <option key={s.id} value={s.id}>{s.nombre}</option>)}
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
