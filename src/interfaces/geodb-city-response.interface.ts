export interface IGeodbCityResponse {
  readonly data: { readonly data: IData[] };
  readonly metadata: IMetaData;
}

interface IData {
  readonly city: string;
  readonly country: string;
  readonly countryCode: string;
  readonly id: number;
  readonly latitude: number;
  readonly longitude: number;
  readonly name: string;
  readonly population: number;
  readonly region: string;
  readonly regionCode: string;
  readonly type: string;
  readonly wikiDataId: string;
}

interface IMetaData {
  readonly currentOffset: number;
  readonly totalCount: number;
}
