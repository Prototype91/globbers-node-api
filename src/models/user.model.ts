import { DataTypes, Model } from 'sequelize';
import db from '../config/database.config';
import { TableNames } from '../enums/table-names.enum';
import { IUser } from '../interfaces/user.interface';

export class User extends Model<IUser> {
  // fix typescript error of setRoles method
  [x: string]: any;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  },
  {
    sequelize: db,
    tableName: TableNames.Users
  }
);
