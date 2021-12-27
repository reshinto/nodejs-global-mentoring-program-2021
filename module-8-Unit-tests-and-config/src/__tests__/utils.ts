import Joi from 'joi';
import {
  customError,
  Error,
  errorHandler,
  errorResponse,
  failSafeHandler,
  handleUncaughtException,
  handleUnhandledRejection,
  inspect,
  logError,
  logResponseTime,
  setMinAndMaxLength,
  setRegex,
  validateSchema
} from '../utils';
import { ONE_UPPERCASE } from '../constants';
import logger from '../config/logger';

describe('errorResponse', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return error', () => {
    const schemaError = [
      {
        message: 'error',
        path: ['path'],
        type: 'type',
        context: {}
      }
    ];
    const expected = {
      status: 'failed',
      errors: [
        {
          path: ['path'],
          message: 'error'
        }
      ]
    };

    expect(errorResponse(schemaError, new Error())).toEqual(expected);
  });
});

describe('validateSchema', () => {
  const schema = Joi.object().keys({ id: Joi.string().required() });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return error', () => {
    const validationResults = { error: { details: [{ message: 'validation error', path: ['path'], type: 'string' }], isJoi: true } };
    const validateSpy = jest.spyOn(schema, 'validate').mockReturnValueOnce(validationResults as any);
    const mReq = { body: { id: 'test' } };
    const mRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const mNext = jest.fn();
    const expected = { 'errors': [{ 'message': 'validation error', 'path': ['path'] }], 'status': 'failed' };
    validateSchema(schema)(mReq as any, mRes as any, mNext);
    expect(validateSpy).toBeCalledWith({ id: 'test' }, {
      abortEarly: true,
      allowUnknown: false
    });
    expect(mRes.status).toBeCalledWith(400);
    expect(mRes.json).toBeCalledWith(expected);
  });

  it('should pass the validation and call api', () => {
    const validationResults = { error: undefined };
    const validateSpy = jest.spyOn(schema, 'validate').mockReturnValueOnce(validationResults as any);
    const mReq = { body: { id: 'test' } };
    const mRes = {};
    const mNext = jest.fn();
    validateSchema(schema)(mReq as any, mRes as any, mNext);
    expect(validateSpy).toBeCalledWith({ id: 'test' }, {
      abortEarly: true,
      allowUnknown: false
    });
    expect(mNext).toBeCalled();
  });
});

describe('setMinAndMaxLength', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return string when both inputs are numbers', () => {
    const expected = '.{1,2}';

    expect(setMinAndMaxLength(1, 2)).toBe(expected);
  });

  it('should return string when fist input is a number and the second is a string', () => {
    const expected = '.{1,2}';

    expect(setMinAndMaxLength(1, '2')).toBe(expected);
  });

  it('should return string when fist input is a number and the second is undefined', () => {
    const expected = '.{1,}';

    expect(setMinAndMaxLength(1)).toBe(expected);
  });
});

describe('setRegex', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return bare minimum regex', () => {
    const expected = /^$/;

    expect(setRegex()).toEqual(expected);
  });

  it('should return with only minimum regex', () => {
    const expected = /^.{1,}$/;

    expect(setRegex(1)).toEqual(expected);
  });

  it('should not return with only maximum regex', () => {
    const expected = /^.{,2}$/;

    expect(setRegex(undefined, 2)).not.toEqual(expected);
  });

  it('should return with minimum and maximum regex', () => {
    const expected = /^.{1,2}$/;

    expect(setRegex(1, 2)).toEqual(expected);
  });

  it('should return with minimum, maximum, and one uppercase regex', () => {
    const expected = /^(?=.*?[A-Z]).{1,2}$/;

    expect(setRegex(1, 2, ONE_UPPERCASE)).toEqual(expected);
  });

  it('should return with minimum, and one uppercase regex', () => {
    const expected = /^(?=.*?[A-Z]).{1,}$/;

    expect(setRegex(1, undefined, ONE_UPPERCASE)).toEqual(expected);
  });

  it('should return one uppercase regex', () => {
    const expected = /^(?=.*?[A-Z])$/;

    expect(setRegex(undefined, undefined, ONE_UPPERCASE)).toEqual(expected);
  });

  it('should only return one uppercase regex', () => {
    const expected = /^(?=.*?[A-Z])$/;

    expect(setRegex(undefined, 2, ONE_UPPERCASE)).toEqual(expected);
  });
});

