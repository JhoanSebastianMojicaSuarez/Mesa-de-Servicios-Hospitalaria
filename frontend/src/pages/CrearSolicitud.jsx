import React, { useEffect, useState } from "react";
import { getAreas, getSubcategorias, getRequerimientos, getUsuarios, crearSolicitud } from "../api/solicitudes";

export default function CrearSolicitud({onCreated}) {
  const [areas, setAreas] = useState([]);
  const [subcategorias, setSubcategorias] = useState([]);
  const [requerimientos, setRequerimientos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  const [form, setForm] = useState({
    usuario_id: "",
    area_id: "",
    subcategoria_id: "",
    requerimiento_id: "",
    descripcion: ""
  });

  useEffect(() => {
    getAreas().then(setAreas);

    // Sólo pedir listado de usuarios si el usuario actual es admin.
    const usuario = JSON.parse(localStorage.getItem("usuario") || "null");
    if (!usuario) return;

    // Si el usuario es admin, no permitimos la creación desde este componente
    if (usuario && (usuario.rol === "admin" || usuario.role === "admin")) {
      // cargar usuarios si el backend lo requiere para ver info, pero no permitiremos crear
      getUsuarios().then(setUsuarios).catch(err => {
        console.error("No se pudieron cargar usuarios:", err);
        setUsuarios([]);
      });
      // No preseleccionamos usuario para admin
    } else {
      // Si no es admin, asignar sólo al propio usuario (evita 403)
      setUsuarios([usuario]);
      setForm(f => ({ ...f, usuario_id: usuario.id?.toString ? usuario.id.toString() : usuario.id }));
    }
  }, []);

  useEffect(() => {
  if (form.area_id) {
    getSubcategorias(form.area_id).then(data => {
      setSubcategorias(data);
      // Resetear valores cuando ya cargaron
      setForm(f => ({
        ...f,
        subcategoria_id: "",
        requerimiento_id: ""
      }));
      setRequerimientos([]);
    });
  } else {
    setSubcategorias([]);
    setRequerimientos([]);
  }
}, [form.area_id]);


  useEffect(() => {
  if (form.subcategoria_id) {
    getRequerimientos(form.subcategoria_id).then(data => {
      setRequerimientos(data);
      // Resetear solo cuando ya cargaron
      setForm(f => ({
        ...f,
        requerimiento_id: ""
      }));
    });
  } else {
    setRequerimientos([]);
  }
}, [form.subcategoria_id]);


  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    const usuario = JSON.parse(localStorage.getItem("usuario") || "null");
    if (usuario && (usuario.rol === "admin" || usuario.role === "admin")) {
      alert('Los administradores no pueden crear solicitudes desde esta interfaz.');
      return;
    }
    const payload = {
      usuario_id: Number(form.usuario_id),
      area_id: Number(form.area_id),
      subcategoria_id: form.subcategoria_id ? Number(form.subcategoria_id) : null,
      requerimiento_id: form.requerimiento_id ? Number(form.requerimiento_id) : null,
      descripcion: form.descripcion
    };
    try {
      const res = await crearSolicitud(payload);
      alert("Solicitud creada, ID: " + res.id);
      if (typeof onCreated === 'function') onCreated();
      // opcional: limpiar y refrescar lista
      setForm({ usuario_id: "", area_id: "", subcategoria_id: "", requerimiento_id: "", descripcion: "" });
    } catch (err) {
      console.error(err);
      alert("Error al crear solicitud");
    }
  };

  return (
    <div className="page-card">
      <h2>Crear Solicitud</h2>
      <form onSubmit={submit}>
        <div>
          <label>Usuario</label>
          <select name="usuario_id" value={form.usuario_id} onChange={handleChange} required>
            <option value="">-- Seleccione usuario --</option>
            {usuarios.map(u => <option key={u.id} value={u.id}>{u.nombre}</option>)}
          </select>
        </div>

        <div>
          <label>Área</label>
          <select name="area_id" value={form.area_id} onChange={handleChange} required>
            <option value="">-- Seleccione área --</option>
            {areas.map(a => <option key={a.id} value={a.id}>{a.nombre}</option>)}
          </select>
        </div>

        <div>
          <label>Subcategoría</label>
          <select name="subcategoria_id" value={form.subcategoria_id} onChange={handleChange}>
            <option value="">-- Seleccione subcategoría (opcional) --</option>
            {subcategorias.map(s => <option key={s.id} value={s.id}>{s.nombre}</option>)}
          </select>
        </div>

        <div>
          <label>Requerimiento</label>
          <select name="requerimiento_id" value={form.requerimiento_id} onChange={handleChange}>
            <option value="">-- Seleccione requerimiento (opcional) --</option>
            {requerimientos.map(r => <option key={r.id} value={r.id}>{r.nombre}</option>)}
          </select>
        </div>

        <div>
          <label>Descripción</label><br/>
          <textarea name="descripcion" value={form.descripcion} onChange={handleChange} required />
        </div>

        <button type="submit">Crear</button>
      </form>
    </div>
  );
}
