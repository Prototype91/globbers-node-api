import { DataTypes, Model } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import db from '../config/database.config';
import { IRole } from '../interfaces/role.interface';
import { Roles } from '../enums/roles.enum';
import { TableNames } from '../enums/table-names.enum';

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
const getRoles = async (): Promise<unknown[]> => {
  return await Role.findAll();
};

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
