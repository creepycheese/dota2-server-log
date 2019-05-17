const Dota2ServerLog = require('./dota2ServerLog');
const FetchPlayerStat = require('./fetchPlayerStat').FetchPlayerStat;

module.exports = async function(logPath, fetcher=FetchPlayerStat){
  var logParser = new Dota2ServerLog();
  var ids       = await logParser.lastMatchSteamIds(logPath);
  console.log("%s: Fetching data for %s", new Date(), ids);
  var allData   = await _.map(ids, fetcher);

  return allData;
};
