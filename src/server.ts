import mysql from 'mysql2';
import { v4 as uuidv4 } from 'uuid';
import app from './app';
import db from './config/database.config';
import { localPort } from './constants/port.const';
import { Roles } from './enums/roles.enum';
import { Associations } from './models/associations';
import { Role } from './models/role.model';

const getRoles = async (): Promise<unknown[]> => {
  return await Role.findAll();
};

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

  db.sync({ force: true })
    .then(() => {
      getRoles()
        .then(res => {
          if (!res?.length) {
            Role.create({
              id: uuidv4(),
              name: Roles.User
            });

            Role.create({
              id: uuidv4(),
              name: Roles.Admin
            });
          }
        })
        .catch(e => {
          console.error(e);
        });
      console.log('Database synchronized !.');
    })
    .catch(e => console.log('An error occured : ', e));
};

Associations.associate();

start();
