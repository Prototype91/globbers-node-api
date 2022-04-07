import { body, param, query, ValidationChain } from 'express-validator';

class CountrySchema {
  public checkCreateCountry(): ValidationChain[] {
    return [
      body('id').optional().isUUID(4).withMessage('The value should be UUID v4'),
      body('name')
        .notEmpty()
        .withMessage('The name value should not be empty')
        .isString()
        .withMessage('The name should be a string'),
      body('userId')
        .notEmpty()
        .withMessage('The country should be linked to a user')
        .isUUID(4)
        .withMessage('The userId should be a uuid'),
      body('continent')
        .notEmpty()
        .withMessage('The continent value should not be empty')
        .isString()
        .withMessage('The continent value should be a string'),
      body('code')
        .notEmpty()
        .withMessage('The code value should not be empty')
        .isString()
        .withMessage('The code value should be a string'),
      body('currencyCode')
        .optional()
        .isJSON()
        .withMessage('The currencyCode value should be a JSON'),
      body('wikiDataId')
        .optional()
        .isString()
        .withMessage('The wikiDataId value should be a string')
    ];
  }

  public checkReadCountry(): ValidationChain[] {
    return [
      query('limit')
        .optional()
        .isInt({ min: 1, max: 10 })
        .withMessage('The limit value should be number and between 1-10'),
      query('offset').optional().isNumeric().withMessage('The value should be number')
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
