const rp = require('request-promise');
const util = require('util');
const _ = require('lodash');

class OpendotaApi {
  constructor(params) {
    this.opendotaPlayersUrl = 'https://api.opendota.com/api/players/';
    if (params !== undefined && params.enablelogging !== undefined) {
      this.enableLogging = params.enablelogging;
    } else {
      this.enableLogging = true;
    }
  }

  async heroes(params) {
    return await this._loggedRequest(
      this._constructPlayersRequestUrl(params.playerId, '/heroes', _.assign(params, {significant: 1})),
    );
  }

  async winLose(params) {
    return await this._loggedRequest(
      this._constructPlayersRequestUrl(params.playerId, '/wl', params),
    );
  }

  async recentMatches(params) {
    return await this._loggedRequest(
      this._constructPlayersRequestUrl(
        params.playerId,
        '/recentMatches',
        params,
      ),
    );
  }

  async player(id) {
    var url = util.format('https://api.opendota.com/api/players/' + id);

    return await this._loggedRequest(url);
  }

  _constructPlayersRequestUrl(playerId, path, params) {
    var url = new URL(playerId + path, this.opendotaPlayersUrl);
    params = _.omitBy(_.omit(params, ['playerId']), _.isUndefined);
    _.each(params, (k, v) => url.searchParams.append(v, k));

    return url.href;
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
