import User from '../../models/user';
import { addUser, checkUser, getSuggestedUsers, getUser, getUsers, softDeleteUser, updateUser } from '../user';

describe('addUser', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return all non deleted users', async () => {
    const payload = {
      login: 'test',
      password: 'testpw',
      age: 20
    };
    const expected = [
      {
        login: 'test',
        password: 'testpw',
        age: 20,
        is_deleted: false
      }
    ];
    jest.spyOn(User, 'create').mockResolvedValue(payload);
    jest.spyOn(User, 'findAll').mockResolvedValue(expected as any);
    const result = await addUser(payload);

    expect(result).toEqual(expected);
  });

  it('should return error when user creation failed', async () => {
    const error = new Error();
    const payload = {
      login: 'test',
      password: 'testpw',
      age: 20
    };
    const expected = [
      {
        login: 'test',
        password: 'testpw',
        age: 20,
        is_deleted: false
      }
    ];
    jest.spyOn(User, 'create').mockRejectedValue(error);
    jest.spyOn(User, 'findAll').mockResolvedValue(expected as any);
    const result = await addUser(payload);

    expect(result).toEqual([error]);
  });

  it('should return error when get all non deleted users failed', async () => {
    const error = new Error();
    const payload = {
      login: 'test',
      password: 'testpw',
      age: 20
    };
    jest.spyOn(User, 'create').mockResolvedValue(payload);
    jest.spyOn(User, 'findAll').mockRejectedValue(error);
    const result = await addUser(payload);

    expect(result).toEqual([error]);
  });
});

describe('getUsers', () => {
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
    const result = await getUsers();

    expect(result).toEqual(expected);
  });

  it('should return [] when users are empty', async () => {
    const expected = null;
    jest.spyOn(User, 'findAll').mockResolvedValue(expected as any);
    const result = await getUsers();

    expect(result).toEqual([]);
  });

  it('should return error when get all non deleted users failed', async () => {
    const error = new Error();
    jest.spyOn(User, 'findAll').mockRejectedValue(error);
    const result = await getUsers();

    expect(result).toEqual([error]);
  });
});

describe('getUser', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return a non deleted user', async () => {
    const id = '1';
    const expected = {
      login: 'test',
      password: 'testpw',
      age: 20,
      is_deleted: false
    };
    jest.spyOn(User, 'findOne').mockResolvedValue(expected as any);
    const result = await getUser(id);

    expect(result).toEqual(expected);
  });

  it('should return {} when user is not found', async () => {
    const id = '1';
    const expected = null;
    jest.spyOn(User, 'findOne').mockResolvedValue(expected as any);
    const result = await getUser(id);

    expect(result).toEqual({});
  });

  it('should return error when get a non deleted user failed', async () => {
    const id = '1';
    const error = new Error();
    jest.spyOn(User, 'findOne').mockRejectedValue(error);
    const result = await getUser(id);

    expect(result).toEqual(error);
  });
});

describe('updateUser', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return a non deleted user', async () => {
    const id = '1';
    const payload = {
      id: '1',
      login: 'test',
      password: 'testpw',
      age: 20
    };
    const expected = {
      id: '1',
      login: 'test',
      password: 'testpw',
      age: 20,
      is_deleted: false
    };
    jest.spyOn(User, 'update').mockResolvedValue(payload as any);
    jest.spyOn(User, 'findOne').mockResolvedValue(expected as any);
    const result = await updateUser(id, payload);

    expect(result).toEqual(expected);
  });

  it('should return error when update user failed', async () => {
    const error = new Error();
    const id = '1';
    const payload = {
      id: '1',
      login: 'test',
      password: 'testpw',
      age: 20
    };
    const expected = {
      id: '1',
      login: 'test',
      password: 'testpw',
      age: 20,
      is_deleted: false
    };
    jest.spyOn(User, 'update').mockRejectedValue(error);
    jest.spyOn(User, 'findOne').mockResolvedValue(expected as any);
    const result = await updateUser(id, payload);

    expect(result).toEqual(error);
  });

  it('should return error when get non deleted user failed', async () => {
    const error = new Error();
    const id = '1';
    const payload = {
      id: '1',
      login: 'test',
      password: 'testpw',
      age: 20
    };
    jest.spyOn(User, 'update').mockResolvedValue(payload as any);
    jest.spyOn(User, 'findOne').mockRejectedValue(error);
    const result = await updateUser(id, payload);

    expect(result).toEqual(error);
  });
});

