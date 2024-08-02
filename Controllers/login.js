import {md5} from "md5"

const Usuario = require('./models/usuario');

export const ingreso = async (req, res) => {
  try {
    const { email, contrasena } = req.body;

   
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Correo electrónico o contraseña incorrectos' });
    }

    const hashedPassword = md5(contrasena);

    
    if (hashedPassword !== usuario.contrasena) {
      return res.status(401).json({ mensaje: 'Correo electrónico o contraseña incorrectos' });
    }


    const token = jwt.sign({ usuarioId: usuario.id }, 'secreto', { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};
