import { IGeodbCountryResponse } from '../../interfaces/geodb-country-response.interface';

export const mockGeoDbCountryResponse = (): IGeodbCountryResponse => {
  return {
    data: {
      data: [
        {
          code: 'CA',
          currencyCode: ['CAD'],
          name: 'Canada',
          wikiDataId: 'Q16'
        }
      ]
    },
    metadata: {
      currentOffset: 5,
      totalCount: 67
    }
  };
};
