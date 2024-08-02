import { Sequelize, DataTypes } from "sequelize";

import { ssequelize } from "../db.js";

import { Publicacion } from "./publicacion.js";

import { Usuario } from "./usuario.js";
//departamento nombre descripcion, estado

export const Comentario = ssequelize.define('comentario', {
  contenido: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  fechaPublicacion: {
    type: DataTypes.DATE,
    allowNull: false
  }
});

Publicacion.hasMany(Comentario, {});
Comentario.belongsTo(Publicacion,  {
  foreignKey: {
    allowNull: false,
  }});

Usuario.hasMany(Comentario, {});
Comentario.belongsTo(Usuario,  {
  foreignKey: {
    allowNull: false,
  }} );


