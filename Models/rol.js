import { Sequelize, DataTypes } from "sequelize";

import { ssequelize } from "../db.js";

//departamento nombre descripcion, estado

export const Rol = ssequelize.define('Rol', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: false
});



