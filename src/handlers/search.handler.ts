import { Request, Response } from 'express';
import { RoutePaths } from '../enums/route-paths.enum';
import { SearchCityClient } from '../services/clients/search-city.client';
import { SearchCountryClient } from '../services/clients/search-country.client';
import { SearchCityMapper } from '../services/mappers/search-city.mapper';
import { SearchCountryMapper } from '../services/mappers/search-country.mapper';

class SearchHandler {
  public async getCountriesBySearchText(req: Request, res: Response): Promise<unknown> {
    try {
      const name = req.query.name as unknown as string;
      const country = await SearchCountryClient.getCountriesBySearchText(name);
      const response = SearchCountryMapper.mapToCountry(country);
      return res.json(response);
    } catch (error) {
      if (error instanceof Error) {
        return res.json({
          msg: error.message,
          status: 500,
          route: RoutePaths.Country
        });
      }
    }
  }

  public async getCitiesBySearchText(req: Request, res: Response): Promise<unknown> {
    try {
      const name = req.query.name as unknown as string;
      const city = await SearchCityClient.getCitiesBySearchText(name);
      const response = SearchCityMapper.mapToCity(city);
      return res.json(response);
    } catch (error) {
      if (error instanceof Error) {
        return res.json({
          msg: error.message,
          status: 500,
          route: RoutePaths.City
        });
      }
    }
  }
}

export default new SearchHandler();
