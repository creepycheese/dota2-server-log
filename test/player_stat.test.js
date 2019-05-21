const PlayerStat = require('../src/playerStat.js');

describe('PlayerStat', () => {
  let stat = new PlayerStat({
    win: 42,
    lose: 55,
    player: {profile: {account_id: 42, personaname: 'name'}},
heroes: [{hero_id: 1, games: 3, win: 2}, {hero_id: 2, games: 4, win: 2}, {hero_id: 3, games: 10, win: 4}, {hero_id: 4, games: 5, win: 5 }],
    recentMatches: [
      {kills: 2, deaths: 3, assists: 4, radiant_win: false, player_slot: 130}, //win
      {kills: 2, deaths: 3, assists: 4, radiant_win: true, player_slot: 0}, //win
      {kills: 2, deaths: 2, assists: 4, radiant_win: true, player_slot: 2}, //win
      {kills: 2, deaths: 3, assists: 4, radiant_win: false, player_slot: 2}, //lose
    ],
    tags: [{name: 'valentin'}],
  });

  describe('data()', () => {
    it('returns vanilla JS object representation of all data', () => {
      console.log(stat.data().topHeroes[1])
      expect(stat.data()).toEqual({
        otpHero: null,
        kda: [2,3,4],
        playerId: 42,
        topHeroes: expect.arrayContaining([expect.objectContaining({hero_id: 1, win_rate: 67}), expect.objectContaining({hero_id: 2, win_rate: 50}), expect.objectContaining({hero_id: 3, win_rate: 40})]),
        winrate: 43.3,
        nickname: 'name',
        tags: ['valentin'],
        opendotaUrl: 'https://www.opendota.com/players/42',
      });
    });
  });

  describe('otpHero()', () => {
    let stat = new PlayerStat({
      win: 42,
      lose: 55,
      player: {profile: {account_id: 42, personaname: 'name'}},
      heroes: [{hero_id: 22, games: 4}],
      recentMatches: [
        {radiant_win: false, player_slot: 130}, //win
        {radiant_win: true, player_slot: 0}, //win
        {radiant_win: true, player_slot: 2}, //win
        {radiant_win: false, player_slot: 2}, //lose
        {radiant_win: false, player_slot: 2}, //lose
      ],
      tags: [{name: 'valentin'}],
    });

    it('returns OTP hero, e.g. hero played more than 80% of time', () => {
      expect(stat.otpHero()).toEqual({
        heroStat: {hero_id: 22, games: 4},
        hero: expect.objectContaining({id: 22}),
      });
    });
  });

  describe('addTags([tags])', () => {
    it('adds tags', () => {
      stat.addTags('tag');
      stat.addTags('tag2');
      expect(stat.tags).toEqual(expect.arrayContaining(['tag', 'tag2']));
    });
  });

  describe('winrate', () => {
    it('calculates winrate', () => {
      expect(stat.winrate).toStrictEqual(43.3);
    });
  });

  describe('KDA', () => {
    expect(stat.KDA()).toEqual({kills: 2, deaths: 3, assists: 4});
  });

  describe('topHeroes', () => {
    it('returns top heroes', function() {
      expect(stat.topHeroes(2)).toStrictEqual([expect.objectContaining({hero_id: 1}), expect.objectContaining({hero_id: 2})]);
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
