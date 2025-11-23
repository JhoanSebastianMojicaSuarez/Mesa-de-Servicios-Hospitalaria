import { Router } from "express";
import db from "../db.js";
import { actualizarSubcategoria, eliminarSubcategoria } from "../controllers/subcategorias.controller.js";

const router = Router();


router.get("/:area_id", async (req, res) => {
  try {
    const { area_id } = req.params;

    const [rows] = await db.query(
      "SELECT * FROM subcategorias WHERE area_id = ?",
      [area_id]
    );

    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get("/", async (req, res) => {
  try {
    const areaId = req.query.areaId || req.query.area_id;
    if (!areaId) return res.status(400).json({ error: "Falta parámetro areaId" });

    const [rows] = await db.query(
      "SELECT * FROM subcategorias WHERE area_id = ?",
      [areaId]
    );

    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;


router.put('/:id', async (req, res) => {
  return await actualizarSubcategoria(req, res);
});


router.delete('/:id', async (req, res) => {
  return await eliminarSubcategoria(req, res);
});
