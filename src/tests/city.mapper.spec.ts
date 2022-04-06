import { SearchCityMapper } from '../services/mappers/search-city.mapper';
import { mockGeoDbCityResponse } from './mocks/geodb-city-response.mock';

describe(SearchCityMapper.name, () => {
  describe(`When we call ${SearchCityMapper.mapToCity.name}`, () => {
    it('Should return an array of mapped cities', () => {
      const mockResponse = mockGeoDbCityResponse();

      const mockCities = [
        {
          countryCode: 'CA',
          countryName: 'Canada',
          id: 6,
          latitude: 6,
          longitude: 6,
          name: 'Montréal',
          population: 6000,
          region: 'Québec',
          regionCode: 'QC',
          type: 'city',
          wikiDataId: '688GJSNJ'
        }
      ];
      expect(SearchCityMapper.mapToCity(mockResponse)).toStrictEqual(mockCities);
    });
  });
});
