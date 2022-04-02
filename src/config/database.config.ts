import {Sequelize} from 'sequelize';

const db: Sequelize = new Sequelize('globbers-express-api', 'root', 'root', {
    host: '127.0.0.1',
    dialect: "mysql",
    port: 8889,
});

export default db;
