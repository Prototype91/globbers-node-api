export interface ICity {
  readonly id: number;
  readonly countryCode: string;
  readonly latitude: number;
  readonly longitude: number;
  readonly name: string;
  readonly population: number;
  readonly region: string;
  readonly regionCode: string;
  readonly type: string;
  readonly wikiDataId: string;
  readonly countryName: string;
  readonly country?: string;
}
