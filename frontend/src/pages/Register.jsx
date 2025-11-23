import React, { useState } from "react";
import { registerRequest } from "../api/auth";
import { useHistory, Link } from "react-router-dom";
import FormField from "../components/FormField";
import Button from "../components/Button";

export default function Register() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rol, setRol] = useState("usuario");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      const res = await registerRequest(nombre, email, password, rol);
      setSuccess("Registro exitoso. Redirigiendo a login...");

      // Esperar un momento y redirigir al login
      setTimeout(() => {
        history.push("/login");
      }, 1000);

    } catch (err) {
      setError(err.response?.data?.error || "Error en el servidor");
    }
  };

  return (
    <div className="page-card" style={{ maxWidth: 520, margin: '30px auto' }}>
      <div className="page-header"><h2>Registro</h2></div>

      {error && <p style={{ color: "var(--danger)", marginBottom: 12 }}>{error}</p>}
      {success && <p style={{ color: "var(--success)", marginBottom: 12 }}>{success}</p>}

      <form onSubmit={handleSubmit}>
        <FormField label="Nombre">
          <input type="text" placeholder="Tu nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        </FormField>

        <FormField label="Correo">
          <input type="email" placeholder="tu@correo.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </FormField>

        <div className="form-grid">
          <div>
            <FormField label="Contraseña">
              <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </FormField>
          </div>
          <div>
            <FormField label="Confirmar contraseña">
              <input type="password" placeholder="Confirmar contraseña" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            </FormField>
          </div>
        </div>

        <FormField label="Rol">
          <select value={rol} onChange={e => setRol(e.target.value)}>
            <option value="usuario">Usuario</option>
            <option value="admin">Admin</option>
          </select>
        </FormField>

        <div style={{display:'flex',gap:10,alignItems:'center',justifyContent:'space-between'}}>
          <Button type="submit">Registrarse</Button>
          <Link to="/login" style={{color:'var(--muted)'}}>¿Ya tienes cuenta?</Link>
        </div>
      </form>
    </div>
  );
}
