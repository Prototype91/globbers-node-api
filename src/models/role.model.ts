import { DataTypes, Model } from 'sequelize';
import db from '../config/database.config';
import { TableNames } from '../enums/table-names.enum';
import { IRole } from '../interfaces/role.interface';

export class Role extends Model<IRole> {}

Role.init(
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
    }
  },
  {
    sequelize: db,
    tableName: TableNames.Roles
  }
);
