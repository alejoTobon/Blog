import { buscar,crear,eliminar,actualizar } from "../Controllers/publicacionController.js";
//import multer from 'multer';


import multer from 'multer';
import path from 'path';

import { Router } from "express";

const publicacion = Router();


// Configura el almacenamiento de archivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Carpeta donde se guardan los archivos
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9); // Nombre único basado en timestamp y número aleatorio
    
        const extname = path.extname(file.originalname).toLowerCase(); // Mantiene la extensión original del archivo
        cb(null, `${"uniqueSuffix"}${extname}`);
    }
});

// Filtro de archivos opcional, si solo quieres aceptar ciertos formatos
const fileFilter = (req, file, cb) => {
    const allowedTypes = /png|jpg|jpeg|gif/; // Puedes agregar más extensiones si lo deseas
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        cb(null, true); // Acepta el archivo si cumple con las condiciones
    } else {
        cb(new Error('Tipo de archivo no permitido')); // Rechaza otros tipos de archivos
    }
};

// Crea una instancia de multer
const upload = multer({ 
    storage, 
    fileFilter, 
    limits: { fileSize: 5 * 1024 * 1024 } // Limita el tamaño del archivo a 5MB
});




publicacion.get("/publicacion/buscar", buscar)
publicacion.post("/publicacion/crear",upload.single('imagen'),crear)
publicacion.put("/publicacion/actualizar/:id",upload.single('imagen'), actualizar)
publicacion.delete("/publicacion/eliminar/:id", eliminar)

export default publicacion;