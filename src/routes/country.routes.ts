import express from 'express';
import { RoutePaths } from '../enums/route-paths.enum';
import countryHandler from '../handlers/country.handler';
import errorHandlerMiddleware from '../middlewares/error-handler.middleware';
import countrySchema from '../schemas/country.schema';

const router = express.Router();

// POST a country
router.post(
  RoutePaths.Default,
  countrySchema.checkCreateCountry(),
  errorHandlerMiddleware.handleValidationError,
  countryHandler.create
);

// GET all countries
router.get(
  RoutePaths.Default,
  countrySchema.checkReadCountry(),
  errorHandlerMiddleware.handleValidationError,
  countryHandler.read
);

// GET a specific country
router.get(
  RoutePaths.Id,
  countrySchema.checkIdParam(),
  errorHandlerMiddleware.handleValidationError,
  countryHandler.readByID
);

// UPDATE a country
router.put(
  RoutePaths.Id,
  countrySchema.checkIdParam(),
  errorHandlerMiddleware.handleValidationError,
  countryHandler.update
);

// DELETE a country
router.delete(
  RoutePaths.Id,
  countrySchema.checkIdParam(),
  errorHandlerMiddleware.handleValidationError,
  countryHandler.delete
);

export default router;
