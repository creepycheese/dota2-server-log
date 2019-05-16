const rp = require('request-promise');
const util = require('util');

class OpendotaApi {
  async heroes(params) {
    var url = util.format(
      'https://api.opendota.com/api/players/%s/heroes?date=%s&limit=%s&significant=1&having=%s',
      params.playerId,
      params.playedForLastDays,
      params.limit,
      params.minGamesOnHero,
    );

    return await rp(url, {json: true}).then(m => {
      return m;
    });
  }

async winLose(params) {
var url = util.format('https://api.opendota.com/api/players/' + params.playerId + '/wl?limit=' + params.limit);

    return await rp(url, {json: true}).then(m => {
      return m;
    });
}

  async player(id) {
    var url = util.format('https://api.opendota.com/api/players/' + id);

    return await rp(url, {json: true}).then(m => {
      return m;
    });
  }
}

module.exports = OpendotaApi;
