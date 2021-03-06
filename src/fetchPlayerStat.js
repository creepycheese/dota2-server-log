const util = require('util');
const OpendotaApi = require('./opendotaApi');
const PlayerStat = require('./playerStat');
const GameActivityTag = require('./gameActivityTag');

module.exports = {
  FetchPlayerStat: async function(playerId, params) {
    util.log('Fetching stat for: ' + playerId);
    var params = params || {};
    var api = params.api || new OpendotaApi();
    var playerStatFn = params.statConstructor || PlayerStat;
    var limit = params.limit || 20;
    var date = params.date;
    var tags = params.tags || GameActivityTag.predefinedTags();

    try {
      var recentMatches = await api.recentMatches({
        playerId: playerId,
        limit: limit,
      });
      var winLose = await api.winLose({playerId: playerId, limit: limit});
      var heroes = await api.heroes({playerId: playerId, limit: limit});
      var player = await api.player(playerId);

      var playerStat = new playerStatFn({
        lose: winLose.lose,
        win: winLose.win,
        player: player,
        recentMatches: recentMatches,
        heroes: heroes,
      });

      tags.forEach(async function(tag) {
        if (await tag.condition(playerStat)) playerStat.addTags(tag);
      });
        if(playerStat.otpHero()) playerStat.addTags(new GameActivityTag(playerStat.otpHero().hero.localized_name + ' OTP'))

      return playerStat;
    } catch (e) {
      util.log("error fetching playerId: " + playerId);
      return {playerId: playerId, error: e};
    }
  },
};
