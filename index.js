import express from "express"

import rutaComent from "./Routes/comentarioRoutes.js";
import rutaUser from "./Routes/usuarioRoutes.js";
import rutaPublic from "./Routes/publicacionRoutes.js";
import { ssequelize } from "./db.js";

import cors from "cors";


import dotenv from 'dotenv';
const corsOptions = {
  origin: ['http://localhost:5173'],
  methods: ['GET','POST','PUT','DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
dotenv.config();
const app = express();

const puerto = 3100;
app.use(express.json());
app.use(rutaComent)
app.use(rutaUser)
app.use(rutaPublic)

app.use(cors(corsOptions))


app.server = app.listen(puerto, () => {
  console.log(`Server ejecutandose en ${puerto}...`);
});

ssequelize
  .sync({ force: false })
  .then(() => {
    console.log("sincronizacion ok!");
  })
  .catch((error) => {
    console.log(`error en la sincronizacion`);
  });
