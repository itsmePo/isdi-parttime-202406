import "dotenv/config";
import express from "express";
import { connect } from "mongoose";
import userRoutes from "./routes/userRoutes.js"; // Importar las rutas de usuarios

// Conexión a MongoDB
connect(process.env.MONGODB_URI)
  .then(() => {
    console.info(`API connected to ${process.env.MONGODB_URI}`);

    // Configuración de Express
    const api = express();

    // Middleware para parsear JSON
    api.use(express.json());

    // Rutas
    api.use("/users", userRoutes); // Prefijo para las rutas de usuarios

    // Ruta base
    api.get("/", (req, res) => {
      res.send("Hello, World!");
    });

    // Iniciar el servidor
    api.listen(process.env.PORT, () =>
      console.info(`API listening on PORT ${process.env.PORT}`)
    );

    api.post("/appProject", (req, res) => {
        res.status(200).send("ruta POST /appProject recibida correctamente");
    });
  })
  .catch((error) => console.error("Error al conectar a MongoDB:", error));
