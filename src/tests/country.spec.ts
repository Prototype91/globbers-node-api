import request from 'supertest';
import app from '../app';
import { CountryModel } from '../models/country.model';

describe('When we create a country', () => {
  const country = {
    name: 'Canada',
  };

  it('Should have key country and msg when created', async () => {
    const mockCreateCountry = jest.fn((): any => country);
    jest
      .spyOn(CountryModel, 'create')
      .mockImplementation(() => mockCreateCountry());

    const res = await request(app).post('/country').send(country);

    expect(mockCreateCountry).toHaveBeenCalledTimes(1);
    expect(res.body).toHaveProperty('msg');
    expect(res.body).toHaveProperty('country');
  });

  it('Should handle exception', async () => {
    const mockCreateCountry = jest.fn((): any => {
      throw 'error';
    });
    jest
      .spyOn(CountryModel, 'create')
      .mockImplementation(() => mockCreateCountry());

    const res = await request(app).post('/country').send(country);

    expect(mockCreateCountry).toHaveBeenCalledTimes(1);
    expect(res.body).toEqual({
      msg: 'fail to create',
      status: 500,
      route: '/',
    });
  });

  it('Should handle request param', async () => {
    const res = await request(app).post('/country').send({});

    expect(res.body).toEqual({
      msg: 'The name value should not be empty',
      param: 'name',
      location: 'body',
    });
  });
});

describe('When we get countries', () => {
  const country = {
    name: 'Canada',
  };

  it('Should return an array of countries', async () => {
    const mockReadAllCountries = jest.fn((): any => [country]);
    jest
      .spyOn(CountryModel, 'findAll')
      .mockImplementation(() => mockReadAllCountries());

    const res = await request(app).get('/country');

    expect(mockReadAllCountries).toHaveBeenCalledTimes(1);
    expect(res.body).toEqual([country]);
  });

  it('Should handle exception', async () => {
    const mockCreateCountry = jest.fn((): any => {
      throw 'error';
    });
    jest
      .spyOn(CountryModel, 'findAll')
      .mockImplementation(() => mockCreateCountry());

    const res = await request(app).get('/country');
    expect(mockCreateCountry).toHaveBeenCalledTimes(1);
    expect(res.body).toEqual({
      msg: 'fail to read',
      status: 500,
      route: '/',
    });
  });
});
