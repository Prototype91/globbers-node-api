import express from 'express';
import { RoutePaths } from '../enums/route-paths.enum';
import userHandler from '../handlers/user.handler';
import errorHandlerMiddleware from '../middlewares/error-handler.middleware';
import userSchema from '../schemas/user.schema';
import verifySignupMiddleware from '../middlewares/verify-signup.middleware';
import authJwtMiddleware from '../middlewares/auth-jwt.middleware';

// User Router
const router = express.Router();

// Signup a user
router.post(
  RoutePaths.AuthSignup,
  userSchema.checkCreateUser(),
  [errorHandlerMiddleware.handleValidationError, verifySignupMiddleware.checkRolesExisted],
  userHandler.Signup
);

// Signin a user
router.post(
  RoutePaths.AuthSignin,
  errorHandlerMiddleware.handleValidationError,
  userHandler.Signin
);

// GET user's countries
router.get(
  RoutePaths.UserCountries,
  userSchema.checkIdParam(),
  errorHandlerMiddleware.handleValidationError,
  userHandler.getUserCountries
);

// UPDATE a user
router.put(
  RoutePaths.Id,
  userSchema.checkIdParam(),
  errorHandlerMiddleware.handleValidationError,
  userHandler.update
);

// DELETE a user
router.delete(
  RoutePaths.Id,
  userSchema.checkIdParam(),
  [errorHandlerMiddleware.handleValidationError, authJwtMiddleware.isAdmin],
  userHandler.delete
);

export default router;
