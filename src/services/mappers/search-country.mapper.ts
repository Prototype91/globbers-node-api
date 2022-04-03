import { ICountry } from '../../interfaces/country.interface';
import { GeodbCountryResponseModel } from '../../interfaces/geodb-country-response.interface';
import country from 'country-list-js';

export class SearchCountryMapper {
  public static mapToCountry(response: GeodbCountryResponseModel): ICountry[] {
    return response.data.data.map(item => ({
      id: item.id,
      code: item.code,
      currencyCode: item.currencyCode,
      name: item.name,
      wikiDataId: item.wikiDataId,
      continent: this.getCountryContinent(item.name) ?? 'Others'
    }));
  }

  private static getCountryContinent(name: string): string | null {
    return country.findByName(name)?.continent ?? null;
  }
}
