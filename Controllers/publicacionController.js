import { Publicacion } from "../Models/publicacion.js";
import { Usuario } from "../Models/usuario.js";

export const buscar = async (req, res) => {
  const publicaciones = await Publicacion.findAll();
  res.send({ publicaciones });
};

export const crear = async (req, res) => {
  try {
    const { titulo,contenido, fechaPublicacion, usuarioId } = req.body;

  console.log(usuarioId)
    const usuario = await Usuario.findByPk(usuarioId);
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    const imagen = req.file ? req.file.filename : null;
   
    const nuevaPublicacion = await Publicacion.create({
      titulo,
      imagen,
      contenido,
      fechaPublicacion,
      UsuarioId: 1
    });

    res.status(201).json({ nuevaPublicacion });
  } catch (error) {
    console.error('Error al crear la publicación:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

export const actualizar = async (req, res) => {
  try {
    const { titulo, contenido, fechaPublicacion, usuarioId } = req.body;
    const publicacionId = req.params.id;

 
    const publicacion = await Publicacion.findByPk(publicacionId);
    if (!publicacion) {
      return res.status(404).json({ mensaje: 'Publicación no encontrada' });
    }


    const usuario = await Usuario.findByPk(usuarioId);
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    const imagen = req.file ? req.file.filename : null;

    publicacion.titulo = titulo;
    publicacion.imagen = imagen;
    publicacion.contenido = contenido;
    publicacion.fechaPublicacion = fechaPublicacion;
    publicacion.UsuarioId = usuarioId;


    await publicacion.save();

    res.status(200).json({ mensaje: 'Publicación actualizada con éxito' });
  } catch (error) {
    console.error('Error al actualizar la publicación:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

export const eliminar = async (req, res) => {
  const publicaciones = await Publicacion.findByPk(req.params.id);
  if (publicaciones) {
    await publicaciones.destroy();
    res.send("eliminado !");
  } else {
    res.status(400).send("no existe el id");
  }
};