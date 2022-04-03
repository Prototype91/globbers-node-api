import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

class ErrorMiddleware {
  public handleValidationError(req: Request, res: Response, next: NextFunction): unknown {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.json(error.array()[0]);
    }
    next();
  }
}

export default new ErrorMiddleware();
