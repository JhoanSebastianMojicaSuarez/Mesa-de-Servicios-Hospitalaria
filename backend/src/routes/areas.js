import { Router } from "express";
import { listarAreas, actualizarArea, eliminarArea } from "../controllers/areas.controller.js";

const router = Router();


router.get("/", listarAreas);
router.put('/:id', async (req, res) => {
	return await actualizarArea(req, res);
});
router.delete('/:id', async (req, res) => {
	return await eliminarArea(req, res);
});

export default router;
