import { Sequelize } from 'sequelize';
import mysql2 from 'mysql2'; 
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    dialectModule: mysql2, 
    port: 3306,
    logging: false,
  }
);

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log('MySQL Connected with Sequelize (Vercel Fix applied)');
  } catch (error) {
    console.error('Sequelize Connection Error:', error);
  }
};

export default sequelize;