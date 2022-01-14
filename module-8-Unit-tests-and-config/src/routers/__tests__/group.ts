import request from 'supertest';
import app from '../../index';
import setupPassport from '../../loaders/passport-setup';
import Group from '../../models/group';
import { generateAccessToken } from '../../services/jwt';

describe('/groups', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    app.close();
  });

  it('should return status code 401 when auth token is not provided', async () => {
    await setupPassport();
    const res = await request(app)
      .get('/groups');
    const expected = 'Error: No auth token';

    expect(res.statusCode).toBe(401);
    expect(res.body.error[0].message).toEqual(expected);
  });

  it('should return status code 403 when auth token is malformed', async () => {
    await setupPassport();
    const token = 'abc';
    const res = await request(app)
      .get('/groups')
      .set('Authorization', `bearer ${token}`);
    const expected = 'JsonWebTokenError: jwt malformed';

    expect(res.statusCode).toBe(403);
    expect(res.body.error[0].message).toEqual(expected);
  });

  it('should return status code 403 when auth token has invalid signature', async () => {
    await setupPassport();
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik1heCIsImlhdCI6MTYzOTE3ODg5MCwiZXhwIjoxNjM5MTgwNjkwfQ.-C-4mfhAiLuo3I9TBUaAwEQ97FQFmTPpwVoDWZd74df';
    const res = await request(app)
      .get('/groups')
      .set('Authorization', `bearer ${token}`);
    const expected = 'JsonWebTokenError: invalid signature';

    expect(res.statusCode).toBe(403);
    expect(res.body.error[0].message).toEqual(expected);
  });

  it('should return groups when correct auth token is provided', async () => {
    await setupPassport();

    const expected = [{
      name: 'NewGroup1',
      permissions: ['READ', 'WRITE', 'DELETE']
    }];
    jest.spyOn(Group, 'findAll').mockResolvedValue(expected as any);

    const token = generateAccessToken('test');
    const res = await request(app)
      .get('/groups')
      .set('Authorization', `bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(expected);
  });
});

describe('/groups/:id', () => {
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
      .get(`/groups/${id}`);
    const expected = 'Error: No auth token';

    expect(res.statusCode).toBe(401);
    expect(res.body.error[0].message).toEqual(expected);
  });

  it('should return status code 403 when auth token is malformed', async () => {
    await setupPassport();
    const token = 'abc';
    const res = await request(app)
      .get(`/groups/${id}`)
      .set('Authorization', `bearer ${token}`);
    const expected = 'JsonWebTokenError: jwt malformed';

    expect(res.statusCode).toBe(403);
    expect(res.body.error[0].message).toEqual(expected);
  });

  it('should return status code 403 when auth token has invalid signature', async () => {
    await setupPassport();
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik1heCIsImlhdCI6MTYzOTE3ODg5MCwiZXhwIjoxNjM5MTgwNjkwfQ.-C-4mfhAiLuo3I9TBUaAwEQ97FQFmTPpwVoDWZd74df';
    const res = await request(app)
      .get(`/groups/${id}`)
      .set('Authorization', `bearer ${token}`);
    const expected = 'JsonWebTokenError: invalid signature';

    expect(res.statusCode).toBe(403);
    expect(res.body.error[0].message).toEqual(expected);
  });

  it('should return group when correct auth token is provided', async () => {
    await setupPassport();

    const expected = {
      id: '1',
      name: 'NewGroup1',
      permissions: ['READ', 'WRITE', 'DELETE']
    };
    jest.spyOn(Group, 'findOne').mockResolvedValue(expected as any);

    const token = generateAccessToken('test');
    const res = await request(app)
      .get(`/groups/${id}`)
      .set('Authorization', `bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(expected);
  });
});

