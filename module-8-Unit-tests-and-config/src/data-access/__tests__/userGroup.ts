import UserGroup from '../../models/userGroup';
import { addUsersToGroupInDb, getUserGroupInDb } from '../userGroup';

describe('getUserGroupInDb', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return user group', async () => {
    const expected = {
      id: '788e5966-d061-40fa-ac3d-bed446d68576',
      user_id: '7f4c416f-9842-43dd-935f-8c697f448046',
      group_id: '92c3f76f-43ed-44f8-90db-3dbb7cd6762e',
      created_at: '2021-12-28T13:38:36.415Z',
      updated_at: '2021-12-28T13:38:36.415Z'
    };
    jest.spyOn(UserGroup, 'findAll').mockResolvedValue(expected as any);
    const result = await getUserGroupInDb();

    expect(result).toEqual(expected);
  });
});

describe('addUsersToGroupInDb', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return user group', async () => {
    const user_id = '7f4c416f-9842-43dd-935f-8c697f448046';
    const group_id = '92c3f76f-43ed-44f8-90db-3dbb7cd6762e';
    const expected = [{ user_id, group_id }];
    jest.spyOn(UserGroup, 'bulkCreate').mockResolvedValue(expected as any);
    const result = await addUsersToGroupInDb(group_id, [user_id]);

    expect(result).toEqual(expected);
  });
});
