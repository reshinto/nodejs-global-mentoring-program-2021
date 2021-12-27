import { sequelize } from '../../loaders/postgres';
import UserGroup from '../../models/userGroup';
import { addUsersToGroup, getUserGroup } from '../userGroup';

describe('getuserGroup', () => {
  it('should return user group', async () => {
    const expected = [{
      id: '788e5966-d061-40fa-ac3d-bed446d68576',
      user_id: '7f4c416f-9842-43dd-935f-8c697f448046',
      group_id: '92c3f76f-43ed-44f8-90db-3dbb7cd6762e',
      created_at: '2021-12-28T13:38:36.415Z',
      updated_at: '2021-12-28T13:38:36.415Z'
    }];
    jest.spyOn(UserGroup, 'findAll').mockResolvedValue(expected as any);

    const result = await getUserGroup();

    expect(result).toEqual(expected);
  });

  it('should return [] when user group is empty', async () => {
    const expected = null;
    jest.spyOn(UserGroup, 'findAll').mockResolvedValue(expected as any);

    const result = await getUserGroup();

    expect(result).toEqual([]);
  });

  it('should return error when get user group failed', async () => {
    const error = new Error();
    jest.spyOn(UserGroup, 'findAll').mockRejectedValue(error);

    const result = await getUserGroup();

    expect(result).toEqual([error]);
  });
});

describe('addUsersToGroup', () => {
  it('should return user group', async () => {
    const user_id = '7f4c416f-9842-43dd-935f-8c697f448046';
    const group_id = '92c3f76f-43ed-44f8-90db-3dbb7cd6762e';
    const expected = [{
      id: '788e5966-d061-40fa-ac3d-bed446d68576',
      user_id: '7f4c416f-9842-43dd-935f-8c697f448046',
      group_id: '92c3f76f-43ed-44f8-90db-3dbb7cd6762e',
      created_at: '2021-12-28T13:38:36.415Z',
      updated_at: '2021-12-28T13:38:36.415Z'
    }];
    jest.spyOn(sequelize, 'transaction').mockResolvedValue(expected as any);

    const result = await addUsersToGroup(group_id, [user_id]);

    expect(result).toEqual(expected);
  });

  it('should return error when add user group failed', async () => {
    const error = new Error();
    const user_id = '7f4c416f-9842-43dd-935f-8c697f448046';
    const group_id = '92c3f76f-43ed-44f8-90db-3dbb7cd6762e';

    jest.spyOn(sequelize, 'transaction').mockRejectedValue(error);

    const result = await addUsersToGroup(group_id, [user_id]);

    expect(result).toEqual([error]);
  });
});
