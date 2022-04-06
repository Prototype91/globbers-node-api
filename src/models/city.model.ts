import { DataTypes, Model } from 'sequelize';
import db from '../config/database.config';
import { TableNames } from '../enums/table-names.enum';
import { ICity } from '../interfaces/city.interface';

export class City extends Model<ICity> {}

City.init(
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
    countryCode: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    longitude: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    latitude: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    population: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    region: {
      type: DataTypes.STRING,
      allowNull: false
    },
    regionCode: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    wikiDataId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    countryName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize: db,
    tableName: TableNames.Cities
  }
);
