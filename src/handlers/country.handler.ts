import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { RoutePaths } from '../enums/route-paths.enum';
import { Country } from '../models/country.model';

interface CustomUserRequest extends Request {
  readonly userId?: string;
}

class CountryHandler {
  public async create(req: CustomUserRequest, res: Response): Promise<unknown> {
    const id = uuidv4();
    const userId = req.userId;
    try {
      const country = await Country.create({ ...req.body, userId, id });
      return res.json({ country, msg: 'The country has successfully been created' });
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
      const countries = await Country.findAll({ where: { userId } });
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
    try {
      const { id } = req.params;
      const country = await Country.findOne({ where: { id, userId } });
      return res.json(country);
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
    try {
      const { id } = req.params;
      const country = await Country.findOne({ where: { id, userId } });

      if (!country) {
        return res.json({ msg: 'Can not find existing country' });
      }

      const updatedCountry = await country.update({ ...req.body });

      return res.json({
        country: updatedCountry,
        msg: 'The country has successfully been updated'
      });
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
      const country = await Country.findOne({ where: { id, userId } });

      if (!country) {
        return res.json({ msg: 'Can not find existing country' });
      }

      const deletedCountry = await country.destroy();

      return res.json({
        country: deletedCountry,
        msg: 'The country has successfully been deleted'
      });
    } catch (e) {
      return res.json({
        msg: 'fail to read',
        status: 500,
        route: RoutePaths.Id
      });
    }
  }
}

export default new CountryHandler();
