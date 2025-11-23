import db from "../db.js";
import bcrypt from "bcryptjs";

export const listarUsuarios = async (req, res) => {
  try {
    const [rows] = await db.query(`SELECT id, nombre, email, rol FROM usuarios ORDER BY nombre`);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const actualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, email, rol, password } = req.body;

    let hashed = null;
    if (password) {
      hashed = await bcrypt.hash(password, 10);
    }

    const [result] = await db.query(
      `UPDATE usuarios SET nombre = ?, email = ?, rol = ?, password = COALESCE(?, password) WHERE id = ?`,
      [nombre, email, rol, hashed, id]
    );

    if (result.affectedRows === 0) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json({ message: 'Usuario actualizado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.query(`DELETE FROM usuarios WHERE id = ?`, [id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json({ message: 'Usuario eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
