import {DataTypes, Model} from 'sequelize';
import db from '../config/database.config';
import {User} from '../interfaces/user.interface';
import {CountryModel} from "./country.model";

export class UserModel extends Model<User> {
}

UserModel.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    },
    {
        sequelize: db,
        tableName: 'users',
    }
);

UserModel.hasMany(CountryModel, {
    sourceKey: 'id',
    foreignKey: 'userId',
    as: 'countries'
});
