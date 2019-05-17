let OpendotaApi = require('../src/opendotaApi.js');
const nock = require('nock');

function stubOpendotaGetRequest(path, response, status) {
  var status = status ? status : 200;
  nock('https://api.opendota.com/api')
    .get(path)
    .reply(status, response);
}

describe('OpendotaApi', () => {
  let opendota = new OpendotaApi();

  describe('heroes', () => {
    let requestUrl =
      '/players/910673288/heroes?date=100&limit=20&having=2&significant=1';
    let response = require('./response_stubs/heroes_stat.js');

    it('requests heroes stat from opendota with given params', async () => {
      expect.assertions(1);
      stubOpendotaGetRequest(requestUrl, response);

      var data = await opendota.heroes({
        playerId: 910673288,
        date: 100,
        limit: 20,
        having: 2,
      });

      expect(data).toStrictEqual(response);
    });
  });

  describe('recentMathes', () => {
    let requestUrl = '/players/910673288/recentMatches?limit=5';
    let response = require('./response_stubs/recent_matches.js');
    it('fetches opendota recentMatches', async () => {
      expect.assertions(1);
      stubOpendotaGetRequest(requestUrl, response);

      var data = await opendota.recentMatches({playerId: 910673288, limit: 5});
      expect(data).toStrictEqual(response);
    });
  });

  describe('win_loss', () => {
    let requestUrl = '/players/910673288/wl?limit=5&date=100';
    let response = {win: 5, lose: 5};

    it('fetches wl opendota endpoint', async () => {
      expect.assertions(1);
      stubOpendotaGetRequest(requestUrl, response);

      var data = await opendota.winLose({
        limit: 5,
        date: 100,
        playerId: 910673288,
      });
      expect(data).toStrictEqual(response);
    });

    describe('when some parameters(dage) are omitted', () => {
      let requestUrl = '/players/910673288/wl?limit=5';
      let response = {win: 5, lose: 5};

      it('fetches wl opendota endpoint', async () => {
        expect.assertions(1);
        stubOpendotaGetRequest(requestUrl, response);

        var data = await opendota.winLose({playerId: 910673288, limit: 5});
        expect(data).toStrictEqual(response);
      });
    });
  });

  describe('players', () => {
    let requestUrl = '/players/910673288';
    let response = require('./response_stubs/player_stub.js');

    it('requests player data with given params', async () => {
      expect.assertions(1);
      stubOpendotaGetRequest(requestUrl, response);

      var id = 910673288;
      var data = await opendota.player(id);

      expect(data).toStrictEqual(response);
    });
  });
});
