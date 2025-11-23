import { Router } from "express";
import db from "../db.js";
import bcrypt from "bcryptjs";
import { register } from "../controllers/auth.controller.js";

const router = Router();

router.post("/areas", async (req, res) => {
  const { nombre } = req.body;

  try {
    const [r] = await db.query(
      "INSERT INTO areas (nombre) VALUES (?)",
      [nombre]
    );

    res.json({ id: r.insertId });
  } catch (error) {
    res.status(500).json({ error: "Error creando área" });
  }
});


router.post("/subcategorias", async (req, res) => {
  const { nombre, area_id } = req.body;

  try {
    const [r] = await db.query(
      "INSERT INTO subcategorias (nombre, area_id) VALUES (?, ?)",
      [nombre, area_id]
    );

    res.json({ id: r.insertId });
  } catch (error) {
    res.status(500).json({ error: "Error creando subcategoría" });
  }
});


router.post("/requerimientos", async (req, res) => {
  const { nombre, subcategoria_id } = req.body;

  try {
    const [r] = await db.query(
      "INSERT INTO requerimientos (nombre, subcategoria_id) VALUES (?, ?)",
      [nombre, subcategoria_id]
    );

    res.json({ id: r.insertId });
  } catch (error) {
    res.status(500).json({ error: "Error creando requerimiento" });
  }
});




// Reusar el register para crear usuarios desde el admin
router.post("/usuarios", register);


router.put('/areas/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  try {
    const [r] = await db.query('UPDATE areas SET nombre = ? WHERE id = ?', [nombre, id]);
    if (r.affectedRows === 0) return res.status(404).json({ error: 'Área no encontrada' });
    res.json({ message: 'Área actualizada' });
  } catch (error) {
    res.status(500).json({ error: 'Error actualizando área' });
  }
});


router.delete('/areas/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [r] = await db.query('DELETE FROM areas WHERE id = ?', [id]);
    if (r.affectedRows === 0) return res.status(404).json({ error: 'Área no encontrada' });
    res.json({ message: 'Área eliminada' });
  } catch (error) {
    res.status(500).json({ error: 'Error eliminando área' });
  }
});


router.put('/subcategorias/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, area_id } = req.body;
  try {
    const [r] = await db.query('UPDATE subcategorias SET nombre = ?, area_id = ? WHERE id = ?', [nombre, area_id || null, id]);
    if (r.affectedRows === 0) return res.status(404).json({ error: 'Subcategoría no encontrada' });
    res.json({ message: 'Subcategoría actualizada' });
  } catch (error) {
    res.status(500).json({ error: 'Error actualizando subcategoría' });
  }
});


router.delete('/subcategorias/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [r] = await db.query('DELETE FROM subcategorias WHERE id = ?', [id]);
    if (r.affectedRows === 0) return res.status(404).json({ error: 'Subcategoría no encontrada' });
    res.json({ message: 'Subcategoría eliminada' });
  } catch (error) {
    res.status(500).json({ error: 'Error eliminando subcategoría' });
  }
});


router.put('/requerimientos/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, subcategoria_id } = req.body;
  try {
    const [r] = await db.query('UPDATE requerimientos SET nombre = ?, subcategoria_id = ? WHERE id = ?', [nombre, subcategoria_id || null, id]);
    if (r.affectedRows === 0) return res.status(404).json({ error: 'Requerimiento no encontrado' });
    res.json({ message: 'Requerimiento actualizado' });
  } catch (error) {
    res.status(500).json({ error: 'Error actualizando requerimiento' });
  }
});


router.delete('/requerimientos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [r] = await db.query('DELETE FROM requerimientos WHERE id = ?', [id]);
    if (r.affectedRows === 0) return res.status(404).json({ error: 'Requerimiento no encontrado' });
    res.json({ message: 'Requerimiento eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error eliminando requerimiento' });
  }
});

router.put('/usuarios/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, email, password, rol } = req.body;
  try {
    let hashed = null;
    if (password) hashed = await bcrypt.hash(password, 10);

    const [r] = await db.query('UPDATE usuarios SET nombre = ?, email = ?, rol = ?, password = COALESCE(?, password) WHERE id = ?', [nombre, email, rol, hashed, id]);
    if (r.affectedRows === 0) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json({ message: 'Usuario actualizado' });
  } catch (error) {
    res.status(500).json({ error: 'Error actualizando usuario' });
  }
});


router.delete('/usuarios/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [r] = await db.query('DELETE FROM usuarios WHERE id = ?', [id]);
    if (r.affectedRows === 0) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json({ message: 'Usuario eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error eliminando usuario' });
  }
});
export default router;