describe('softDeleteUser', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return all non deleted users', async () => {
    const id = '1';
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
    const result = await softDeleteUser(id);

    expect(result).toEqual(expected2);
  });

  it('should return [] when non deleted users is empty', async () => {
    const id = '1';
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
    const expected2 = null;

    jest.spyOn(User, 'findOne').mockResolvedValue(expected1 as any);
    jest.spyOn(User, 'update').mockResolvedValue(payload as any);
    jest.spyOn(User, 'findAll').mockResolvedValue(expected2 as any);
    const result = await softDeleteUser(id);

    expect(result).toEqual([]);
  });

  it('should return error when get non deleted user failed', async () => {
    const error = new Error();
    const id = '1';
    const payload = {
      id: '1',
      login: 'test',
      password: 'testpw',
      age: 20,
      is_deleted: true
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
    jest.spyOn(User, 'findOne').mockRejectedValue(error);
    jest.spyOn(User, 'update').mockResolvedValue(payload as any);
    jest.spyOn(User, 'findAll').mockResolvedValue(expected2 as any);
    const result = await softDeleteUser(id);

    expect(result).toEqual([error]);
  });

  it('should return error when update user failed', async () => {
    const error = new Error();
    const id = '1';
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
    jest.spyOn(User, 'update').mockRejectedValue(error);
    jest.spyOn(User, 'findAll').mockResolvedValue(expected2 as any);
    const result = await softDeleteUser(id);

    expect(result).toEqual([error]);
  });

  it('should return error when get non deleted user failed', async () => {
    const error = new Error();
    const id = '1';
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
    jest.spyOn(User, 'findOne').mockResolvedValue(expected1 as any);
    jest.spyOn(User, 'update').mockResolvedValue(payload as any);
    jest.spyOn(User, 'findAll').mockRejectedValue(error);
    const result = await softDeleteUser(id);

    expect(result).toEqual([error]);
  });
});

describe('getSuggestedUsers', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return filtered non deleted users when all parameters are filled', async () => {
    const login = 'test';
    const limit = '10';
    const orderBy = 'testorder';
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
    const result = await getSuggestedUsers(login, limit, orderBy);

    expect(result).toEqual(expected);
  });

  it('should return filtered non deleted users when limit is empty', async () => {
    const login = 'test';
    const limit = '';
    const orderBy = 'testorder';
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
    const result = await getSuggestedUsers(login, limit, orderBy);

    expect(result).toEqual(expected);
  });

  it('should return filtered non deleted users when limit and orderBy is empty', async () => {
    const login = 'test';
    const limit = '';
    const orderBy = '';
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
    const result = await getSuggestedUsers(login, limit, orderBy);

    expect(result).toEqual(expected);
  });

  it('should return [] when non deleted users are empty', async () => {
    const login = 'test';
    const limit = '10';
    const orderBy = 'testorder';
    const expected = null;
    jest.spyOn(User, 'findAll').mockResolvedValue(expected as any);
    const result = await getSuggestedUsers(login, limit, orderBy);

    expect(result).toEqual([]);
  });

  it('should return error when get all non deleted users failed', async () => {
    const error = new Error();
    const login = 'test';
    const limit = '10';
    const orderBy = 'testorder';
    jest.spyOn(User, 'findAll').mockRejectedValue(error);
    const result = await getSuggestedUsers(login, limit, orderBy);

    expect(result).toEqual([error]);
  });
});

describe('checkUser', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return filtered non deleted user', async () => {
    const payload = {
      username: 'test',
      password: 'testpw'
    };
    const expected = [
      {
        login: 'test',
        password: 'testpw',
        age: 20,
        is_deleted: false
      }
    ];
    jest.spyOn(User, 'findAll').mockResolvedValue(expected as any);
    const result = await checkUser(payload);

    expect(result).toEqual(expected);
  });

  it('should return [] when user does not match payload', async () => {
    const payload = {
      username: 'test2',
      password: 'testpw2'
    };
    const expected = [
      {
        login: 'test',
        password: 'testpw',
        age: 20,
        is_deleted: false
      }
    ];
    jest.spyOn(User, 'findAll').mockResolvedValue(expected as any);
    const result = await checkUser(payload);

    expect(result).toEqual([]);
  });

  it('should return error when get all non deleted users failed', async () => {
    const error = new Error();
    const payload = {
      username: 'test',
      password: 'testpw'
    };
    jest.spyOn(User, 'findAll').mockRejectedValue(error);
    const result = await checkUser(payload);

    expect(result).toEqual([error]);
  });
});
