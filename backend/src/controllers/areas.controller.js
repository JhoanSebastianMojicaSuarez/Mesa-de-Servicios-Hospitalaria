import db from "../db.js";

export const listarAreas = async (req, res) => {
  try {
    const [rows] = await db.query(`SELECT id, nombre FROM areas ORDER BY nombre`);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const actualizarArea = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre } = req.body;

    const [result] = await db.query(`UPDATE areas SET nombre = ? WHERE id = ?`, [nombre, id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Área no encontrada' });
    res.json({ message: 'Área actualizada' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const eliminarArea = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.query(`DELETE FROM areas WHERE id = ?`, [id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Área no encontrada' });
    res.json({ message: 'Área eliminada' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
