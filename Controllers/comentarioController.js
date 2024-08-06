import { Comentario } from "../Models/comentario.js";
import { Publicacion } from "../Models/publicacion.js";
import { Usuario } from "../Models/usuario.js";

export const buscar = async (req, res) => {
  const comentario = await Comentario.findAll();
  res.send({ comentario });
};

export const crear= async (req, res) => {
  try {
    const { contenido, fechaPublicacion, usuarioId, publicacionId } = req.body;

    
    const usuario = await Usuario.findByPk(usuarioId);
    const publicacion = await Publicacion.findByPk(publicacionId);
    if (!usuario || !publicacion) {
      return res.status(404).json({ mensaje: 'Usuario o Publicación no encontrado' });
    }

    const nuevoComentario = await Comentario.create({
      contenido,
      fechaPublicacion,
      usuarioId,
      publicacionId
    });

    res.status(201).json({ nuevoComentario });
  } catch (error) {
    console.error('Error al crear el comentario:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};



export const actualizar = async (req, res) => {
  try {
    const { id, contenido, fechaPublicacion, usuarioId, publicacionId } = req.body;

    
    const comentario = await Comentario.findByPk(id);
    if (!comentario) {
      return res.status(404).json({ mensaje: 'Comentario no encontrado' });
    }

    
    const usuario = await Usuario.findByPk(usuarioId);
    const publicacion = await Publicacion.findByPk(publicacionId);
    if (!usuario || !publicacion) {
      return res.status(404).json({ mensaje: 'Usuario o Publicación no encontrado' });
    }

  
    await comentario.update({
      contenido,
      fechaPublicacion,
      UsuarioId: usuarioId,
      PublicacionId: publicacionId
    });

    res.status(200).json({ mensaje: 'Comentario actualizado con éxito' });
  } catch (error) {
    console.error('Error al actualizar el comentario:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};






export const eliminar = async (req, res) => {
  const comentario = await Comentario.findByPk(req.params.id);
  if (comentario) {
    await comentario.destroy();
    res.send("eliminado !");
  } else {
    res.status(400).send("no existe el id");
  }
};