describe('inspect', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return errors as an array', () => {
    const error = new Error();

    expect(inspect(error).length).toBeGreaterThan(1);
  });

  it('should not return any errors', () => {
    const error = {};

    expect(inspect(error).length).toBe(0);
  });
});

describe('failSafeHandler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call next', () => {
    const mReq = {};
    const mRes = {};
    const mNext = jest.fn();
    const err: Error = new Error('Not Found');
    err.status = 500;

    failSafeHandler(mReq as any, mRes as any, mNext);

    expect(mNext).toBeCalledTimes(1);
    expect(mNext).toBeCalledWith(err);
  });
});

describe('errorHandler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return default error values', () => {
    const err = new Error();
    const mReq = {};
    const mRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const mNext = jest.fn();
    errorHandler(err, mReq as any, mRes as any, mNext);
    const expected = { 'error': [{ 'message': 'Something went wrong' }] };

    expect(mRes.status).toBeCalledWith(500);
    expect(mRes.json).toBeCalledWith(expected);
  });

  it('should return custom error values', () => {
    const err: Error = new Error('test');
    err.status = 400;
    const mReq = {};
    const mRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const mNext = jest.fn();
    errorHandler(err, mReq as any, mRes as any, mNext);
    const expected = { 'error': [{ 'message': 'test' }] };

    expect(mRes.status).toBeCalledWith(400);
    expect(mRes.json).toBeCalledWith(expected);
  });
});

describe('logError', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call logger error when args is available', () => {
    const err = new Error();
    const message = 'test';
    const logErrorSpy = jest.spyOn(logger, 'error');

    logError(err, message, 'test2');
    expect(logErrorSpy).toBeCalledTimes(1);
  });

  it('should call logger error when args is undefined', () => {
    const err = new Error();
    const message = 'test';
    const logErrorSpy = jest.spyOn(logger, 'error');

    logError(err, message);
    expect(logErrorSpy).toBeCalledTimes(1);
  });
});

describe('handleUnhandledRejection', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call logger error', () => {
    const logErrorSpy = jest.spyOn(logger, 'error');

    handleUnhandledRejection('test', undefined);
    expect(logErrorSpy).toBeCalledTimes(1);
  });
});

describe('handleUncaughtException', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call logger error', () => {
    const realProcess = process;
    const exitMock = jest.fn();
    const err = new Error();
    const logErrorSpy = jest.spyOn(logger, 'error');
    global.process = { ...realProcess, exit: exitMock } as any;

    handleUncaughtException(err);
    expect(logErrorSpy).toBeCalledTimes(1);
    expect(exitMock).toHaveBeenCalledWith(1);
    global.process = realProcess;
  });
});

describe('logResponseTime', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should calculate response time when event finish is triggered', () => {
    const mReq = {};
    const mRes = { on: jest.fn() };
    const mNext = jest.fn();

    mRes.on.mockImplementation((event, cb) => {
      if (event === 'finish') {
        // eslint-disable-next-line callback-return
        cb();
      }
    });

    logResponseTime(mReq as any, mRes as any, mNext);

    expect(mRes.on).toBeCalledWith('finish', expect.any(Function));

    expect(mNext).toBeCalledTimes(1);
  });
});

describe('customError', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return custom error object', () => {
    const mRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    customError(mRes as any, 'test', 400);

    expect(mRes.status).toBeCalledWith(400);
    expect(mRes.json).toBeCalledWith({
      status: 'failed',
      errors: [{ 'message': 'test' }]
    });
  });
});
