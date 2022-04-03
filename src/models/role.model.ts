import { DataTypes, Model } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import db from '../config/database.config';
import { IRole } from '../interfaces/role.interface';
import { User } from './user.model';

export class Role extends Model<IRole> {}

Role.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: 'role',
  }
);

Role.belongsToMany(User, {
  through: 'user_roles',
  foreignKey: 'roleId',
  otherKey: 'userId',
});

Role.create({
  id: uuidv4(),
  name: 'user',
});

Role.create({
  id: uuidv4(),
  name: 'admin',
});
