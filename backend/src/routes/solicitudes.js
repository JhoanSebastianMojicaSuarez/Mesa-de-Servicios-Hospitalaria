import { Router } from "express";
import {
  listarSolicitudes,
  crearSolicitud,
  actualizarSolicitud,
  eliminarSolicitud
} from "../controllers/solicitudes.controller.js";

const router = Router();


router.get("/", listarSolicitudes);

router.post("/", crearSolicitud);


router.put('/:id', async (req, res) => {
  return await actualizarSolicitud(req, res);
});


router.delete('/:id', async (req, res) => {
  return await eliminarSolicitud(req, res);
});

export default router;
