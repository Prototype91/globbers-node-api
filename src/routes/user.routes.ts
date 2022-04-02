import express from 'express';
import { RoutePaths } from '../enums/route-paths.enum';
import userHandler from '../handlers/user.handler';
import errorHandlerMiddleware from '../middleware/error-handler.middleware';
import userSchema from '../schemas/user.schema';

const router = express.Router();

// POST a user
router.post(
    RoutePaths.Default,
    userSchema.checkCreateUser(),
    errorHandlerMiddleware.handleValidationError,
    userHandler.create
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
    errorHandlerMiddleware.handleValidationError,
    userHandler.delete
);

export default router;
