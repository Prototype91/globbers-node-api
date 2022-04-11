import { Sequelize } from 'sequelize';
import dotenv, { DotenvSafeOptions } from 'dotenv-safe';

dotenv.config({ silent: false } as DotenvSafeOptions);

const db: Sequelize = new Sequelize(
  process.env.MYSQL_DATABASE as string,
  process.env.MYSQL_USERNAME as string,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
    port: process.env.MYSQL_PORT as unknown as number
  }
);

export default db;
