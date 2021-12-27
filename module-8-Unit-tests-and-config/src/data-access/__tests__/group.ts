import Group from '../../models/group';
import { addToGroupDb, deleteGroupInDb, getGroupByIdInDb, getGroupsInDb, updateGroupInDb } from '../group';

describe('addToGroupDb', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create new group', async () => {
    const payload = {
      name: 'NewGroup1',
      permissions: ['READ', 'WRITE', 'DELETE']
    };
    jest.spyOn(Group, 'create').mockResolvedValue(payload);
    const result = await addToGroupDb(payload as any);

    expect(result).toEqual(payload);
  });
});

describe('getGroupsInDb', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return all groups', async () => {
    const expected = [{
      name: 'NewGroup1',
      permissions: ['READ', 'WRITE', 'DELETE']
    }];
    jest.spyOn(Group, 'findAll').mockResolvedValue(expected as any);
    const result = await getGroupsInDb();

    expect(result).toEqual(expected);
  });
});

describe('getGroupByIdInDb', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return a group', async () => {
    const payload = '1';
    const expected = {
      id: '1',
      name: 'NewGroup1',
      permissions: ['READ', 'WRITE', 'DELETE']
    };
    jest.spyOn(Group, 'findOne').mockResolvedValue(expected as any);
    const result = await getGroupByIdInDb(payload);

    expect(result).toEqual(expected);
  });
});

describe('updateGroupInDb', () => {
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
    jest.spyOn(Group, 'update').mockResolvedValue(payload as any);
    const result = await updateGroupInDb(id, payload as any);

    expect(result).toEqual(payload);
  });
});

describe('deleteGroupInDb', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return an empty group', async () => {
    const payload = '1';
    const expected = {};
    jest.spyOn(Group, 'destroy').mockResolvedValue(expected as any);
    const result = await deleteGroupInDb(payload);

    expect(result).toEqual(expected);
  });
});
