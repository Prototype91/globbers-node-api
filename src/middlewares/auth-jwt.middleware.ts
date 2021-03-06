import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { secretKey } from '../constants/secret-key.const';
import { Roles } from '../enums/roles.enum';
import { User } from '../models/user.model';

class AuthJwtMiddleware {
  public verifyToken = (req: any, res: Response, next: NextFunction) => {
    const token = req.headers['x-access-token'] as string;

    if (!token) {
      return res.status(403).send({
        message: 'No token provided!'
      });
    }

    jwt.verify(token, secretKey, (err, decoded: any) => {
      if (err) {
        return res.status(401).send({
          message: 'Unauthorized!'
        });
      }
      req.userId = decoded.id;

      next();
    });
  };

  public isAdmin = (req: any, res: Response, next: NextFunction) => {
    const token = req.headers['x-access-token'] as string;

    if (!token) {
      return res.status(403).send({
        message: 'No token provided!'
      });
    }

    jwt.verify(token, secretKey, (err, decoded: any) => {
      if (err) {
        return res.status(401).send({
          message: 'Unauthorized!'
        });
      }

      User.findByPk(decoded.id)
        .then((user: any) => {
          user.getRoles().then((roles: any) => {
            for (const item of roles) {
              if (item.name === Roles.Admin) {
                next();
                return;
              }
            }
            res.status(403).send({
              message: 'Require Admin Role!'
            });
            return;
          });
        })
        .catch(error => console.log(error));
    });
  };
}

export default new AuthJwtMiddleware();
