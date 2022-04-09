export interface ICity {
  readonly id?: number;
  readonly userId?: string;
  readonly countryCode: string;
  readonly latitude: number | string;
  readonly longitude: number | string;
  readonly name: string;
  readonly population: number;
  readonly region: string;
  readonly regionCode: string;
  readonly type: string;
  readonly wikiDataId: string;
  readonly countryName: string;
}
