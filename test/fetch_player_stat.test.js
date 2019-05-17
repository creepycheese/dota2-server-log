const FetchPlayerStat = require('../src/FetchPlayerStat').FetchPlayerStat;
let OpendotaApi = require('../src/opendotaApi.js');
const GameActivityTag = require('../src/gameActivityTag');

jest.mock('../src/opendotaApi');

describe('FetchPlayerStat', () => {
  let playerId = '910673288';

  describe('with default deps', () => {
    it('calls OpendotaApi', () => {
      FetchPlayerStat(123);
      const mockOpendotaApi = OpendotaApi.mock.instances[0];

      expect(OpendotaApi).toHaveBeenCalledTimes(1);
      expect(mockOpendotaApi.recentMatches).toHaveBeenCalledTimes(1);
    });
  });

  describe('with injected deps', () => {
    const limit = '20';
    const hasStreakGames = 3;
    const forLastDays = '100';

    var heroesResponse = 'heroes';
    var playerResponse = 'player';
    var winLoseResponse = {win: 22, lose: 32};
    var recentMatchesResponse = ['1', '2'];

    var apiStub = {
      heroes: jest.fn(),
      winLose: jest.fn(),
      recentMatches: jest.fn(),
      player: jest.fn(),
    };

    var statStub = jest.fn();
    var addTagsMock = jest.fn();
    var mockedInstanceOfStat = {
      win: 1,
      lose: 1,
      player: {profile: {account_id: 42}},
      winrate: 90,
      hasWinstreak: () => {},
      hasLosestreak: () => {},
      addTags: addTagsMock,
    };

    afterEach(() => {
      jest.resetAllMocks();
    });

    beforeEach(() => {
      OpendotaApi.mockImplementation(() => {
        return {
          winLose: jest.fn().mockResolvedValue({win: 2, lose: 2}),
        };
      });
      statStub.mockImplementation(() => mockedInstanceOfStat);
      apiStub.heroes.mockResolvedValue(heroesResponse);
      apiStub.recentMatches.mockResolvedValue(recentMatchesResponse);
      apiStub.player.mockResolvedValue(playerResponse);
      apiStub.winLose.mockResolvedValue(winLoseResponse);
    });

    it('requests api recentMatches', async () => {
      await FetchPlayerStat(playerId, {
        limit: limit,
        hasStreakGames: hasStreakGames,
        forLastDays: forLastDays,
        api: apiStub,
        statConstructor: statStub,
      });

      expect(apiStub.recentMatches).toBeCalledWith({
        playerId: playerId,
        limit: limit,
      });
    });

    it('requests api player', async () => {
      await FetchPlayerStat(playerId, {
        limit: limit,
        hasStreakGames: hasStreakGames,
        forLastDays: forLastDays,
        api: apiStub,
        statConstructor: statStub,
      });

      expect(apiStub.player).toBeCalledWith(playerId);
    });

    it('requests api winLose', async () => {
      await FetchPlayerStat(playerId, {
        limit: limit,
        hasStreakGames: hasStreakGames,
        forLastDays: forLastDays,
        api: apiStub,
        statConstructor: statStub,
      });

      expect(apiStub.heroes).toBeCalledWith({playerId: playerId, limit: limit});
    });

    it('calls Stat function', async () => {
      await FetchPlayerStat(playerId, {
        limit: limit,
        hasStreakGames: hasStreakGames,
        forLastDays: forLastDays,
        api: apiStub,
        statConstructor: statStub,
      });

      expect(statStub).toBeCalledWith({
        recentMatches: recentMatchesResponse,
        heroes: heroesResponse,
        player: playerResponse,
        win: winLoseResponse.win,
        lose: winLoseResponse.lose,
      });
    });

    it('returns result of PlayerStatFunction', async () => {
      statStub.mockReturnValue(mockedInstanceOfStat);
      var result = await FetchPlayerStat(playerId, {
        limit: limit,
        hasStreakGames: hasStreakGames,
        forLastDays: forLastDays,
        api: apiStub,
        statConstructor: statStub,
      });

      expect(result).toBe(mockedInstanceOfStat);
    });

    it('identifies tags', async () => {
      var testTagMock = jest.fn();
      var failCond = p => {
        return false;
      };

      var successTag = new GameActivityTag('Test', testTagMock);
      var failTag = new GameActivityTag('Test', failCond);
      var tags = [successTag, failTag];
      testTagMock.mockReturnValue(true);

      await FetchPlayerStat(playerId, {
        limit: limit,
        hasStreakGames: hasStreakGames,
        forLastDays: forLastDays,
        api: apiStub,
        statConstructor: statStub,
        tags: tags,
      });

      expect(testTagMock).toBeCalledWith(mockedInstanceOfStat);
      expect(statStub).toBeCalledWith(
        expect.objectContaining({lose: expect.any(Number)}),
      );
      expect(addTagsMock).toBeCalledWith(successTag);
      expect(addTagsMock).toBeCalledTimes(1);
    });

    it('requests api winLose', async () => {
      await FetchPlayerStat(playerId, {
        limit: limit,
        hasStreakGames: hasStreakGames,
        forLastDays: forLastDays,
        api: apiStub,
        statConstructor: statStub,
      });

      expect(apiStub.winLose).toBeCalledWith({
        playerId: playerId,
        limit: limit,
      });
    });
  });
});
