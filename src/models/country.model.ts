import { DataTypes, Model } from 'sequelize';
import db from '../config/database.config';
import { Country } from '../interfaces/country.interface';

export class CountryModel extends Model<Country> {}

CountryModel.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    visited: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize: db,
    tableName: 'countries',
  }
);
