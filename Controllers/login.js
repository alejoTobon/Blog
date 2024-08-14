import md5 from "md5"

import { Usuario } from "../Models/usuario.js";

import jwt from 'jsonwebtoken';


export const ingreso = async (req, res) => {
  try {
    const { email, contrasena, identificacion } = req.body;

    console.log(email);
    const usuario = await Usuario.findOne({ where: { email:email } });
  
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Correo electrónico o contraseña incorrectos' });
    }

    
    const hashedPassword = md5(contrasena);

    
    if (hashedPassword !== usuario.contrasena) {
      return res.status(401).json({ mensaje: 'Correo electrónico o contraseña incorrectos' });
    }


    const token = jwt.sign({ usuarioId: usuario.id }, 'secreto', { expiresIn: '1h' });

    res.status(200).json({ token, 

      usuarioId: usuario.id,
      nombre: usuario.nombre,
      foto: usuario.foto

    });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};
