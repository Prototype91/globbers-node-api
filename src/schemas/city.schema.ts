import { body, param, ValidationChain } from 'express-validator';
import schemaErrorHelper from "../services/helpers/schema-error.helper";

class CitySchema {
  public checkCreateCity(): ValidationChain[] | any {
    return [
      body('id').optional().isUUID(4).withMessage('The value should be UUID v4'),
      body('city')
        .notEmpty()
        .withMessage('The city value should not be empty')
        .isString()
        .withMessage('The city should be a string'),
      body('name')
        .notEmpty()
        .withMessage('The name value should not be empty')
        .isString()
        .withMessage('The name should be a string'),
      body('countryName')
        .notEmpty()
        .withMessage('The countryName value should not be empty')
        .isString()
        .withMessage('The countryName should be a string'),
      body('countryCode')
        .notEmpty()
        .withMessage('The countryCode value should not be empty')
        .isString()
        .withMessage('The countryCode should be a string')
        .isLength({ min: 2, max: 2 })
        .withMessage('The countryCode value should have a length of 2 letters'),
      body('latitude').notEmpty().withMessage('The latitude value should not be empty'),
      body('longitude').notEmpty().withMessage('The latitude value should not be empty'),
      body('region')
        .notEmpty()
        .withMessage('The region value should not be empty')
        .isString()
        .withMessage('The region should be a string'),
      body('regionCode')
        .notEmpty()
        .withMessage('The regionCode value should not be empty')
        .isString()
        .withMessage('The regionCode should be a string'),
      body('population')
        .notEmpty()
        .withMessage('The population value should not be empty')
        .isInt()
        .withMessage('The population should be an int'),
      body('type')
        .notEmpty()
        .withMessage('The type value should not be empty')
        .isString()
        .withMessage('The type should be a string'),
      body('wikiDataId')
        .notEmpty()
        .withMessage('The wikiDataId value should not be empty')
        .isString()
        .withMessage('The wikiDataId should be a string'),
        schemaErrorHelper
    ];
  }

  public checkIdParam(): ValidationChain[] {
    return [
      param('id')
        .notEmpty()
        .withMessage('The value should be not empty')
        .isUUID(4)
        .withMessage('The value should be uuid v4')
    ];
  }
}

export default new CitySchema();
