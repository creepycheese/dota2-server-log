let OpendotaApi = require('../src/opendotaApi.js');
const nock = require('nock');

describe('OpendotaApi', () => {
  let opendota = new OpendotaApi();

  describe('heroes', () => {
    let requestUrl =
      '/910673288/heroes?date=100&limit=20&significant=1&having=2';
    let response = require('./response_stubs/heroes_stat.js');

    it('requests heroes stat from opendota with given params', async () => {
      expect.assertions(1);
      nock('https://api.opendota.com/api/players')
        .get(requestUrl)
        .reply(200, response);

      var data = await opendota.heroes({
        playerId: 910673288,
        playedForLastDays: 100,
        limit: 20,
        minGamesOnHero: 2,
      });

      expect(data).toStrictEqual(response);
    });
  });

  describe('players', () => {
    let requestUrl = '/players/910673288';
    let response = require('./response_stubs/player_stub.js');

    it('requests player data with given params', async () => {
      expect.assertions(1);
      nock('https://api.opendota.com/api')
        .get(requestUrl)
        .reply(200, response);

      var id = 910673288;
      var data = await opendota.player(id);

      expect(data).toStrictEqual(response);
    });
  });
});