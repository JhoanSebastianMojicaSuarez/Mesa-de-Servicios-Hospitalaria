import React from 'react';
import { useState, useRef, useEffect } from "react";
import { loginRequest } from "../api/auth";
import { Link, useHistory } from "react-router-dom";
import FormField from "../components/FormField";
import Button from "../components/Button";

export default function Login({ onLogin }) {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (mounted.current) setLoading(true);
    try {
      const res = await loginRequest(email, password);
      // Extraer usuario del body (el backend puede devolver { usuario } o el objeto directamente)
      const usuario = res.data.usuario || res.data.user || res.data;

      // Guardar usuario (sin token)
      localStorage.setItem("usuario", JSON.stringify(usuario));

      // Avisar al App.js que ya inició sesión (si existe handler)
      if (onLogin) onLogin(usuario);

      // Redirigir al dashboard donde se muestran acciones según rol
      history.push("/dashboard");

    } catch (err) {
      console.error("Error en login:", err);
      const status = err.response?.status;
      const data = err.response?.data;
      const serverMessage = data?.error || data?.message || JSON.stringify(data) || null;
      if (mounted.current) {
        if (status) setError(`Error ${status}: ${serverMessage || 'Acceso denegado'}`);
        else setError("Error en el servidor");
      }
    } finally {
      if (mounted.current) setLoading(false);
    }
  };

  return (
    <div className="page-card" style={{ maxWidth: 420, margin: '40px auto' }}>
      <div className="page-header">
        <h2>Iniciar sesión</h2>
      </div>

      {error && <p style={{ color: "var(--danger)", marginBottom: 12 }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <FormField label="Correo">
          <input
            type="email"
            placeholder="tu@correo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FormField>

        <FormField label="Contraseña">
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </FormField>

        <div style={{display:'flex',gap:10,alignItems:'center',justifyContent:'space-between'}}>
          <Button type="submit" disabled={loading}>{loading ? "Ingresando..." : "Ingresar"}</Button>
          <Link to="/register" style={{color:'var(--muted)'}}>¿No tienes cuenta?</Link>
        </div>
      </form>
    </div>
  );
}
