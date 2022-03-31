import { Sequelize } from 'sequelize';

const db: Sequelize = new Sequelize('Globbers-Express-Api', 'root', '', {
  storage: './database.sqlite',
  dialect: 'sqlite',
  logging: false,
});

export default db;
