import { body, param, ValidationChain } from 'express-validator';
import schemaErrorHelper from '../services/helpers/schema-error.helper';

class CountrySchema {
  public checkCreateCountry(): ValidationChain[] | any {
    return [
      body('id').optional().isUUID(4).withMessage('The value should be UUID v4'),
      body('name')
        .notEmpty()
        .withMessage('The name value should not be empty')
        .isString()
        .withMessage('The name should be a string'),
      body('continent')
        .notEmpty()
        .withMessage('The continent value should not be empty')
        .isString()
        .withMessage('The continent value should be a string'),
      body('code')
        .notEmpty()
        .withMessage('The code value should not be empty')
        .isString()
        .withMessage('The code value should be a string')
        .isLength({ min: 2, max: 2 })
        .withMessage('The code value should have a length of 2 letters'),
      body('currencyCode')
        .optional()
        .isJSON()
        .withMessage('The currencyCode value should be a JSON'),
      body('wikiDataId')
        .optional()
        .isString()
        .withMessage('The wikiDataId value should be a string'),
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

export default new CountrySchema();
