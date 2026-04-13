import { TskvLogger } from "./tskvLogger.service";


describe('TskvLogger', () => {
  let logger: TskvLogger;

  beforeEach(() => {
    logger = new TskvLogger();
  });

  it('should log in TSKV format', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation();

    logger.log('test message', 'TestContext');

    expect(spy).toHaveBeenCalledTimes(1);

    const output = spy.mock.calls[0][0];

    expect(output).toContain('tskv');
    expect(output).toContain('level=log');
    expect(output).toContain('msg=test message');
    expect(output).toContain('context=TestContext');

    spy.mockRestore();
  });
});