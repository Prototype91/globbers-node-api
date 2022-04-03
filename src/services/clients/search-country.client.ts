import axios from 'axios';
import { GeodbCountryResponseModel } from '../../interfaces/geodb-country-response.interface';

export class SearchCountryClient {
  private static readonly geoDbBaseUrl = 'http://geodb-free-service.wirefreethought.com';
  private static readonly endPoint = '/v1/geo/countries';

  public static getCountriesBySearchText(countryName: string): Promise<GeodbCountryResponseModel> {
    console.log('jhfjkshfjks', countryName);
    return axios.get(
      `${this.geoDbBaseUrl}${this.endPoint}?limit=5&offset=0&namePrefix=${countryName}&languageCode=en`
    );
  }
}
