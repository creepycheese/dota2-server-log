const FetchPlayerStat = require('../src/FetchPlayerStat');

describe('FetchPlayerStat', () => {
  let playerId = '910673288';

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

  afterEach(() => {
    jest.resetAllMocks();
  });

  beforeEach(() => {
    apiStub.heroes.mockResolvedValue(heroesResponse);
    apiStub.recentMatches.mockResolvedValue(recentMatchesResponse);
    apiStub.player.mockResolvedValue(playerResponse);
    apiStub.winLose.mockResolvedValue(winLoseResponse);
  });

  describe('with default deps', () => {
    const limit = '20';
    const hasStreakGames = 3;
    const forLastDays = '100';

    it('requests api recentMatches', async () => {
      await FetchPlayerStat(playerId, {
        limit: limit,
        hasStreakGames: hasStreakGames,
        forLastDays: forLastDays,
        api: apiStub,
        statConstructor: statStub,
      });

      expect(apiStub.recentMatches).toBeCalledWith(playerId, {limit: limit});
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
     statStub.mockResolvedValue(42);
      var result = await FetchPlayerStat(playerId, {
        limit: limit,
        hasStreakGames: hasStreakGames,
        forLastDays: forLastDays,
        api: apiStub,
        statConstructor: statStub,
      });

     expect(result).toBe(42);
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
