import React, { useState } from "react";
import { crearArea } from "../api/admin";
import { Link } from 'react-router-dom';

export default function CrearArea() {
  const [nombre, setNombre] = useState("");

  const enviar = async (e) => {
    e.preventDefault();
    await crearArea({ nombre });
    alert("Área creada");
    setNombre("");
  };

  return (
    <div>
      <p>¡Ingresa la información del área que deseas crear!</p>
      <form onSubmit={enviar}>
        <input
          type="text"
          placeholder="Nombre del área"
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
