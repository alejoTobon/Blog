import express from "express";
import cors from "cors";
import multer from 'multer';
import upload from './config/upload.js';
import rutaComent from "./Routes/comentarioRoutes.js";
import rutaUser from "./Routes/usuarioRoutes.js";
import rutaPublic from "./Routes/publicacionRoutes.js";
import { ssequelize } from "./db.js";
import dotenv from 'dotenv';

dotenv.config();

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET','POST','PUT','DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

const app = express();
const puerto = 3100;



app.use(cors(corsOptions));
app.use(express.json());

// Uso del middleware de multer en las rutas específicas que manejan archivos

app.use(rutaComent);
app.use(rutaPublic);
app.use(rutaUser);
app.post('/usuario/crear', upload.single('foto'), rutaUser);
app.use('/usuario/crear', upload.single('foto'), rutaUser); // Rutas que manejan archivos
app.use('/usuario/actualizar/:id', upload.single('foto'), rutaUser); // Rutas que manejan archivos

app.server = app.listen(puerto, () => {
  console.log(`Server ejecutándose en ${puerto}...`);
});

ssequelize
  .sync({ force: false })
  .then(() => {
    console.log("Sincronización ok!");
  })
  .catch((error) => {
    console.log(`Error en la sincronización: ${error}`);
  });
