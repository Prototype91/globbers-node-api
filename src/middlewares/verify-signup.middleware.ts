import { NextFunction, Request, Response } from 'express';
import { roles } from '../constants/roles.const';

class VerifySignUpMiddleware {
  public checkRolesExisted = (req: Request, res: Response, next: NextFunction): void => {
    if (req.body.role) {
      if (!roles.includes(req.body.role)) {
        res.status(400).send({
          message: 'Failed! Role does not exist => ' + req.body.role
        });
        return;
      }
    }
    next();
  };
}

export default new VerifySignUpMiddleware();
