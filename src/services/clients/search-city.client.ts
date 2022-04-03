import axios from 'axios';
import { IGeodbCityResponse } from '../../interfaces/geodb-city-response.interface';

export class SearchCityClient {
  private static readonly geoDbBaseUrl = 'http://geodb-free-service.wirefreethought.com';
  private static readonly endPoint = '/v1/geo/cities';

  public static getCitiesBySearchText(cityName: string): Promise<IGeodbCityResponse> {
    return axios.get(
      `${this.geoDbBaseUrl}${this.endPoint}?limit=10&offset=0&namePrefix=${cityName}&languageCode=en&sort=-population`
    );
  }
}
