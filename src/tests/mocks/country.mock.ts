import { ICountry } from '../../interfaces/country.interface';

export const mockCountry = (): Pick<ICountry, 'name'> => {
  return {
    name: 'Canada'
  };
};
