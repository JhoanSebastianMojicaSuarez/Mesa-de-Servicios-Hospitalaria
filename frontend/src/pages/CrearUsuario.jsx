import React, { useState } from "react";
import { crearUsuario } from "../api/admin";
import { Link } from 'react-router-dom';

export default function CrearUsuario() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
    rol: "usuario"
  });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const enviar = async (e) => {
    e.preventDefault();
    await crearUsuario(form);
    alert("Usuario creado");
    setForm({ nombre: "", email: "", password: "", rol: "usuario" });
  };

  return (
    <div>
      <p>¡Ingresa la información del usuario que deseas crear!</p>
      <form onSubmit={enviar}>
        <input type="text" name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre" required />
        <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
        <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Contraseña" required />

        <select name="rol" value={form.rol} onChange={handleChange}>
          
          <option value="usuario">Usuario</option>
          <option value="admin">Administrador</option>
        </select>

        <button type="submit">Crear</button>
        <Link to="/admin" className="btn secondary" style={{ marginLeft: 10 }} aria-label="Volver al inicio">Volver al inicio</Link>
            
      </form>
    </div>
  );
}
