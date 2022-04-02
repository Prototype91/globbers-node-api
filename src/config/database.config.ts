import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const db: Sequelize = new Sequelize(
  process.env.DATABASE as string,
  process.env.USERNAME as string,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    dialect: 'mysql',
    port: process.env.PORT as unknown as number,
  }
);

export default db;
