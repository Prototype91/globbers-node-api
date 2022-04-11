import { ICountry } from '../../interfaces/country.interface';
import { IGeodbCountryResponse } from '../../interfaces/geodb-country-response.interface';
import { SearchCountryMapper } from '../../services/mappers/search-country.mapper';
import { mockGeoDbCountryResponse } from '../data/geodb-country-response.mock';

describe(SearchCountryMapper.name, () => {
  describe(`When we call ${SearchCountryMapper.mapToCountry.name}()`, () => {
    it('Should return an array of mapped countries', () => {
      const mockResponse: IGeodbCountryResponse = mockGeoDbCountryResponse();

      const mockCountries: ICountry[] = [
        {
          code: 'CA',
          continent: 'North America',
          currencyCode: ['CAD'],
          id: undefined,
          name: 'Canada',
          wikiDataId: 'Q16'
        }
      ];
      expect(SearchCountryMapper.mapToCountry(mockResponse)).toStrictEqual(mockCountries);
    });
  });
});
