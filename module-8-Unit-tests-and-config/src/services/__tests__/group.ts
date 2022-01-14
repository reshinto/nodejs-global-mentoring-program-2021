import Group from '../../models/group';
import { addGroup, deleteGroup, getGroup, getGroups, updateGroup } from '../group';

describe('addGroup', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return all groups', async () => {
    const payload = {
      name: 'NewGroup1',
      permissions: ['READ', 'WRITE', 'DELETE']
    };
    const expected = [payload];
    jest.spyOn(Group, 'create').mockResolvedValue(payload);
    jest.spyOn(Group, 'findAll').mockResolvedValue(expected as any);
    const result = await addGroup(payload as any);

    expect(result).toEqual(expected);
  });

  it('should return error when create group failed', async () => {
    const error = new Error();
    const payload = {
      name: 'NewGroup1',
      permissions: ['READ', 'WRITE', 'DELETE']
    };
    const expected = [payload];
    jest.spyOn(Group, 'create').mockRejectedValue(error);
    jest.spyOn(Group, 'findAll').mockResolvedValue(expected as any);
    const result = await addGroup(payload as any);

    expect(result).toEqual([error]);
  });

  it('should return error when get all groups failed', async () => {
    const error = new Error();
    const payload = {
      name: 'NewGroup1',
      permissions: ['READ', 'WRITE', 'DELETE']
    };
    jest.spyOn(Group, 'create').mockResolvedValue(payload);
    jest.spyOn(Group, 'findAll').mockRejectedValue(error);
    const result = await addGroup(payload as any);

    expect(result).toEqual([error]);
  });
});

describe('getGroups', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return all groups', async () => {
    const expected = [{
      name: 'NewGroup1',
      permissions: ['READ', 'WRITE', 'DELETE']
    }];
    jest.spyOn(Group, 'findAll').mockResolvedValue(expected as any);
    const result = await getGroups();

    expect(result).toEqual(expected);
  });

  it('should return [] when groups is empty', async () => {
    const expected = null;
    jest.spyOn(Group, 'findAll').mockResolvedValue(expected as any);
    const result = await getGroups();

    expect(result).toEqual([]);
  });

  it('should return error when get all groups failed', async () => {
    const error = new Error();
    jest.spyOn(Group, 'findAll').mockRejectedValue(error);
    const result = await getGroups();

    expect(result).toEqual([error]);
  });
});

describe('getGroup', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return a group', async () => {
    const id = '1';
    const expected = {
      id: '1',
      name: 'NewGroup1',
      permissions: ['READ', 'WRITE', 'DELETE']
    };
    jest.spyOn(Group, 'findOne').mockResolvedValue(expected as any);
    const result = await getGroup(id);

    expect(result).toEqual(expected);
  });

  it('should return {} when groups is empty', async () => {
    const id = '1';
    const expected = null;
    jest.spyOn(Group, 'findOne').mockResolvedValue(expected as any);
    const result = await getGroup(id);

    expect(result).toEqual({});
  });

  it('should return error when get group failed', async () => {
    const id = '1';
    const error = new Error();
    jest.spyOn(Group, 'findOne').mockRejectedValue(error);
    const result = await getGroup(id);

    expect(result).toEqual(error);
  });
});

describe('updateGroup', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return updated group', async () => {
    const id = '1';
    const payload = {
      id: '1',
      name: 'NewGroup1',
      permissions: ['READ', 'WRITE', 'DELETE']
    };
    const expected = payload;
    jest.spyOn(Group, 'update').mockResolvedValue(payload as any);
    jest.spyOn(Group, 'findOne').mockResolvedValue(expected as any);
    const result = await updateGroup(id, payload as any);

    expect(result).toEqual(expected);
  });

  it('should return error when update group failed', async () => {
    const error = new Error();
    const id = '1';
    const payload = {
      id: '1',
      name: 'NewGroup1',
      permissions: ['READ', 'WRITE', 'DELETE']
    };
    const expected = [payload];
    jest.spyOn(Group, 'update').mockRejectedValue(error);
    jest.spyOn(Group, 'findOne').mockResolvedValue(expected as any);
    const result = await updateGroup(id, payload as any);

    expect(result).toEqual(error);
  });

  it('should return error when get group failed', async () => {
    const error = new Error();
    const id = '1';
    const payload = {
      id: '1',
      name: 'NewGroup1',
      permissions: ['READ', 'WRITE', 'DELETE']
    };
    jest.spyOn(Group, 'update').mockResolvedValue(payload as any);
    jest.spyOn(Group, 'findOne').mockRejectedValue(error);
    const result = await updateGroup(id, payload as any);

    expect(result).toEqual(error);
  });
});

describe('deleteGroup', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return all non deleted groups', async () => {
    const id = '1';
    const expected = [{
      id: '1',
      name: 'NewGroup1',
      permissions: ['READ', 'WRITE', 'DELETE']
    }];
    jest.spyOn(Group, 'destroy').mockResolvedValue({} as any);
    jest.spyOn(Group, 'findAll').mockResolvedValue(expected as any);
    const result = await deleteGroup(id);

    expect(result).toEqual(expected);
  });

  it('should return [] when deleted groups is empty', async () => {
    const id = '1';
    const expected = null;
    jest.spyOn(Group, 'destroy').mockResolvedValue({} as any);
    jest.spyOn(Group, 'findAll').mockResolvedValue(expected as any);
    const result = await deleteGroup(id);

    expect(result).toEqual([]);
  });

  it('should return error when delete group failed', async () => {
    const error = new Error();
    const id = '1';
    const expected = {
      id: '1',
      name: 'NewGroup1',
      permissions: ['READ', 'WRITE', 'DELETE']
    };
    jest.spyOn(Group, 'destroy').mockRejectedValue(error);
    jest.spyOn(Group, 'findOne').mockResolvedValue(expected as any);
    const result = await deleteGroup(id);

    expect(result).toEqual([error]);
  });

  it('should return error when get groups failed', async () => {
    const error = new Error();
    const id = '1';
    jest.spyOn(Group, 'destroy').mockResolvedValue({} as any);
    jest.spyOn(Group, 'findAll').mockRejectedValue(error);
    const result = await deleteGroup(id);

    expect(result).toEqual([error]);
  });
});
