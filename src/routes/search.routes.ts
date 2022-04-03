import express from 'express';
import { RoutePaths } from '../enums/route-paths.enum';
import searchHandler from '../handlers/search.handler';

const router = express.Router();

// GET countries results from GeoDB
router.get(RoutePaths.Default, searchHandler.getCountriesBySearchText);

export default router;
