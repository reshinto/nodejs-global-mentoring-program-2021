import passport from 'passport';

import { checkJwtToken, generateAccessToken } from '../jwt';

describe('generateAccessToken', () => {
  it('should return a string value', () => {
    const username = 'test';
    const result = generateAccessToken(username);
    const expected = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';

    expect(result).toContain(expected);
  });
});

describe('checkJwtToken', () => {
  it('check if jwt token is valid', async () => {
    jest.spyOn(passport, 'authenticate').mockImplementation(() =>
      jest.fn((authType, error, callback: any) => () =>  callback('This is an error', 'error'))
    );

    const mReq = {};
    const mRes = {};
    const mNext = jest.fn();
    await checkJwtToken(mReq as any, mRes as any, mNext);
    expect(passport.authenticate).toHaveBeenCalledTimes(1);
  });
});
