import { SearchCountryClient } from '../../services/clients/search-country.client';

describe(SearchCountryClient.name, () => {
  describe(`When we call ${SearchCountryClient.getCountriesBySearchText.name}()`, () => {
    it('Should return a response of cities', async () => {
      await SearchCountryClient.getCountriesBySearchText('Canada').then(res => {
        expect(res.data).toStrictEqual({
          data: [
            {
              code: 'CA',
              currencyCodes: ['CAD'],
              name: 'Canada',
              wikiDataId: 'Q16'
            }
          ],
          metadata: {
            currentOffset: 0,
            totalCount: 1
          }
        });
      });
    });
  });
});
