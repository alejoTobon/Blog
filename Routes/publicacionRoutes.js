import { buscar,crear,eliminar,actualizar } from "../Controllers/publicacionController.js";

import { Router } from "express";

const publicacion = Router();

publicacion.get("/publicacion/buscar", buscar)
publicacion.post("/publicacion/crear",crear)
publicacion.put("/publicacion/actualizar/:id", actualizar)
publicacion.delete("/publicacion/eliminar/:id", eliminar)

export default publicacion;