import { ICity } from '../../interfaces/city.interface';
import { IGeodbCityResponse } from '../../interfaces/geodb-city-response.interface';

export class SearchCityMapper {
  public static mapToCity(response: IGeodbCityResponse): ICity[] {
    return response.data.data.map(item => ({
      countryName: item.country,
      countryCode: item.countryCode,
      id: item.id,
      latitude: item.latitude,
      longitude: item.longitude,
      name: item.name,
      population: item.population,
      region: item.region,
      regionCode: item.regionCode,
      type: item.type,
      wikiDataId: item.wikiDataId
    }));
  }
}
