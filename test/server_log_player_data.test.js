const ServerLogPlayerData = require('../src/serverLogPlayerData.js');
const Dota2ServerLog = require('../src/dota2ServerLog.js');
const _ = require('lodash');

jest.mock('../src/dota2ServerLog');

describe('ServerLogPlayerData(logPath)', () => {
  const lastMatchSteamIdsMock = jest.fn();
  Dota2ServerLog.mockImplementation(() => {
    return {lastMatchSteamIds: lastMatchSteamIdsMock};
  });

  it('uses server log to receive players ids', function() {
    ServerLogPlayerData();
    expect(Dota2ServerLog).toBeCalledTimes(1);
  });

  it('requests lastMatchSteamIds from given logFile', async () => {
    await ServerLogPlayerData('file');

    expect(lastMatchSteamIdsMock).toBeCalledWith('file');
  });

  describe('when all requests are resolved', () => {
    var fetcherMock = jest.fn().mockResolvedValue(42);
    var ids = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    lastMatchSteamIdsMock.mockResolvedValue(ids);

    it('fetches player data for all players in log', async () => {
      var result = await ServerLogPlayerData('file', fetcherMock);
      expect(fetcherMock).toBeCalledTimes(ids.length);
      expect(await result[0]).toBe(42);
      expect(await Promise.all(result).then(r => r)).toStrictEqual(
        _.fill(Array(10), 42),
      );
    });
  });

  describe('when some requests are failed', () => {
    var failIds = [2, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    var fetcherMock = jest.fn().mockRejectedValueOnce(22).mockResolvedValue(42);
    lastMatchSteamIdsMock.mockClear();

    it('fetches player data for all players in log except failed', async () => {
      lastMatchSteamIdsMock.mockResolvedValueOnce(failIds);
      var result = await ServerLogPlayerData('file', fetcherMock);
      await expect(result[0]).resolves.toEqual({error: 22});
      expect(await Promise.all(result).then(r => r)).toStrictEqual([
        {error: 22},
        42,
        42,
        42,
        42,
        42,
        42,
        42,
        42,
        42,
      ]);
    });
  });
});
