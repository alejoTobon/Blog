import { buscar,crear,eliminar,actualizar } from "../Controllers/usuarioController.js";

import { Router } from "express";

const usuario = Router();

usuario.get("/usuario/buscar", buscar)
usuario.post("/usuario/crear",crear)
usuario.put("/usuario/actualizar/:id", actualizar)
usuario.delete("/usuario/eliminar/:id", eliminar)

export default usuario;