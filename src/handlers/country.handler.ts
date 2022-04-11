import { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { RoutePaths } from '../enums/route-paths.enum';
import { CustomRequest } from '../interfaces/custom-request.interface';
import { Country } from '../models/country.model';

class CountryHandler {
  public async create(req: CustomRequest, res: Response): Promise<unknown> {
    const id = uuidv4();
    const userId = req.userId;
    try {
      const country = await Country.create({ ...req.body, userId, id });
      return res.status(200).json({ country, msg: 'The country has successfully been created' });
    } catch (e) {
      return res.status(500).json({
        msg: 'fail to create',
        status: 500,
        route: RoutePaths.Default
      });
    }
  }

  public async getCities(req: Request | any, res: Response): Promise<unknown> {
    const userId = req.userId;
    try {
      const { id } = req.params;
      const country = await Country.findOne({
        where: { id, userId },
        include: [Country.associations.cities]
      });
      res.status(200).json(country);
    } catch (e) {
      return res.status(500).json({
        msg: 'fail to read',
        status: 500,
        route: RoutePaths.CountryCities
      });
    }
  }

  public async read(req: CustomRequest, res: Response): Promise<unknown> {
    const userId = req.userId;
    try {
      const countries = await Country.findAll({ where: { userId } });
      return res.status(200).json(countries);
    } catch (e) {
      return res.status(500).json({
        msg: 'fail to read',
        status: 500,
        route: RoutePaths.Default
      });
    }
  }

  public async readByID(req: CustomRequest, res: Response): Promise<unknown> {
    const userId = req.userId;
    try {
      const { id } = req.params;
      const country = await Country.findOne({ where: { id, userId } });
      return res.status(200).json(country);
    } catch (e) {
      return res.status(500).json({
        msg: 'fail to read',
        status: 500,
        route: RoutePaths.Id
      });
    }
  }

  public async update(req: CustomRequest, res: Response): Promise<unknown> {
    const userId = req.userId;
    try {
      const { id } = req.params;
      const country = await Country.findOne({ where: { id, userId } });

      if (!country) {
        return res.status(500).json({ msg: 'Can not find existing country' });
      }

      const updatedCountry = await country.update({ ...req.body });

      return res.status(200).json({
        country: updatedCountry,
        msg: 'The country has successfully been updated'
      });
    } catch (e) {
      return res.status(500).json({
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
      const country = await Country.findOne({ where: { id, userId } });

      if (!country) {
        return res.status(500).json({ msg: 'Can not find existing country' });
      }

      const deletedCountry = await country.destroy();

      return res.status(200).json({
        country: deletedCountry,
        msg: 'The country has successfully been deleted'
      });
    } catch (e) {
      return res.status(500).json({
        msg: 'fail to read',
        status: 500,
        route: RoutePaths.Id
      });
    }
  }
}

export default new CountryHandler();
