module.exports = async function(playerId, params) {
  var api = params.api;
  var playerStatFn = params.statConstructor;

  var recentMatches = await api.recentMatches(playerId, {limit: params.limit});
  var winLose = await api.winLose({playerId: playerId, limit: params.limit});
  var heroes = await api.heroes({playerId: playerId, limit: params.limit});
  var player = await api.player(playerId);

  return new playerStatFn({lose: winLose.lose, win: winLose.win, player: player, recentMatches: recentMatches, heroes: heroes});
};
