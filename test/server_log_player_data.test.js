const ServerLogPlayerData = require('../src/serverLogPlayerData.js');
const Dota2ServerLog = require('../src/dota2ServerLog.js');

jest.mock('../src/dota2ServerLog');

describe('ServerLogPlayerData(logPath)', () => {
  const lastMatchSteamIdsMock = jest.fn();

  it('uses server log to receive players ids', function() {
    ServerLogPlayerData();
    expect(Dota2ServerLog).toBeCalledTimes(1);
  });

  it('requests lastMatchSteamIds from given logFile', async () => {
    Dota2ServerLog.mockImplementation(() => {
      return {lastMatchSteamIds: lastMatchSteamIdsMock};
    });

    await ServerLogPlayerData('file');

    expect(lastMatchSteamIdsMock).toBeCalledWith('file');
  });

  var ids = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  var fetcherMock = jest.fn().mockResolvedValue(42);

  it('fetches player data for all players in log', async () => {
    lastMatchSteamIdsMock.mockResolvedValueOnce(ids);
    var result = await ServerLogPlayerData('file', fetcherMock);
    expect(fetcherMock).toBeCalledTimes(ids.length);
    expect(await result[0]).toBe(42);
    expect(await Promise.all(result).then(r => r)).toStrictEqual(_.fill(Array(10), 42));
  });
});
