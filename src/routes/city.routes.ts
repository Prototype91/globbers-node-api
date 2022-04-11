import express from 'express';
import { RoutePaths } from '../enums/route-paths.enum';
import cityHandler from '../handlers/city.handler';
import errorHandlerMiddleware from '../middlewares/error-handler.middleware';
import citySchema from '..//schemas/city.schema';
import authJwtMiddleware from '../middlewares/auth-jwt.middleware';

// City Router
const router = express.Router();

// POST a City
router.post(
  RoutePaths.Default,
  citySchema.checkCreateCity(),
  [errorHandlerMiddleware.handleValidationError, authJwtMiddleware.verifyToken],
  cityHandler.create
);

// GET all Cities
router.get(
  RoutePaths.Default,
  [errorHandlerMiddleware.handleValidationError, authJwtMiddleware.verifyToken],
  cityHandler.read
);

// GET a specific City
router.get(
  RoutePaths.Id,
  citySchema.checkIdParam(),
  [errorHandlerMiddleware.handleValidationError, authJwtMiddleware.verifyToken],
  cityHandler.readByID
);

// UPDATE a City
router.put(
  RoutePaths.Id,
  citySchema.checkIdParam(),
  [errorHandlerMiddleware.handleValidationError, authJwtMiddleware.verifyToken],
  cityHandler.update
);

// DELETE a City
router.delete(
  RoutePaths.Id,
  citySchema.checkIdParam(),
  [errorHandlerMiddleware.handleValidationError, authJwtMiddleware.verifyToken],
  cityHandler.delete
);

export default router;
