const util = require('util');
const OpendotaApi = require('./opendotaApi');
const PlayerStat = require('./playerStat');

module.exports = {
  FetchPlayerStat: async function(playerId, params) {
    util.log('Fetching stat for: ' + playerId);
    var params = params || {};
    var api = params.api || new OpendotaApi();
    var playerStatFn = params.statConstructor || PlayerStat;
    var limit = params.limit || 20;

    var recentMatches = await api.recentMatches({
      playerId: playerId,
      limit: limit,
    });
    var winLose = await api.winLose({playerId: playerId, limit: limit});
    var heroes = await api.heroes({playerId: playerId, limit: limit});
    var player = await api.player(playerId);

    return new playerStatFn({
      lose: winLose.lose,
      win: winLose.win,
      player: player,
      recentMatches: recentMatches,
      heroes: heroes,
    });
  },
};
