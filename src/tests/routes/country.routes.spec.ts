import request from 'supertest';
import app from '../../app';
import { RoutePaths } from '../../enums/route-paths.enum';
import { Country } from '../../models/country.model';
import { mockCountry } from '../data/country.mock';

describe('When we create a country', () => {
  const country = mockCountry();

  it('Should have key country and msg when created', async () => {
    const res = await request(app).post(RoutePaths.Country).send(country);
    expect(res.statusCode).toEqual(200);
  });

  it('Should handle request param', async () => {
    const res = await request(app).post(RoutePaths.Country).send({});
    expect(res.body).toEqual({
      msg: 'The name value should not be empty',
      param: 'name',
      location: 'body'
    });
  });
});

describe('When we get countries', () => {
  const country = mockCountry();

  it('Should return an array of countries', async () => {
    const mockReadAllCountries = jest.fn((): any => [country]);
    jest.spyOn(Country, 'findAll').mockImplementation(() => mockReadAllCountries());

    const res = await request(app).get(RoutePaths.Country);

    expect(mockReadAllCountries).toHaveBeenCalledTimes(1);
    expect(res.body).toEqual([country]);
  });

  it('Should handle exception', async () => {
    const mockCreateCountry = jest.fn((): any => {
      throw 'error';
    });
    jest.spyOn(Country, 'findAll').mockImplementation(() => mockCreateCountry());

    const res = await request(app).get(RoutePaths.Country);
    expect(mockCreateCountry).toHaveBeenCalledTimes(1);
    expect(res.body).toEqual({
      msg: 'fail to read',
      status: 500,
      route: RoutePaths.Default
    });
  });
});