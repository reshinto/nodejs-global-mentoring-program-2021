import request from 'supertest';
import app from '../../index';
import setupPassport from '../../loaders/passport-setup';
import User from '../../models/user';
import { generateAccessToken } from '../../services/jwt';

describe('/users', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    app.close();
  });

  it('should return status code 401 when auth token is not provided', async () => {
    await setupPassport();
    const res = await request(app)
      .get('/users');
    const expected = 'Error: No auth token';

    expect(res.statusCode).toBe(401);
    expect(res.body.error[0].message).toEqual(expected);
  });

  it('should return status code 403 when auth token is malformed', async () => {
    await setupPassport();
    const token = 'abc';
    const res = await request(app)
      .get('/users')
      .set('Authorization', `bearer ${token}`);
    const expected = 'JsonWebTokenError: jwt malformed';

    expect(res.statusCode).toBe(403);
    expect(res.body.error[0].message).toEqual(expected);
  });

  it('should return status code 403 when auth token has invalid signature', async () => {
    await setupPassport();
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik1heCIsImlhdCI6MTYzOTE3ODg5MCwiZXhwIjoxNjM5MTgwNjkwfQ.-C-4mfhAiLuo3I9TBUaAwEQ97FQFmTPpwVoDWZd74df';
    const res = await request(app)
      .get('/users')
      .set('Authorization', `bearer ${token}`);
    const expected = 'JsonWebTokenError: invalid signature';

    expect(res.statusCode).toBe(403);
    expect(res.body.error[0].message).toEqual(expected);
  });

  it('should return users when correct auth token is provided', async () => {
    await setupPassport();

    const expected = [
      {
        login: 'test',
        password: 'testpw',
        age: 20,
        is_deleted: false
      }
    ];
    jest.spyOn(User, 'findAll').mockResolvedValue(expected as any);

    const token = generateAccessToken('test');
    const res = await request(app)
      .get('/users')
      .set('Authorization', `bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(expected);
  });
});

describe('/users/:id', () => {
  const id = '1';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    app.close();
  });

  it('should return status code 401 when auth token is not provided', async () => {
    await setupPassport();
    const res = await request(app)
      .get(`/users/${id}`);
    const expected = 'Error: No auth token';

    expect(res.statusCode).toBe(401);
    expect(res.body.error[0].message).toEqual(expected);
  });

  it('should return status code 403 when auth token is malformed', async () => {
    await setupPassport();
    const token = 'abc';
    const res = await request(app)
      .get(`/users/${id}`)
      .set('Authorization', `bearer ${token}`);
    const expected = 'JsonWebTokenError: jwt malformed';

    expect(res.statusCode).toBe(403);
    expect(res.body.error[0].message).toEqual(expected);
  });

  it('should return status code 403 when auth token has invalid signature', async () => {
    await setupPassport();
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik1heCIsImlhdCI6MTYzOTE3ODg5MCwiZXhwIjoxNjM5MTgwNjkwfQ.-C-4mfhAiLuo3I9TBUaAwEQ97FQFmTPpwVoDWZd74df';
    const res = await request(app)
      .get(`/users/${id}`)
      .set('Authorization', `bearer ${token}`);
    const expected = 'JsonWebTokenError: invalid signature';

    expect(res.statusCode).toBe(403);
    expect(res.body.error[0].message).toEqual(expected);
  });

  it('should return user when correct auth token is provided', async () => {
    await setupPassport();

    const expected = {
      login: 'test',
      password: 'testpw',
      age: 20,
      is_deleted: false
    };
    jest.spyOn(User, 'findAll').mockResolvedValue(expected as any);

    const token = generateAccessToken('test');
    const res = await request(app)
      .get(`/users/${id}`)
      .set('Authorization', `bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(expected);
  });
});

