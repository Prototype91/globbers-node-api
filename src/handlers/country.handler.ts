import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { CountryModel } from '../models/country.model';

class CountryHandler {
  public async create(req: Request, res: Response): Promise<unknown> {
    const id = uuidv4();
    try {
      const country = await CountryModel.create({ ...req.body, id });
      return res.json({ country, msg: 'Successfully create country' });
    } catch (e) {
      return res.json({ msg: 'fail to create', status: 500, route: '/' });
    }
  }

  public async read(req: Request, res: Response): Promise<unknown> {
    try {
      const countries = await CountryModel.findAll();
      return res.json(countries);
    } catch (e) {
      return res.json({ msg: 'fail to read', status: 500, route: '/' });
    }
  }
  public async readByID(req: Request, res: Response): Promise<unknown> {
    try {
      const { id } = req.params;
      const country = await CountryModel.findOne({ where: { id } });
      return res.json(country);
    } catch (e) {
      return res.json({ msg: 'fail to read', status: 500, route: '/:id' });
    }
  }
  public async update(req: Request, res: Response): Promise<unknown> {
    try {
      const { id } = req.params;
      const country = await CountryModel.findOne({ where: { id } });

      if (!country) {
        return res.json({ msg: 'Can not find existing country' });
      }

      const updatedCountry = await country.update({
        visited: !country.getDataValue('visited'),
      });

      return res.json({ country: updatedCountry });
    } catch (e) {
      return res.json({
        msg: 'fail to read',
        status: 500,
        route: '/:id',
      });
    }
  }
  public async delete(req: Request, res: Response): Promise<unknown> {
    try {
      const { id } = req.params;
      const country = await CountryModel.findOne({ where: { id } });

      if (!country) {
        return res.json({ msg: 'Can not find existing country' });
      }

      const deletedCountry = await country.destroy();

      return res.json({ country: deletedCountry });
    } catch (e) {
      return res.json({
        msg: 'fail to read',
        status: 500,
        route: '/:id',
      });
    }
  }
}

export default new CountryHandler();
