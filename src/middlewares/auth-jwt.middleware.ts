import jwt from 'jsonwebtoken';
import { secretKey } from '../constants/secret-key.const';
import { NextFunction, Request, Response } from 'express';
import request from 'superagent';
import { User } from '../models/user.model';

class AuthJwtMiddleware {
  public verifyToken = (req: any, res: Response, next: NextFunction) => {
    let token = req.headers["x-access-token"] as string;

    if (!token) {
      return res.status(403).send({
        message: 'No token provided!',
      });
    }

    jwt.verify(token, secretKey, (err, decoded: any) => {
      if (err) {
        return res.status(401).send({
          message: 'Unauthorized!',
        });
      }
      
      req.userId = decoded.id;

      next();
    });
  };

  public isAdmin = (req: any, res: Response, next: NextFunction) => {
    User.findByPk(req.userId).then((user: any) => {
      user.getRoles().then((roles: any) => {
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "admin") {
            next();
            return;
          }
        }
        res.status(403).send({
          message: "Require Admin Role!"
        });
        return;
      });
    });
  };
}

export default new AuthJwtMiddleware();
