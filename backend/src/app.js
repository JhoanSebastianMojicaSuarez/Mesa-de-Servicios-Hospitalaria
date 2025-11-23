import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import solicitudesRouter from "./routes/solicitudes.js";
import areasRouter from "./routes/areas.js";
import subcategoriasRouter from "./routes/subcategorias.js";
import requerimientosRouter from "./routes/requerimientos.js";
import usuariosRouter from "./routes/usuarios.js";
import adminRouter from "./routes/admin.js";
import authRoutes from "./routes/auth.js";

const app = express();
app.use(cors());
app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/solicitudes", solicitudesRouter);
app.use("/api/areas", areasRouter);
app.use("/api/subcategorias", subcategoriasRouter);
app.use("/api/requerimientos", requerimientosRouter);
app.use("/api/usuarios", usuariosRouter);
app.use("/api/admin", adminRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log("Servidor corriendo en el puerto " + PORT);
});
