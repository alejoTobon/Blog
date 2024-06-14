import { Sequelize } from "sequelize";
import dotenv from "dotenv";

// Cargar variables de entorno desde .env
dotenv.config();

// Configuración de Sequelize
export const ssequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
});

// Probar la conexión
ssequelize.authenticate()
    .then(() => {
        console.log('Conexión exitosa a la base de datos');
    })
    .catch(error => {
        console.error('Error en la conexión a la base de datos:', error);
    });

