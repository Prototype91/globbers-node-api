import app from './app';
import db from './config/database.config';
import { localPort } from './constants/port.const';
import { Associations } from './models/associations';
import mysql from 'mysql2';

const start = async () => {
  const port = process.env.PORT || localPort;

  app.listen(port, () => {
    console.log(`Server is running on port ${port} !`);
  });

  const connection = await mysql.createConnection({
    host: process.env.MYSQL_HOST as string,
    port: process.env.MYSQL_PORT as unknown as number,
    user: process.env.MYSQL_USERNAME as string,
    password: process.env.MYSQL_PASSWORD as string
  });

  connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.MYSQL_DATABASE}\`;`);

  db.sync()
    .then(() => {
      Associations.associate();
      console.log('Database synchronized !.');
    })
    .catch(e => console.log('An error occured : ', e));
};

start();
