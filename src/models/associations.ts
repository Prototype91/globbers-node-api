import { User } from './user.model';
import { Role } from './role.model';
import { Country } from './country.model';
import { TableNames } from '../enums/table-names.enum';

export class Associations {
  public static associate(): void {
    User.hasMany(Country, {
      sourceKey: 'id',
      foreignKey: 'userId',
      as: 'countries'
    });

    User.belongsToMany(Role, {
      through: TableNames.UserRole
    });

    Role.belongsToMany(User, {
      through: TableNames.UserRole
    });
  }
}
