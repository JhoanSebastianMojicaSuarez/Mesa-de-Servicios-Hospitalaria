import db from "../db.js";

export const listarSolicitudes = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT s.id,
             s.descripcion,
             s.estado,
             s.evidencia_url,
             s.fecha_creacion,
             u.nombre AS usuario_nombre,
             a.nombre AS area_nombre,
             sc.nombre AS subcategoria_nombre,
             r.nombre AS requerimiento_nombre
      FROM solicitudes s
      LEFT JOIN usuarios u ON s.usuario_id = u.id
      LEFT JOIN areas a ON s.area_id = a.id
      LEFT JOIN subcategorias sc ON s.subcategoria_id = sc.id
      LEFT JOIN requerimientos r ON s.requerimiento_id = r.id
      ORDER BY s.fecha_creacion DESC
    `);

    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const crearSolicitud = async (req, res) => {
  try {
    const { usuario_id, area_id, subcategoria_id, requerimiento_id, descripcion } = req.body;

    if (!usuario_id || !area_id || !descripcion) {
      return res.status(400).json({ error: "usuario_id, area_id y descripcion son requeridos" });
    }

    const [result] = await db.query(
      `INSERT INTO solicitudes (usuario_id, area_id, subcategoria_id, requerimiento_id, descripcion)
       VALUES (?, ?, ?, ?, ?)`,
      [usuario_id, area_id, subcategoria_id || null, requerimiento_id || null, descripcion]
    );

    await db.query(
      `INSERT INTO historial_solicitudes (solicitud_id, estado) VALUES (?, ?)`,
      [result.insertId, 'Nuevo']
    ).catch(() => {});

    res.json({ message: "Solicitud creada", id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const actualizarSolicitud = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado, descripcion, evidencia_url } = req.body;

    const [result] = await db.query(
      `UPDATE solicitudes SET estado = COALESCE(?, estado), descripcion = COALESCE(?, descripcion), evidencia_url = COALESCE(?, evidencia_url) WHERE id = ?`,
      [estado || null, descripcion || null, evidencia_url || null, id]
    );

    if (result.affectedRows === 0) return res.status(404).json({ error: 'Solicitud no encontrada' });

    
    if (estado) {
      await db.query(`INSERT INTO historial_solicitudes (solicitud_id, estado) VALUES (?, ?)`, [id, estado]).catch(() => {});
    }

    res.json({ message: 'Solicitud actualizada' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const eliminarSolicitud = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.query(`DELETE FROM solicitudes WHERE id = ?`, [id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Solicitud no encontrada' });
    res.json({ message: 'Solicitud eliminada' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
