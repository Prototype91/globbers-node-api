import { body, param, ValidationChain } from 'express-validator';
import { User } from '../models/user.model';
import schemaErrorHelper from '../services/helpers/schema-error.helper';

class UserSchema {
  public checkCreateUser(): ValidationChain[] | any {
    return [
      body('id').optional().isUUID(4).withMessage('The value should be UUID v4'),
      body('name').notEmpty().withMessage('The name value should not be empty'),
      body('lastname').notEmpty().withMessage('The lastname value should not be empty'),
      body('username')
        .notEmpty()
        .withMessage('The username value should not be empty')
        .isLength({ min: 3 })
        .withMessage('The username should have at least 3 characters')
        .custom(async value => {
          if (value) {
            const existingUser = await User.findOne({ where: { username: value } });
            if (existingUser) {
              return Promise.reject('Username already taken');
            }
          }
        }),
      body('password')
        .notEmpty()
        .withMessage('The password value should not be empty')
        .isLength({ min: 5 })
        .withMessage('The password should have at least 5 characters'),
      body('email')
        .notEmpty()
        .withMessage('The email value should not be empty')
        .isEmail()
        .withMessage('The email should be valid')
        .custom(async value => {
          if (value) {
            const existingUser = await User.findOne({ where: { email: value } });

            if (existingUser) {
              return Promise.reject('Email already taken');
            }
          }
        }),
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

export default new UserSchema();
