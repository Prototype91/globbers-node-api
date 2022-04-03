import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { RoutePaths } from '../enums/route-paths.enum';
import { User } from '../models/user.model';

class UserHandler {
  public async create(req: Request, res: Response): Promise<unknown> {
    const id = uuidv4();
    try {
      const user = await User.create({ ...req.body, id });
      return res.json({ user, msg: 'Successfully create user' });
    } catch (e) {
      return res.json({
        msg: 'fail to create',
        status: 500,
        route: RoutePaths.Default,
      });
    }
  }

  public async getUserCountries(req: Request, res: Response): Promise<unknown> {
    try {
      const { id } = req.params;
      const user = (await User.findOne({
        where: { id },
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
