const Dota2ServerLog = require('./dota2ServerLog');
const FetchPlayerStat = require('./fetchPlayerStat').FetchPlayerStat;
var util = require('util');

module.exports = async function(logPath, fetcher = FetchPlayerStat) {
  var logParser = new Dota2ServerLog();
  var ids = await logParser.lastMatchSteamIds(logPath);
  util.log('Fetching data for playerIds: [%s]', ids);
  var allData = _.map(ids, async function(id) {
    try {
       util.log('Fetching statistics for playerId: %s', id);
      var result = await fetcher(id);
      util.log('SUCCESS Fetching statistics for playerId: %s', id);
      return result;
    } catch (e) {
      util.log('FAILED to fetch statistics for playerId: %s\n Error: %s', id, e);
      return {error: e};
    }
  });

  return allData;
};
