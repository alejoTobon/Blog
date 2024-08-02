import { buscar,crear,eliminar,actualizar } from "../Controllers/comentarioController.js";

import { Router } from "express";

const comentario = Router();

comentario.get("/comentario/buscar", buscar)
comentario.post("/comentario/crear",crear)
comentario.put("/comentario/actualizar/:id", actualizar)
comentario.delete("/comentario/eliminar/:id", eliminar)

export default comentario;