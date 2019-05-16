const rp = require('request-promise');
const util = require('util');

class OpendotaApi {
  constructor(params) {
    if (params !== undefined && params.enablelogging !== undefined) {
      this.enableLogging = params.enablelogging;
    } else {
      this.enableLogging = true;
    }
  }

  async heroes(params) {
    var url = util.format(
      'https://api.opendota.com/api/players/%s/heroes?date=%s&limit=%s&significant=1&having=%s',
      params.playerId,
      params.playedForLastDays,
      params.limit,
      params.minGamesOnHero,
    );

    return await this._loggedRequest(url);
  }

  async winLose(params) {
    var url = util.format(
      'https://api.opendota.com/api/players/%s/wl?limit=%s',
      params.playerId,
      params.limit,
    );

    return await this._loggedRequest(url);
  }

  async recentMatches(params) {
    var url = util.format(
      'https://api.opendota.com/api/players/%s/recentMatches?limit=%s',
      params.playerId,
      params.limit,
    );

    return await this._loggedRequest(url);
  }

  async player(id) {
    var url = util.format('https://api.opendota.com/api/players/' + id);

    return await this._loggedRequest(url);
  }

  async _loggedRequest(url) {
    this.enableLogging && util.log('Requesting: ' + url);

    return await rp(url, {json: true}).then(m => {
      this.enableLogging && util.log('Success request: ' + url);
      return m;
    });
  }
}

module.exports = OpendotaApi;
