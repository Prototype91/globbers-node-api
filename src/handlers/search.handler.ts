import { Request, Response } from 'express';
import { RoutePaths } from '../enums/route-paths.enum';
import { SearchCountryClient } from '../services/clients/search-country.client';
import { SearchCountryMapper } from '../services/mappers/search-country.mapper';

class SearchHandler {
  public async getCountriesBySearchText(req: Request, res: Response): Promise<unknown> {
    try {
      const name = req.query.name as unknown as string;
      console.log('query', name);
      const country = await SearchCountryClient.getCountriesBySearchText(name);
      const response = SearchCountryMapper.mapToCountry(country);
      return res.json(response);
    } catch (error: any) {
      return res.json({
        msg: error.message,
        status: 500,
        route: RoutePaths.Default
      });
    }
  }
}

export default new SearchHandler();
