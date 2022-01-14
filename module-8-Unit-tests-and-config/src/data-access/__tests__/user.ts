import { addToUsersDb, getAutoSuggestUsers, getNonDeletedUser, getNonDeletedUsers, updateUserInDb } from '../user';
import User from '../../models/user';

describe('addToUsersDb', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create new user', async () => {
    const payload = {
      login: 'test',
      password: 'testpw',
      age: 20
    };
    jest.spyOn(User, 'create').mockResolvedValue(payload);
    const result = await addToUsersDb(payload);

    expect(result).toEqual(payload);
  });
});

describe('getNonDeletedUsers', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return all non deleted users', async () => {
    const expected = [
      {
        login: 'test',
        password: 'testpw',
        age: 20,
        is_deleted: false
      }
    ];
    jest.spyOn(User, 'findAll').mockResolvedValue(expected as any);
    const result = await getNonDeletedUsers();

    expect(result).toEqual(expected);
  });
});

describe('getNonDeletedUser', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return all 1 non deleted user', async () => {
    const payload = '1';
    const expected = {
      id: '1',
      login: 'test',
      password: 'testpw',
      age: 20,
      is_deleted: false
    };
    jest.spyOn(User, 'findOne').mockResolvedValue(expected as any);
    const result = await getNonDeletedUser(payload);

    expect(result).toEqual(expected);
  });
});

describe('getAutoSuggestUsers', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return filtered non deleted user', async () => {
    const loginSubString = 'test';
    const expected = [{
      id: '1',
      login: 'test',
      password: 'testpw',
      age: 20,
      is_deleted: false
    }];
    jest.spyOn(User, 'findAll').mockResolvedValue(expected as any);
    const result = await getAutoSuggestUsers(loginSubString);

    expect(result).toEqual(expected);
  });

  it('should return filtered non deleted user with limit', async () => {
    const loginSubString = 'test';
    const limit = 1;
    const expected = [{
      id: '1',
      login: 'test',
      password: 'testpw',
      age: 20,
      is_deleted: false
    }];
    jest.spyOn(User, 'findAll').mockResolvedValue(expected as any);
    const result = await getAutoSuggestUsers(loginSubString, limit);

    expect(result).toEqual(expected);
  });
});

describe('updateUserInDb', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should update user', async () => {
    const id = '1';
    const payload = {
      id: '1',
      login: 'test',
      password: 'testpw',
      age: 20
    };
    jest.spyOn(User, 'update').mockResolvedValue(payload as any);
    const result = await updateUserInDb(id, payload);

    expect(result).toEqual(payload);
  });
});
