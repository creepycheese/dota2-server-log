const PlayerStat = require('../src/playerStat.js');

describe('PlayerStat', () => {
  let stat = new PlayerStat({
    win: 42,
    lose: 55,
    player: {profile: {personaname: 'name'}},
  });
  describe('winrate', () => {
    it('calculates winrate', () => {
      expect(stat.winrate).toStrictEqual(76.36);
    });
  });
  describe('nickname', () => {
    it('delegates to personaname', () => {
      expect(stat.nickname).toBe('name');
    });
  });
  it('ok', () => {});
});
