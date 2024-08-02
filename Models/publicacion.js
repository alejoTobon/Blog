

import { DataTypes } from 'sequelize';

import { ssequelize } from '../db.js';



import { Usuario } from './usuario.js';

//departamento nombre descripcion, estado

export const Publicacion = ssequelize.define('publicacion', {
    titulo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    imagen: {

    type: DataTypes.STRING,
    allowNull : false
        },
    contenido: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    fechaPublicacion: {
      type: DataTypes.DATE,
      allowNull: false
    }
  });

  Usuario.hasMany(Publicacion, { });
Publicacion.belongsTo(Usuario,  {
  foreignKey: {
    allowNull: false,
  } });

