import db from "../db.js";

export const listarRequerimientos = async (req, res) => {
  try {
    const subcategoriaId = req.query.subcategoriaId;
    const sql = subcategoriaId
      ? `SELECT id, nombre, subcategoria_id FROM requerimientos WHERE subcategoria_id = ? ORDER BY nombre`
      : `SELECT id, nombre, subcategoria_id FROM requerimientos ORDER BY nombre`;

    const [rows] = subcategoriaId ? await db.query(sql, [subcategoriaId]) : await db.query(sql);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const actualizarRequerimiento = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, subcategoria_id } = req.body;

    const [result] = await db.query(
      `UPDATE requerimientos SET nombre = ?, subcategoria_id = ? WHERE id = ?`,
      [nombre, subcategoria_id || null, id]
    );

    if (result.affectedRows === 0) return res.status(404).json({ error: 'Requerimiento no encontrado' });

    res.json({ message: 'Requerimiento actualizado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const eliminarRequerimiento = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.query(`DELETE FROM requerimientos WHERE id = ?`, [id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Requerimiento no encontrado' });
    res.json({ message: 'Requerimiento eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
