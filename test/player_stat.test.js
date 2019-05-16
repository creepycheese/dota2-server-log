const PlayerStat = require('../src/playerStat.js');

describe('PlayerStat', () => {
  let stat = new PlayerStat({
    win: 42,
    lose: 55,
    player: {profile: {personaname: 'name'}},
    heroes: [{hero_id: 1}, {hero_id: 2}, {hero_id: 3}, {hero_id: 4}],
    recentMatches: [
      {radiant_win: false, player_slot: 130}, //win
      {radiant_win: true, player_slot: 0}, //win
      {radiant_win: true, player_slot: 2}, //win
      {radiant_win: false, player_slot: 2}, //lose
    ],
  });

  describe('winrate', () => {
    it('calculates winrate', () => {
      expect(stat.winrate).toStrictEqual(76.36);
    });
  });

  describe('topHeroes', () => {
    it('returns top heroes', function() {
      expect(stat.topHeroes(2)).toStrictEqual([{hero_id: 1}, {hero_id: 2}]);
    });
  });

  describe('hasWinstreak(lastGames)', () => {
    it('returns true when last player won in last lastGames', () => {
      var lastGames = 3;
      expect(stat.hasWinstreak(lastGames)).toBe(true);
    });

    it('returns false when last player did not win in last lastGames', () => {
      var lastGames = 4;
      expect(stat.hasWinstreak(lastGames)).toBe(false);
    });
  });

  describe('hasLosestreak(lastGames)', () => {
    let stat = new PlayerStat({
      win: 42,
      lose: 55,
      player: {profile: {personaname: 'name'}},
      heroes: [{hero_id: 1}, {hero_id: 2}, {hero_id: 3}, {hero_id: 4}],
      recentMatches: [
        {radiant_win: true, player_slot: 130}, //lose
        {radiant_win: false, player_slot: 0}, //lose
        {radiant_win: false, player_slot: 2}, //lose
        {radiant_win: true, player_slot: 2}, //win
      ],
    });

    it('returns true when last player lost in last lastGames', () => {
      var lastGames = 3;
      expect(stat.hasLosestreak(lastGames)).toBe(true);
    });

    it('returns false when last player did not lost in last lastGames', () => {
      var lastGames = 4;
      expect(stat.hasLosestreak(lastGames)).toBe(false);
    });
  });

  describe('nickname', () => {
    it('delegates to personaname', () => {
      expect(stat.nickname).toBe('name');
    });
  });
});
