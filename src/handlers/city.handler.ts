import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { RoutePaths } from '../enums/route-paths.enum';
import { City } from '../models/city.model';

class CityHandler {
  public async create(req: Request, res: Response): Promise<unknown> {
    const id = uuidv4();
    try {
      const city = await City.create({ ...req.body, id });
      return res.json({ city, msg: 'Successfully create city' });
    } catch (e) {
      return res.json({
        msg: 'fail to create',
        status: 500,
        route: RoutePaths.Default
      });
    }
  }

  public async read(_: Request, res: Response): Promise<unknown> {
    try {
      const countries = await City.findAll();
      return res.json(countries);
    } catch (e) {
      return res.json({
        msg: 'fail to read',
        status: 500,
        route: RoutePaths.Default
      });
    }
  }

  public async readByID(req: Request, res: Response): Promise<unknown> {
    try {
      const { id } = req.params;
      const city = await City.findOne({ where: { id } });
      return res.json(city);
    } catch (e) {
      return res.json({
        msg: 'fail to read',
        status: 500,
        route: RoutePaths.Id
      });
    }
  }

  public async update(req: Request, res: Response): Promise<unknown> {
    try {
      const { id } = req.params;
      const city = await City.findOne({ where: { id } });

      if (!city) {
        return res.json({ msg: 'Can not find existing city' });
      }

      const updatedcity = await city.update({ ...req.body });

      return res.json({ city: updatedcity });
    } catch (e) {
      return res.json({
        msg: 'fail to read',
        status: 500,
        route: RoutePaths.Id
      });
    }
  }
  public async delete(req: Request, res: Response): Promise<unknown> {
    try {
      const { id } = req.params;
      const city = await City.findOne({ where: { id } });

      if (!city) {
        return res.json({ msg: 'Can not find existing city' });
      }

      const deletedcity = await City.destroy();

      return res.json({ city: deletedcity });
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
