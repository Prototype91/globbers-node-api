import express from 'express';
import { RoutePaths } from '../enums/route-paths.enum';
import searchHandler from '../handlers/search.handler';
import errorHandlerMiddleware from '../middlewares/error-handler.middleware';

// Search Router
const router = express.Router();

// GET countries results from GeoDB
router.get(
  RoutePaths.Country,
  errorHandlerMiddleware.handleValidationError,
  searchHandler.getCountriesBySearchText
);

// GET cities results from GeoDB
router.get(
  RoutePaths.City,
  errorHandlerMiddleware.handleValidationError,
  searchHandler.getCitiesBySearchText
);

export default router;
