import { Router } from "express";
import db from "../db.js";
import { actualizarRequerimiento, eliminarRequerimiento } from "../controllers/requerimientos.controller.js";

const router = Router();


router.get("/", async (req, res) => {
  try {
    const { subcategoriaId } = req.query;

    if (!subcategoriaId) {
      return res.status(400).json({ error: "subcategoriaId es requerido" });
    }

    const [rows] = await db.query(
      "SELECT * FROM requerimientos WHERE subcategoria_id = ?",
      [subcategoriaId]
    );

    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.put('/:id', async (req, res) => {
  return await actualizarRequerimiento(req, res);
});


router.delete('/:id', async (req, res) => {
  return await eliminarRequerimiento(req, res);
});

export default router;
