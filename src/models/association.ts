import {User} from "./user.model";
import {Role} from "./role.model";
import {Country} from "./country.model";

export class Associations {
    public static associate(): void {
        User.hasMany(Country, {
            sourceKey: 'id',
            foreignKey: 'userId',
            as: 'countries',
        });

        User.belongsToMany(Role, {
            through: 'user_roles',
            foreignKey: 'userId',
            otherKey: 'roleId',
        });

        Role.belongsToMany(User, {
            through: 'user_roles',
            foreignKey: 'roleId',
            otherKey: 'userId',
        });
    }
}