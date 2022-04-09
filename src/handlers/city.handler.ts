import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { RoutePaths } from '../enums/route-paths.enum';
import { City } from '../models/city.model';

class CityHandler {
  public async create(req: Request | any, res: Response): Promise<unknown> {
    const userId = req.userId;
    const id = uuidv4();
    try {
      const city = await City.create({ ...req.body, userId, id });
      return res.json({ city, msg: 'The city has successfully been created' });
    } catch (e) {
      return res.json({
        msg: 'fail to create',
        status: 500,
        route: RoutePaths.Default
      });
    }
  }

  public async read(req: Request | any, res: Response): Promise<unknown> {
    const userId = req.userId;
    try {
      const countries = await City.findAll({ where: { userId } });
      return res.json(countries);
    } catch (e) {
      return res.json({
        msg: 'fail to read',
        status: 500,
        route: RoutePaths.Default
      });
    }
  }

  public async readByID(req: Request | any, res: Response): Promise<unknown> {
    const userId = req.userId;
    const { id } = req.params;
    try {
      const city = await City.findOne({ where: { id, userId } });
      return res.json(city);
    } catch (e) {
      return res.json({
        msg: 'fail to read',
        status: 500,
        route: RoutePaths.Id
      });
    }
  }

  public async update(req: Request | any, res: Response): Promise<unknown> {
    const userId = req.userId;
    const { id } = req.params;
    try {
      const city = await City.findOne({ where: { id, userId } });

      if (!city) {
        return res.json({ msg: 'Can not find existing city' });
      }

      const updatedcity = await city.update({ ...req.body });

      return res.json({ city: updatedcity, msg: 'The city has successfully been updated' });
    } catch (e) {
      return res.json({
        msg: 'fail to read',
        status: 500,
        route: RoutePaths.Id
      });
    }
  }
  public async delete(req: Request | any, res: Response): Promise<unknown> {
    const userId = req.userId;
    try {
      const { id } = req.params;
      const city = await City.findOne({ where: { id, userId } });

      if (!city) {
        return res.json({ msg: 'Can not find existing city' });
      }

      const deletedcity = await city.destroy();

      return res.json({ city: deletedcity, msg: 'The city has successfully been deleted' });
    } catch (e) {
      return res.json({
        msg: 'fail to read',
        status: 500,
        route: RoutePaths.Id
      });
    }
  }
}

export default new CityHandler();
