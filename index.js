import express from "express"

import rutaComent from "./Routes/comentarioRoutes.js";
import rutaUser from "./Routes/usuarioRoutes.js";
import rutaPublic from "./Routes/publicacionRoutes.js";
import { ssequelize } from "./db.js";
import dotenv from 'dotenv';
dotenv.config();
const app = express();

const puerto = 3100;
app.use(express.json());
app.use(rutaComent)
app.use(rutaUser)
app.use(rutaPublic)




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
