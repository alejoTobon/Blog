import express from 'express';
import { crear, actualizar, eliminar, buscar } from '../Controllers/usuarioController.js';

const router = express.Router();

router.post('/usuario/crear', crear);
router.put('/usuario/actualizar/:id', actualizar);
router.delete('/usuario/eliminar/:id', eliminar);
router.get('/usuarios', buscar);

export default router;