describe('/groups/:id', () => {
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
      .delete(`/groups/${id}`);
    const expected = 'Error: No auth token';

    expect(res.statusCode).toBe(401);
    expect(res.body.error[0].message).toEqual(expected);
  });

  it('should return status code 403 when auth token is malformed', async () => {
    await setupPassport();
    const token = 'abc';
    const res = await request(app)
      .delete(`/groups/${id}`)
      .set('Authorization', `bearer ${token}`);
    const expected = 'JsonWebTokenError: jwt malformed';

    expect(res.statusCode).toBe(403);
    expect(res.body.error[0].message).toEqual(expected);
  });

  it('should return status code 403 when auth token has invalid signature', async () => {
    await setupPassport();
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik1heCIsImlhdCI6MTYzOTE3ODg5MCwiZXhwIjoxNjM5MTgwNjkwfQ.-C-4mfhAiLuo3I9TBUaAwEQ97FQFmTPpwVoDWZd74df';
    const res = await request(app)
      .delete(`/groups/${id}`)
      .set('Authorization', `bearer ${token}`);
    const expected = 'JsonWebTokenError: invalid signature';

    expect(res.statusCode).toBe(403);
    expect(res.body.error[0].message).toEqual(expected);
  });

  it('should destroy and return existing groups when correct auth token is provided', async () => {
    await setupPassport();

    const expected: never[] = [];
    jest.spyOn(Group, 'destroy').mockResolvedValue({} as any);
    jest.spyOn(Group, 'findAll').mockResolvedValue([] as any);

    const token = generateAccessToken('test');
    const res = await request(app)
      .delete(`/groups/${id}`)
      .set('Authorization', `bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(expected as any);
  });
});

describe('/groups/:id', () => {
  const id = '1';
  const payload = {
    name: 'NewGroup1',
    permissions: ['READ', 'WRITE', 'DELETE']
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    app.close();
  });

  it('should return status code 401 when auth token is not provided', async () => {
    await setupPassport();

    const res = await request(app)
      .put(`/groups/${id}`)
      .send(payload);
    const expected = 'Error: No auth token';

    expect(res.statusCode).toBe(401);
    expect(res.body.error[0].message).toEqual(expected);
  });

  it('should return status code 403 when auth token is malformed', async () => {
    await setupPassport();
    const token = 'abc';
    const res = await request(app)
      .put(`/groups/${id}`)
      .send(payload)
      .set('Authorization', `bearer ${token}`);
    const expected = 'JsonWebTokenError: jwt malformed';

    expect(res.statusCode).toBe(403);
    expect(res.body.error[0].message).toEqual(expected);
  });

  it('should return status code 403 when auth token has invalid signature', async () => {
    await setupPassport();
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik1heCIsImlhdCI6MTYzOTE3ODg5MCwiZXhwIjoxNjM5MTgwNjkwfQ.-C-4mfhAiLuo3I9TBUaAwEQ97FQFmTPpwVoDWZd74df';
    const res = await request(app)
      .put(`/groups/${id}`)
      .send(payload)
      .set('Authorization', `bearer ${token}`);
    const expected = 'JsonWebTokenError: invalid signature';

    expect(res.statusCode).toBe(403);
    expect(res.body.error[0].message).toEqual(expected);
  });

  it('should update and return group when correct auth token is provided', async () => {
    await setupPassport();

    const expected = payload;
    jest.spyOn(Group, 'update').mockResolvedValue(payload as any);
    jest.spyOn(Group, 'findOne').mockResolvedValue(expected as any);

    const token = generateAccessToken('test');
    const res = await request(app)
      .put(`/groups/${id}`)
      .send(payload)
      .set('Authorization', `bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(expected);
  });
});

describe('/groups/:id', () => {
  const payload = {
    name: 'NewGroup1',
    permissions: ['READ', 'WRITE', 'DELETE']
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    app.close();
  });

  it('should return status code 401 when auth token is not provided', async () => {
    await setupPassport();

    const res = await request(app)
      .post('/groups/create')
      .send(payload);
    const expected = 'Error: No auth token';

    expect(res.statusCode).toBe(401);
    expect(res.body.error[0].message).toEqual(expected);
  });

  it('should return status code 403 when auth token is malformed', async () => {
    await setupPassport();
    const token = 'abc';
    const res = await request(app)
      .post('/groups/create')
      .send(payload)
      .set('Authorization', `bearer ${token}`);
    const expected = 'JsonWebTokenError: jwt malformed';

    expect(res.statusCode).toBe(403);
    expect(res.body.error[0].message).toEqual(expected);
  });

  it('should return status code 403 when auth token has invalid signature', async () => {
    await setupPassport();
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik1heCIsImlhdCI6MTYzOTE3ODg5MCwiZXhwIjoxNjM5MTgwNjkwfQ.-C-4mfhAiLuo3I9TBUaAwEQ97FQFmTPpwVoDWZd74df';
    const res = await request(app)
      .post('/groups/create')
      .send(payload)
      .set('Authorization', `bearer ${token}`);
    const expected = 'JsonWebTokenError: invalid signature';

    expect(res.statusCode).toBe(403);
    expect(res.body.error[0].message).toEqual(expected);
  });

  it('should update and return group when correct auth token is provided', async () => {
    await setupPassport();

    const expected = payload;
    jest.spyOn(Group, 'create').mockResolvedValue(payload);
    jest.spyOn(Group, 'findAll').mockResolvedValue(expected as any);

    const token = generateAccessToken('test');
    const res = await request(app)
      .post('/groups/create')
      .send(payload)
      .set('Authorization', `bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(expected);
  });
});
