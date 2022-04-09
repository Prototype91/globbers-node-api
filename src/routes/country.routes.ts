import express from 'express';
import { RoutePaths } from '../enums/route-paths.enum';
import countryHandler from '../handlers/country.handler';
import errorHandlerMiddleware from '../middlewares/error-handler.middleware';
import countrySchema from '../schemas/country.schema';
import authJwtMiddleware from '../middlewares/auth-jwt.middleware';

// Country Router
const router = express.Router();

// POST a country
router.post(
  RoutePaths.Default,
  countrySchema.checkCreateCountry(),
  [errorHandlerMiddleware.handleValidationError, authJwtMiddleware.verifyToken],
  countryHandler.create
);

// GET all countries
router.get(
  RoutePaths.Default,
  [errorHandlerMiddleware.handleValidationError, authJwtMiddleware.verifyToken],
  countryHandler.read
);

// GET a country's cities
router.get(
    RoutePaths.CountryCities,
    [errorHandlerMiddleware.handleValidationError, authJwtMiddleware.verifyToken],
    countryHandler.getCities
);

// GET a specific country
router.get(
  RoutePaths.Id,
  countrySchema.checkIdParam(),
  [errorHandlerMiddleware.handleValidationError, authJwtMiddleware.verifyToken],
  countryHandler.readByID
);

// UPDATE a country
router.put(
  RoutePaths.Id,
  countrySchema.checkIdParam(),
  [errorHandlerMiddleware.handleValidationError, authJwtMiddleware.verifyToken],
  countryHandler.update
);

// DELETE a country
router.delete(
  RoutePaths.Id,
  countrySchema.checkIdParam(),
  [errorHandlerMiddleware.handleValidationError, authJwtMiddleware.verifyToken],
  countryHandler.delete
);

export default router;
