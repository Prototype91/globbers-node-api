import { SearchCityClient } from '../../services/clients/search-city.client';

describe(SearchCityClient.name, () => {
  describe(`When we call ${SearchCityClient.getCitiesBySearchText.name}()`, () => {
    it('Should return a response of cities', async () => {
      await SearchCityClient.getCitiesBySearchText('Montréal').then(res => {
        expect(res.data).toStrictEqual({
          data: [
            {
              city: 'Montreal Metropolitan Community',
              country: 'Canada',
              countryCode: 'CA',
              id: 3181877,
              latitude: 45.56,
              longitude: -73.66,
              name: 'Montreal Metropolitan Community',
              population: 3979402,
              region: 'Quebec',
              regionCode: 'QC',
              type: 'ADM2',
              wikiDataId: 'Q656150'
            },
            {
              city: 'Urban agglomeration of Montreal',
              country: 'Canada',
              countryCode: 'CA',
              id: 3007971,
              latitude: 45.516666666,
              longitude: -73.65,
              name: 'Urban agglomeration of Montreal',
              population: 2074068,
              region: 'Quebec',
              regionCode: 'QC',
              type: 'ADM2',
              wikiDataId: 'Q2826806'
            },
            {
              city: 'Montreal',
              country: 'Canada',
              countryCode: 'CA',
              id: 140079,
              latitude: 45.508888888,
              longitude: -73.561666666,
              name: 'Montreal',
              population: 1825208,
              region: 'Quebec',
              regionCode: 'QC',
              type: 'CITY',
              wikiDataId: 'Q340'
            }
          ],
          metadata: {
            currentOffset: 0,
            totalCount: 3
          }
        });
      });
    });
  });
});
