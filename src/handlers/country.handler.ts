import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { RoutePaths } from '../enums/route-paths.enum';
import { Country } from '../models/country.model';

class CountryHandler {
  public async create(req: Request, res: Response): Promise<unknown> {
    const id = uuidv4();
    try {
      const country = await Country.create({ ...req.body, id });
      return res.json({ country, msg: 'Successfully create country' });
    } catch (e) {
      return res.json({
        msg: 'fail to create',
        error: e,
        status: 500,
        route: RoutePaths.Default
      });
    }
  }

  public async read(_: Request, res: Response): Promise<unknown> {
    try {
      const countries = await Country.findAll();
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
      const country = await Country.findOne({ where: { id } });
      return res.json(country);
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
      const country = await Country.findOne({ where: { id } });

      if (!country) {
        return res.json({ msg: 'Can not find existing country' });
      }

      const updatedCountry = await country.update({ ...req.body });

      return res.json({ country: updatedCountry });
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
      const country = await Country.findOne({ where: { id } });

      if (!country) {
        return res.json({ msg: 'Can not find existing country' });
      }

      const deletedCountry = await country.destroy();

      return res.json({ country: deletedCountry });
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
