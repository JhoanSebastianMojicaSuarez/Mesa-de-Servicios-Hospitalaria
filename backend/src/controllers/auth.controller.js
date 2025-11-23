import bcrypt from "bcryptjs";
import db from "../db.js";
export const register = async (req, res) => {
  const { nombre, email, password, rol } = req.body;

  try {
    
    const [exist] = await db.query(
      "SELECT id FROM usuarios WHERE email = ?",
      [email]
    );

    if (exist.length > 0) {
      return res.status(400).json({ error: "El correo ya está registrado" });
    }

   
    const hashed = await bcrypt.hash(password, 10);

   
    const [result] = await db.query(
      "INSERT INTO usuarios (nombre, email, password, rol) VALUES (?, ?, ?, ?)",
      [nombre, email, hashed, rol]
    );

    res.json({
      message: "Usuario registrado exitosamente",
      id: result.insertId,
    });

  } catch (error) {
    console.error(error && error.stack ? error.stack : error);
    return res.status(500).json({ error: "Error en el servidor" });
  }
};


export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await db.query(
      "SELECT * FROM usuarios WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return res.status(400).json({ error: "Usuario no encontrado" });
    }

    const usuario = rows[0];

    const match = await bcrypt.compare(password, usuario.password);
    if (!match) {
      return res.status(400).json({ error: "Contraseña incorrecta" });
    }

   
    delete usuario.password;

    res.json({
      message: "Login exitoso",
      usuario,
    });

  } catch (error) {
    console.error(error && error.stack ? error.stack : error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};
