import express from "express";
import cors from "cors";

import dotenv from 'dotenv';
import rutaComent from "./Routes/comentarioRoutes.js";
import rutaUser from "./Routes/usuarioRoutes.js";
import rutaPublic from "./Routes/publicacionRoutes.js";
import ingresar from "./Routes/loginRoutes.js";
import { ssequelize } from "./db.js";
 // Asegúrate de importar el controlador 'actualizar'

dotenv.config();

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET','POST','PUT','DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

const app = express();
const puerto = 3100;

 // Asegúrate de que esta configuración sea la correcta

app.use(cors(corsOptions));
app.use(express.json());


app.use(ingresar);
app.use(rutaComent);
app.use(rutaPublic);
app.use(rutaUser); 

// Rutas específicas para manejar archivos


app.server = app.listen(puerto, () => {
  console.log(`Server ejecutándose en ${puerto}...`);
});

(async () => {
  try {
    await ssequelize.sync({ force: false });
    console.log("Sincronización ok!");
  } catch (error) {
    console.log(`Error en la sincronización: ${error}`);
  }
})();
