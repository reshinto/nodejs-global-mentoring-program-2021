import request from 'supertest';
import app from '../../index';
import setupPassport from '../../loaders/passport-setup';
import User from '../../models/user';

describe('/login', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    app.close();
  });

  it('should return status code 400 due to missing username', async () => {
    const res = await request(app)
      .post('/login')
      .send({  password: 'Password123456' });
    const expected = '"username" is required';

    expect(res.statusCode).toBe(400);
    expect(res.body.errors[0].message).toEqual(expected);
  });

  it('should return status code 400 due to missing password', async () => {
    const res = await request(app)
      .post('/login')
      .send({  username: 'test' });
    const expected = '"password" is required';

    expect(res.statusCode).toBe(400);
    expect(res.body.errors[0].message).toEqual(expected);
  });

  it('should return status code 400 when username is less than 3 characters', async () => {
    const res = await request(app)
      .post('/login')
      .send({  username: 'ab', password: 'Password123456' });

    const expected = '"username" length must be at least 3 characters long';

    expect(res.statusCode).toBe(400);
    expect(res.body.errors[0].message).toEqual(expected);
  });

  it('should return status code 400 when password is invalid', async () => {
    const res = await request(app)
      .post('/login')
      .send({  username: 'abc', password: 'password' });

    const expected = '"password" with value "password" fails to match the required pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/';

    expect(res.statusCode).toBe(400);
    expect(res.body.errors[0].message).toEqual(expected);
  });

  it('should return status code 400 when username is invalid', async () => {
    await setupPassport();
    const user = [
      {
        login: 'NewUser1',
        password: 'Password123456',
        age: 20,
        is_deleted: false
      }
    ];
    jest.spyOn(User, 'findAll').mockResolvedValue(user as any);
    const res = await request(app)
      .post('/login')
      .send({ username: 'NewUser', password: 'Password123456' });
    const expected = 'Invalid username or password';

    expect(res.statusCode).toBe(400);
    expect(res.body.error[0].message).toEqual(expected);
  });

  it('should return status code 400 when password is invalid', async () => {
    await setupPassport();
    const user = [
      {
        login: 'NewUser1',
        password: 'Password123456',
        age: 20,
        is_deleted: false
      }
    ];
    jest.spyOn(User, 'findAll').mockResolvedValue(user as any);
    const res = await request(app)
      .post('/login')
      .send({ username: 'NewUser1', password: 'Password12345' });
    const expected = 'Invalid username or password';

    expect(res.statusCode).toBe(400);
    expect(res.body.error[0].message).toEqual(expected);
  });

  it('should return status code 200', async () => {
    await setupPassport();
    const user = [
      {
        login: 'NewUser1',
        password: 'Password123456',
        age: 20,
        is_deleted: false
      }
    ];
    jest.spyOn(User, 'findAll').mockResolvedValue(user as any);
    const res = await request(app)
      .post('/login')
      .send({ username: 'NewUser1', password: 'Password123456' });
    const expected = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toContain(expected);
  });
});
