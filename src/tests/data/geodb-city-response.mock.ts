import { IGeodbCityResponse } from '../../interfaces/geodb-city-response.interface';

export const mockGeoDbCityResponse = (): IGeodbCityResponse => {
  return {
    data: {
      data: [
        {
          city: 'Montréal',
          country: 'Canada',
          countryCode: 'CA',
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
      ]
    },
    metadata: {
      currentOffset: 5,
      totalCount: 67
    }
  };
};
