import { body, param, query, ValidationChain } from 'express-validator';

class CitySchema {
  public checkCreateCity(): ValidationChain[] {
    return [
      body('id').optional().isUUID(4).withMessage('The value should be UUID v4'),
      body('name').notEmpty().withMessage('The name value should not be empty'),
      body('userId').notEmpty().withMessage('The City should be linked to a user')
    ];
  }

  public checkReadCity(): ValidationChain[] {
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

export default new CitySchema();
