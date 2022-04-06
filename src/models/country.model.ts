import { DataTypes, Model } from 'sequelize';
import db from '../config/database.config';
import { TableNames } from '../enums/table-names.enum';
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
    },
    continent: {
      type: DataTypes.STRING,
      allowNull: false
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    currencyCode: {
      type: DataTypes.JSON,
      allowNull: true
    },
    wikiDataId: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    sequelize: db,
    tableName: TableNames.Countries
  }
);
