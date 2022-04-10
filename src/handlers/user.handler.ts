import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { secretKey } from '../constants/secret-key.const';
import { RoutePaths } from '../enums/route-paths.enum';
import { CustomRequest } from '../interfaces/custom-request.interface';
import { Role } from '../models/role.model';
import { User } from '../models/user.model';
import { Roles } from '../enums/roles.enum';

class UserHandler {
  public async Signup(req: Request, res: Response): Promise<void> {
    const id = uuidv4();
    const { name, lastname, username, email } = req.body;
    User.create({
      id,
      name,
      lastname,
      username,
      email,
      password: bcrypt.hashSync(req.body.password, 8)
    })
      .then((user: any) => {
        if (req.body.role) {
          Role.findAll({
            where: {
              name: req.body.role
            }
          })
            .then(roles => {
              user
                .setRoles(roles)
                .then(() => {
                  res.send({ msg: 'User was registered successfully!' });
                })
                .catch((err: any) => res.status(500).send({ msg: err.message }));
            })
            .catch(err => {
              res.status(500).send({ msg: err.message });
            });
        } else {
          Role.findOne({ where: { name: 'user' } }).then(role => {
            user
              .setRoles(role)
              .then(() => {
                res.send({ msg: 'User was registered successfully!' });
              })
              .catch((err: any) => res.status(500).send({ msg: err.message }));
          });
        }
      })
      .catch(err => {
        res.status(500).send({ msg: err.message });
      });
  }

  public async Signin(req: Request, res: Response): Promise<any> {
    User.findOne({
      where: {
        username: req.body.username
      }
    })
      .then((user: any) => {
        if (!user) {
          return res.status(404).send({ msg: 'User Not found.' });
        }
        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            msg: 'Invalid Password!'
          });
        }
        const token = jwt.sign({ id: user.id }, secretKey, {
          expiresIn: 86400 // 24 hours
        });
        const authorities: string[] = [];
        user.getRoles().then((roles: any) => {
          for (const item of roles) {
            authorities.push('ROLE_' + item.name.toUpperCase());
          }
          res.status(200).send({
            id: user.id,
            username: user.username,
            email: user.email,
            roles: authorities,
            accessToken: token
          });
        });
      })
      .catch(err => {
        res.status(500).send({ msg: err.message });
      });
  }

  public async read(_: Request, res: Response): Promise<unknown> {
    try {
      const users = await User.findAll();
      return res.json(users);
    } catch (e) {
      return res.json({
        msg: 'fail to create',
        status: 500,
        route: RoutePaths.Default
      });
    }
  }

  public async update(req: CustomRequest, res: Response): Promise<unknown> {
    try {
      const id = req.userId;
      const user = await User.findOne({ where: { id } });

      if (!user) {
        return res.json({ msg: 'Can not find existing user' });
      }

      const updatedUser = await user.update({ ...req.body });

      return res.json({ user: updatedUser, msg: 'The user has successfully been updated' });
    } catch (e) {
      return res.json({
        msg: 'fail to read',
        status: 500,
        route: RoutePaths.Id
      });
    }
  }

  public async delete(req: CustomRequest, res: Response): Promise<unknown> {
    const userId = req.userId;
    try {
      const { id } = req.params;
      const userToDelete = await User.findByPk(id);

      if (!userToDelete) {
        return res.json({ msg: 'Can not find existing user' });
      }

      if (userId !== id) {
        const user = await User.findByPk(userId);
        const roles = await user?.getRoles();

        for (const item of roles) {
          if (item.name === Roles.Admin) {
            const deletedUser = await userToDelete.destroy();

            return res.json({
              userToDelete: deletedUser,
              msg: 'The user has successfully been deleted'
            });
          }
        }
        return res.status(403).send({
          msg: 'Require Admin Role!'
        });
      } else {
        const deletedUser = await userToDelete.destroy();

        return res.json({
          userToDelete: deletedUser,
          msg: 'The user has successfully been deleted'
        });
      }
    } catch (e) {
      return res.json({
        msg: 'fail to read',
        status: 500,
        route: RoutePaths.Id
      });
    }
  }
}

export default new UserHandler();
