import request from 'supertest';
import app from '../../index';
import setupPassport from '../../loaders/passport-setup';
import { sequelize } from '../../loaders/postgres';
import UserGroup from '../../models/userGroup';
import { generateAccessToken } from '../../services/jwt';

describe('/usergroup', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    app.close();
  });

  it('should return status code 401 when auth token is not provided', async () => {
    await setupPassport();
    const res = await request(app)
      .get('/usergroup');
    const expected = 'Error: No auth token';

    expect(res.statusCode).toBe(401);
    expect(res.body.error[0].message).toEqual(expected);
  });

  it('should return status code 403 when auth token is malformed', async () => {
    await setupPassport();
    const token = 'abc';
    const res = await request(app)
      .get('/usergroup')
      .set('Authorization', `bearer ${token}`);
    const expected = 'JsonWebTokenError: jwt malformed';

    expect(res.statusCode).toBe(403);
    expect(res.body.error[0].message).toEqual(expected);
  });

  it('should return status code 403 when auth token has invalid signature', async () => {
    await setupPassport();
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik1heCIsImlhdCI6MTYzOTE3ODg5MCwiZXhwIjoxNjM5MTgwNjkwfQ.-C-4mfhAiLuo3I9TBUaAwEQ97FQFmTPpwVoDWZd74df';
    const res = await request(app)
      .get('/usergroup')
      .set('Authorization', `bearer ${token}`);
    const expected = 'JsonWebTokenError: invalid signature';

    expect(res.statusCode).toBe(403);
    expect(res.body.error[0].message).toEqual(expected);
  });

  it('should return user group when correct auth token is provided', async () => {
    await setupPassport();
    const expected = [{
      id: '788e5966-d061-40fa-ac3d-bed446d68576',
      user_id: '7f4c416f-9842-43dd-935f-8c697f448046',
      group_id: '92c3f76f-43ed-44f8-90db-3dbb7cd6762e',
      created_at: '2021-12-28T13:38:36.415Z',
      updated_at: '2021-12-28T13:38:36.415Z'
    }];
    jest.spyOn(UserGroup, 'findAll').mockResolvedValue(expected as any);

    const token = generateAccessToken('test');
    const res = await request(app)
      .get('/usergroup')
      .set('Authorization', `bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(expected);
  });
});

describe('/usergroup/addusers', () => {
  const payload = {
    groupId: '92c3f76f-43ed-44f8-90db-3dbb7cd6762e',
    userIds: ['7f4c416f-9842-43dd-935f-8c697f448046']
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
      .post('/usergroup/addusers')
      .send(payload);
    const expected = 'Error: No auth token';

    expect(res.statusCode).toBe(401);
    expect(res.body.error[0].message).toEqual(expected);
  });

  it('should return status code 403 when auth token is malformed', async () => {
    await setupPassport();
    const token = 'abc';
    const res = await request(app)
      .post('/usergroup/addusers')
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
      .post('/usergroup/addusers')
      .set('Authorization', `bearer ${token}`)
      .send(payload);
    const expected = 'JsonWebTokenError: invalid signature';

    expect(res.statusCode).toBe(403);
    expect(res.body.error[0].message).toEqual(expected);
  });

  it('should return status code 400 when correct auth token is provided with missing userIds', async () => {
    const customPayload = {
      groupId: '92c3f76f-43ed-44f8-90db-3dbb7cd6762e'
    };

    await setupPassport();

    const token = generateAccessToken('test');
    const res = await request(app)
      .post('/usergroup/addusers')
      .set('Authorization', `bearer ${token}`)
      .send(customPayload);

    const expected = '"userIds" is required';

    expect(res.statusCode).toBe(400);
    expect(res.body.errors[0].message).toEqual(expected);
  });

  it('should return status code 400 when correct auth token is provided with missing groupId', async () => {
    const customPayload = {
      userIds: ['7f4c416f-9842-43dd-935f-8c697f448046']
    };

    await setupPassport();

    const token = generateAccessToken('test');
    const res = await request(app)
      .post('/usergroup/addusers')
      .set('Authorization', `bearer ${token}`)
      .send(customPayload);

    const expected = '"groupId" is required';

    expect(res.statusCode).toBe(400);
    expect(res.body.errors[0].message).toEqual(expected);
  });

  it('should return user group when correct auth token is provided', async () => {
    await setupPassport();
    const expected = [{
      id: '788e5966-d061-40fa-ac3d-bed446d68576',
      user_id: '7f4c416f-9842-43dd-935f-8c697f448046',
      group_id: '92c3f76f-43ed-44f8-90db-3dbb7cd6762e',
      created_at: '2021-12-28T13:38:36.415Z',
      updated_at: '2021-12-28T13:38:36.415Z'
    }];
    jest.spyOn(sequelize, 'transaction').mockResolvedValue(expected as any);

    const token = generateAccessToken('test');
    const res = await request(app)
      .post('/usergroup/addusers')
      .set('Authorization', `bearer ${token}`)
      .send(payload);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(expected);
  });
});
