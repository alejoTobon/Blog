
import { ingreso } from './controllers/login.js'; // Asegúrate de que la ruta al controlador sea correcta

import { Router } from "express";
const ingresar = Router();

// Ruta para iniciar sesión
ingresar.post('/login/ingreso', ingreso);

export default ingresar;
