const PlayerStat = require('../src/playerStat.js');

describe('PlayerStat', () => {
  let stat = new PlayerStat({
    win: 42,
    lose: 55,
    player: {profile: {personaname: 'name'}},
    heroes: [{hero_id: 1}, {hero_id: 2}, {hero_id: 3}, {hero_id: 4}],
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
  describe('nickname', () => {
    it('delegates to personaname', () => {
      expect(stat.nickname).toBe('name');
    });
  });
});