describe('/users/:id', () => {
  const id = '1';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    app.close();
  });

  it('should return status code 401 when auth token is not provided', async () => {
    await setupPassport();
    const res = await request(app)
      .delete(`/users/${id}`);
    const expected = 'Error: No auth token';

    expect(res.statusCode).toBe(401);
    expect(res.body.error[0].message).toEqual(expected);
  });

  it('should return status code 403 when auth token is malformed', async () => {
    await setupPassport();
    const token = 'abc';
    const res = await request(app)
      .delete(`/users/${id}`)
      .set('Authorization', `bearer ${token}`);
    const expected = 'JsonWebTokenError: jwt malformed';

    expect(res.statusCode).toBe(403);
    expect(res.body.error[0].message).toEqual(expected);
  });

  it('should return status code 403 when auth token has invalid signature', async () => {
    await setupPassport();
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik1heCIsImlhdCI6MTYzOTE3ODg5MCwiZXhwIjoxNjM5MTgwNjkwfQ.-C-4mfhAiLuo3I9TBUaAwEQ97FQFmTPpwVoDWZd74df';
    const res = await request(app)
      .delete(`/users/${id}`)
      .set('Authorization', `bearer ${token}`);
    const expected = 'JsonWebTokenError: invalid signature';

    expect(res.statusCode).toBe(403);
    expect(res.body.error[0].message).toEqual(expected);
  });

  it('should return users when correct auth token is provided', async () => {
    await setupPassport();

    const payload = {
      id: '1',
      login: 'test',
      password: 'testpw',
      age: 20,
      is_deleted: true
    };
    const expected1 = {
      id: '1',
      login: 'test',
      password: 'testpw',
      age: 20,
      is_deleted: false
    };
    const expected2 = [
      {
        id: '2',
        login: 'test2',
        password: 'testpw2',
        age: 30,
        is_deleted: false
      }
    ];

    jest.spyOn(User, 'findOne').mockResolvedValue(expected1 as any);
    jest.spyOn(User, 'update').mockResolvedValue(payload as any);
    jest.spyOn(User, 'findAll').mockResolvedValue(expected2 as any);

    const token = generateAccessToken('test');
    const res = await request(app)
      .delete(`/users/${id}`)
      .set('Authorization', `bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(expected2);
  });
});

describe('/users/:id', () => {
  const id = '1';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    app.close();
  });

  it('should return status code 401 when auth token is not provided', async () => {
    await setupPassport();
    const res = await request(app)
      .put(`/users/${id}`);
    const expected = 'Error: No auth token';

    expect(res.statusCode).toBe(401);
    expect(res.body.error[0].message).toEqual(expected);
  });

  it('should return status code 403 when auth token is malformed', async () => {
    await setupPassport();
    const token = 'abc';
    const res = await request(app)
      .put(`/users/${id}`)
      .set('Authorization', `bearer ${token}`);
    const expected = 'JsonWebTokenError: jwt malformed';

    expect(res.statusCode).toBe(403);
    expect(res.body.error[0].message).toEqual(expected);
  });

  it('should return status code 403 when auth token has invalid signature', async () => {
    await setupPassport();
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik1heCIsImlhdCI6MTYzOTE3ODg5MCwiZXhwIjoxNjM5MTgwNjkwfQ.-C-4mfhAiLuo3I9TBUaAwEQ97FQFmTPpwVoDWZd74df';
    const res = await request(app)
      .put(`/users/${id}`)
      .set('Authorization', `bearer ${token}`);
    const expected = 'JsonWebTokenError: invalid signature';

    expect(res.statusCode).toBe(403);
    expect(res.body.error[0].message).toEqual(expected);
  });

  it('should return user when correct auth token is provided', async () => {
    await setupPassport();

    const payload = {
      login: 'NewUser1',
      password: 'Password123456',
      age: 20
    };
    const expected = {
      id: '1',
      login: 'NewUser1',
      password: 'Password123456',
      age: 20,
      is_deleted: false
    };
    jest.spyOn(User, 'update').mockResolvedValue(payload as any);
    jest.spyOn(User, 'findOne').mockResolvedValue(expected as any);

    const token = generateAccessToken('test');
    const res = await request(app)
      .put(`/users/${id}`)
      .send(payload)
      .set('Authorization', `bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(expected);
  });
});

