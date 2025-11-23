import { Router } from "express";
import { listarUsuarios, actualizarUsuario, eliminarUsuario } from "../controllers/usuarios.controller.js";

const router = Router();


router.get("/", listarUsuarios);


router.put('/:id', async (req, res) => {
	return await actualizarUsuario(req, res);
});


router.delete('/:id', async (req, res) => {
	return await eliminarUsuario(req, res);
});

export default router;
