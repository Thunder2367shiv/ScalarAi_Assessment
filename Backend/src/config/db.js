import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false, // Set to console.log to see SQL queries
  }
);

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    // sync({ alter: true }) updates your tables to match your models
    await sequelize.sync({ alter: true }); 
    console.log('MySQL Connected successfully with Sequelize');
  } catch (error) {
    console.error('Sequelize Connection Error:', error);
    process.exit(1);
  }
};

export default sequelize;