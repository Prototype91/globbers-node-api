export interface IGeodbCountryResponse {
  readonly data: IData;
  readonly metadata: IMetaData;
}

interface IGeodbCountry {
  readonly id?: string;
  readonly name: string;
  readonly code?: string;
  readonly currencyCode?: string[];
  readonly wikiDataId?: string;
}

interface IData {
  readonly data: IGeodbCountry[];
}

interface IMetaData {
  readonly currentOffset: number;
  readonly totalCount: number;
}
