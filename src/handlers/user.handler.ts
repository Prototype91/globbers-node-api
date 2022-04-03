import {Request, Response} from 'express';
import {v4 as uuidv4} from 'uuid';
import {RoutePaths} from '../enums/route-paths.enum';
import {User} from '../models/user.model';
import {Role} from "../models/role.model";
import {Op} from "sequelize";
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';
import {secretKey} from "../constants/secret-key.const";

class UserHandler {
  public async Signup(req: Request, res: Response): Promise<any> {
    const id = uuidv4();
    User.create({...req.body, id, password: bcrypt.hashSync(req.body.password, 8)})
        .then((user: any) => {
          if (req.body.roles) {
            Role.findAll({
              where: {
                name: {
                  [Op.or]: req.body.roles
                }
              }
            }).then(roles => {
              user.setRoles(roles).then(() => {
                res.send({msg: "User was registered successfully!"});
              }).catch((err: any) => res.status(500).send({msg: err.message}));
            }).catch(err => {
              res.status(500).send({msg: err.message});
            });
          } else {
            // user role = 1
            user.setRoles([1]).then(() => {
              res.send({msg: "User was registered successfully!"});
            })
                .catch((err: any) => res.status(500).send({msg: err.message}));
          }
        })
        .catch(err => {
          res.status(500).send({msg: err.message});
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
            return res.status(404).send({msg: "User Not found."});
          }
          const passwordIsValid = bcrypt.compareSync(
              req.body.password,
              user.password
          );
          if (!passwordIsValid) {
            return res.status(401).send({
              accessToken: null,
              msg: "Invalid Password!"
            });
          }
          const token = jwt.sign({id: user.id}, secretKey, {
            expiresIn: 86400 // 24 hours
          });
          const authorities: string[] = [];
          user.getRoles().then((roles: any) => {
            for (const item of roles) {
              authorities.push("ROLE_" + item.name.toUpperCase());
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
          res.status(500).send({msg: err.message});
        });
  }

  public async getUserCountries(req: Request, res: Response): Promise<unknown> {
    try {
      const {id} = req.params;
      const user = (await User.findOne({
        where: {id},
        include: User.associations.countries,
      })) as any;
      return res.json(user.countries);
    } catch (e) {
      return res.json({
        msg: 'fail to read',
        status: 500,
        route: RoutePaths.Id,
      });
    }
  }

  public async update(req: Request, res: Response): Promise<unknown> {
    try {
      const { id } = req.params;
      const user = await User.findOne({ where: { id } });

      if (!user) {
        return res.json({ msg: 'Can not find existing user' });
      }

      const updatedUser = await user.update({ ...req.body });

      return res.json({ user: updatedUser });
    } catch (e) {
      return res.json({
        msg: 'fail to read',
        status: 500,
        route: RoutePaths.Id,
      });
    }
  }

  public async delete(req: Request, res: Response): Promise<unknown> {
    try {
      const { id } = req.params;
      const user = await User.findOne({ where: { id } });

      if (!user) {
        return res.json({ msg: 'Can not find existing user' });
      }

      const deletedUser = await user.destroy();

      return res.json({ user: deletedUser, msg: 'Successfully delete user' });
    } catch (e) {
      return res.json({
        msg: 'fail to read',
        status: 500,
        route: RoutePaths.Id,
      });
    }
  }
}

export default new UserHandler();
