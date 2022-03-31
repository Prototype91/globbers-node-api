import express from 'express';
import countryHandler from '../handlers/country.handler';
import errorHandlerMiddleware from '../middleware/error-handler.middleware';
import countrySchema from '../schemas/country.schema';

const router = express.Router();

// POST a country
router.post(
  '/',
  countrySchema.checkCreateCountry(),
  errorHandlerMiddleware.handleValidationError,
  countryHandler.create
);

// GET all countries
router.get(
  '/',
  countrySchema.checkReadCountry(),
  errorHandlerMiddleware.handleValidationError,
  countryHandler.read
);

// GET a specific country
router.get(
  '/:id',
  countrySchema.checkIdParam(),
  errorHandlerMiddleware.handleValidationError,
  countryHandler.readByID
);

// UPDATE a country
router.put(
  '/:id',
  countrySchema.checkIdParam(),
  errorHandlerMiddleware.handleValidationError,
  countryHandler.update
);

// DELETE a country
router.delete(
  '/:id',
  countrySchema.checkIdParam(),
  errorHandlerMiddleware.handleValidationError,
  countryHandler.delete
);

export default router;
