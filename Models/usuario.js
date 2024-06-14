
import { Sequelize, DataTypes } from "sequelize";

import { ssequelize } from "../db.js";

import { Rol } from "./rol.js";


export const Usuario = ssequelize.define('Usuario', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  foto:{

type: DataTypes.STRING,
allowNull: false



  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  contrasena: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: false
});


Rol.hasOne(Usuario, { });
Usuario.belongsTo(Rol,  {
  foreignKey: {
    allowNull: false,
  } });

