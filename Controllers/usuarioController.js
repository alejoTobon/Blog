import md5 from 'md5';
import { Usuario } from '../Models/usuario.js';
import { Rol } from '../Models/rol.js';

export const buscar = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.send({ usuarios });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error interno del servidor', error: error.message });
  }
};

export const crear = async (req, res) => {
  try {
    const { nombre, email, contrasena, RolId } = req.body;
    const foto = req.file ? req.file.filename : null;

    // Encriptar la contraseña con MD5
    const hashedPassword = md5(contrasena);

    // Crear el usuario
    const nuevoUsuario = await Usuario.create({
      nombre,
      foto,
      email,
      contrasena: hashedPassword,
      RolId
    });

    res.status(201).json({ nuevoUsuario });
  } catch (error) {
    console.error('Error al crear el usuario:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor', error: error.message });
  }
};

export const actualizar = async (req, res) => {
  try {
    const { nombre, email, contrasena, RolId } = req.body;
    const usuarioId = req.params.id;
    const foto = req.file ? req.file.filename : null;

    // Encriptar la contraseña con MD5 si se proporciona
    let hashedPassword = contrasena;
    if (contrasena) {
      hashedPassword = md5(contrasena);
    }

    const usuario = await Usuario.findByPk(usuarioId);
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    const rol = await Rol.findByPk(RolId);
    if (!rol) {
      return res.status(404).json({ mensaje: 'Rol no encontrado' });
    }

    usuario.nombre = nombre;
    usuario.foto = foto;
    usuario.email = email;
    usuario.contrasena = hashedPassword;
    usuario.RolId = RolId;

    await usuario.save();

    res.status(200).json({ mensaje: 'Usuario actualizado con éxito' });
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

export const eliminar = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (usuario) {
      await usuario.destroy();
      res.send("Usuario eliminado");
    } else {
      res.status(404).send("Usuario no encontrado");
    }
  } catch (error) {
    console.error('Error al eliminar el usuario:', error);
    res.status(500).send("Error interno del servidor");
  }
};
