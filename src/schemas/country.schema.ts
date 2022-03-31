import { body, param, query, ValidationChain } from 'express-validator';

class CountrySchema {
  public checkCreateCountry(): ValidationChain[] {
    return [
      body('id')
        .optional()
        .isUUID(4)
        .withMessage('The value should be UUID v4'),
      body('name')
        .notEmpty()
        .withMessage('The name value should not be empty'),
      body('visited')
        .optional()
        .isBoolean()
        .withMessage('The value should be boolean')
        .isIn([true, false])
        .withMessage('The value should be true or false'),
    ];
  }
  public checkReadCountry(): ValidationChain[] {
    return [
      query('limit')
        .optional()
        .isInt({ min: 1, max: 10 })
        .withMessage('The limit value should be number and between 1-10'),
      query('offset')
        .optional()
        .isNumeric()
        .withMessage('The value should be number'),
    ];
  }
  public checkIdParam(): ValidationChain[] {
    return [
      param('id')
        .notEmpty()
        .withMessage('The value should be not empty')
        .isUUID(4)
        .withMessage('The value should be uuid v4'),
    ];
  }
}

export default new CountrySchema();
