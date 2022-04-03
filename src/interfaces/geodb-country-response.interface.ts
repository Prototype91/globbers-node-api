export interface GeodbCountryResponseModel {
  readonly data: Data;
  readonly metadata: MetaData;
}

interface IGeodbCountry {
  readonly id?: string;
  readonly name: string;
  readonly code?: string;
  readonly currencyCode?: string[];
  readonly wikiDataId?: string;
}

interface Data {
  readonly data: IGeodbCountry[];
}

interface MetaData {
  readonly currentOffset: number;
  readonly totalCount: number;
}
