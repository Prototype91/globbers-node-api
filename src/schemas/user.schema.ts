import { body, param, ValidationChain } from 'express-validator';
import { User } from '../models/user.model';

class UserSchema {
  public checkCreateUser(): ValidationChain[] {
    return [
      body('id').optional().isUUID(4).withMessage('The value should be UUID v4'),
      body('name').notEmpty().withMessage('The name value should not be empty'),
      body('lastname').notEmpty().withMessage('The lastname value should not be empty'),
      body('username')
        .notEmpty()
        .withMessage('The username value should not be empty')
        .custom(async value => {
          const existingUser = await User.findOne({ where: { username: value } });
          if (existingUser) {
            return Promise.reject('Username already taken');
          }
        }),
      body('password').notEmpty().withMessage('The password value should not be empty'),
      body('email')
        .notEmpty()
        .withMessage('The email value should not be empty')
        .custom(async value => {
          const existingUser = await User.findOne({ where: { email: value } });

          if (existingUser) {
            return Promise.reject('Email already taken');
          }
        })
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
