import db from "../db.js";

export const listarSubcategorias = async (req, res) => {
  try {
    const areaId = req.query.areaId;

    const sql = areaId
      ? `SELECT id, nombre, area_id FROM subcategorias WHERE area_id = ? ORDER BY nombre`
      : `SELECT id, nombre, area_id FROM subcategorias ORDER BY nombre`;

    const [rows] = areaId
      ? await db.query(sql, [areaId])
      : await db.query(sql);

    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const actualizarSubcategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, area_id } = req.body;

    const [result] = await db.query(
      `UPDATE subcategorias SET nombre = ?, area_id = ? WHERE id = ?`,
      [nombre, area_id || null, id]
    );

    if (result.affectedRows === 0) return res.status(404).json({ error: 'Subcategoría no encontrada' });

    res.json({ message: 'Subcategoría actualizada' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const eliminarSubcategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.query(`DELETE FROM subcategorias WHERE id = ?`, [id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Subcategoría no encontrada' });
    res.json({ message: 'Subcategoría eliminada' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
