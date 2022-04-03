import { NextFunction, Request, Response } from 'express';
import { roles } from '../constants/roles.const';

class VerifySignUpMiddleware {
  public checkRolesExisted = (req: Request, res: Response, next: NextFunction): void => {
    if (req.body.roles) {
      for (let i = 0; i < req.body.roles.length; i++) {
        if (!roles.includes(req.body.roles[i])) {
          res.status(400).send({
            message: 'Failed! Role does not exist = ' + req.body.roles[i]
          });
          return;
        }
      }
    }
    next();
  };
}

export default new VerifySignUpMiddleware();