describe('/users/create', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    app.close();
  });

  it('should return status code 401 when auth token is not provided', async () => {
    await setupPassport();
    const res = await request(app)
      .post('/users/create');
    const expected = 'Error: No auth token';

    expect(res.statusCode).toBe(401);
    expect(res.body.error[0].message).toEqual(expected);
  });

  it('should return status code 403 when auth token is malformed', async () => {
    await setupPassport();
    const token = 'abc';
    const res = await request(app)
      .post('/users/create')
      .set('Authorization', `bearer ${token}`);
    const expected = 'JsonWebTokenError: jwt malformed';

    expect(res.statusCode).toBe(403);
    expect(res.body.error[0].message).toEqual(expected);
  });

  it('should return status code 403 when auth token has invalid signature', async () => {
    await setupPassport();
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik1heCIsImlhdCI6MTYzOTE3ODg5MCwiZXhwIjoxNjM5MTgwNjkwfQ.-C-4mfhAiLuo3I9TBUaAwEQ97FQFmTPpwVoDWZd74df';
    const res = await request(app)
      .post('/users/create')
      .set('Authorization', `bearer ${token}`);
    const expected = 'JsonWebTokenError: invalid signature';

    expect(res.statusCode).toBe(403);
    expect(res.body.error[0].message).toEqual(expected);
  });

  it('should return users when correct auth token is provided', async () => {
    await setupPassport();

    const payload = {
      login: 'NewUser1',
      password: 'Password123456',
      age: 20
    };
    const expected = [
      {
        login: 'NewUser1',
        password: 'Password123456',
        age: 20,
        is_deleted: false
      }
    ];
    jest.spyOn(User, 'create').mockResolvedValue(payload);
    jest.spyOn(User, 'findAll').mockResolvedValue(expected as any);

    const token = generateAccessToken('test');
    const res = await request(app)
      .post('/users/create')
      .send(payload)
      .set('Authorization', `bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(expected);
  });
});

describe('/users/search/:login', () => {
  const login = 'User';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    app.close();
  });

  it('should return status code 401 when auth token is not provided', async () => {
    await setupPassport();
    const res = await request(app)
      .get(`/users/search/${login}`);
    const expected = 'Error: No auth token';

    expect(res.statusCode).toBe(401);
    expect(res.body.error[0].message).toEqual(expected);
  });

  it('should return status code 403 when auth token is malformed', async () => {
    await setupPassport();
    const token = 'abc';
    const res = await request(app)
      .get(`/users/search/${login}`)
      .set('Authorization', `bearer ${token}`);
    const expected = 'JsonWebTokenError: jwt malformed';

    expect(res.statusCode).toBe(403);
    expect(res.body.error[0].message).toEqual(expected);
  });

  it('should return status code 403 when auth token has invalid signature', async () => {
    await setupPassport();
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik1heCIsImlhdCI6MTYzOTE3ODg5MCwiZXhwIjoxNjM5MTgwNjkwfQ.-C-4mfhAiLuo3I9TBUaAwEQ97FQFmTPpwVoDWZd74df';
    const res = await request(app)
      .get(`/users/search/${login}`)
      .set('Authorization', `bearer ${token}`);
    const expected = 'JsonWebTokenError: invalid signature';

    expect(res.statusCode).toBe(403);
    expect(res.body.error[0].message).toEqual(expected);
  });

  it('should return user when correct auth token is provided and no query params are provided', async () => {
    await setupPassport();

    const expected = [
      {
        id: '1',
        login: 'test',
        password: 'testpw',
        age: 20,
        is_deleted: false
      }
    ];
    jest.spyOn(User, 'findAll').mockResolvedValue(expected as any);

    const token = generateAccessToken('test');
    const res = await request(app)
      .get(`/users/search/${login}`)
      .set('Authorization', `bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(expected);
  });

  it('should return user when correct auth token is provided and all query params are provided', async () => {
    await setupPassport();

    const limit = '10';
    const order = 'desc';
    const expected = [
      {
        id: '1',
        login: 'test',
        password: 'testpw',
        age: 20,
        is_deleted: false
      }
    ];
    jest.spyOn(User, 'findAll').mockResolvedValue(expected as any);

    const token = generateAccessToken('test');
    const res = await request(app)
      .get(`/users/search/${login}`)
      .query({ limit, order })
      .set('Authorization', `bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(expected);
  });
});
