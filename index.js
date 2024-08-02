import express from "express";
import cors from "cors";
import multer from 'multer';
import dotenv from 'dotenv';

import rutaComent from "./Routes/comentarioRoutes.js";
import rutaUser from "./Routes/usuarioRoutes.js";
import rutaPublic from "./Routes/publicacionRoutes.js";
import { ssequelize } from "./db.js";
import { crear, actualizar } from './Controllers/usuarioController.js'; // Asegúrate de importar el controlador 'actualizar'

dotenv.config();

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET','POST','PUT','DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

const app = express();
const puerto = 3100;

const upload = multer({ dest: 'uploads/' }); // Asegúrate de que esta configuración sea la correcta

app.use(cors(corsOptions));
app.use(express.json());

app.use('/comentarios', rutaComent);
app.use('/publicaciones', rutaPublic);
app.use('/usuarios', rutaUser); // Prefijo general para las rutas de usuarios

// Rutas específicas para manejar archivos
app.post('/usuarios/crear', upload.single('foto'), crear);
app.post('/usuarios/actualizar/:id', upload.single('foto'), actualizar);

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
