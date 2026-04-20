import { JsonLogger } from './jsonLogger.sevice';

describe('JsonLogger', () => {
  let logger: JsonLogger;

  beforeEach(() => {
    logger = new JsonLogger();
  });

  it('should output valid JSON', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation();

    logger.log('hello', 'Ctx');

    const output = spy.mock.calls[0][0];
    const parsed = JSON.parse(output);

    expect(parsed.level).toBe('log');
    expect(parsed.message).toBe('hello');
    expect(parsed.context).toBe('Ctx');

    spy.mockRestore();
  });
});
