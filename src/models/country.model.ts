import { DataTypes, Model } from 'sequelize';
import db from '../config/database.config';
import { ICountry } from '../interfaces/country.interface';

export class Country extends Model<ICountry> {}

Country.init(
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
    userId: {
      type: DataTypes.UUID,
      allowNull: false
    }
  },
  {
    sequelize: db,
    tableName: 'countries'
  }
);
