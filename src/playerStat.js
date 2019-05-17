_ = require('lodash');

class PlayerStat {
  constructor(params) {
    this.player = params.player;
    this.win = params.win;
    this.lose = params.lose;
    this.heroes = params.heroes;

    this.winrate = _.round(this.win / this.lose, 4) * 100;
    this.nickname = this.player.profile.personaname;
    this.recentMatches = params.recentMatches;
    this._didLose = p => !this._didWin(p);
    this.tags = params.tags || [];
  }

  data() {
    return {topHeroes: this.topHeroes(3), winrate: this.winrate, nickname: this.nickname, tags: _.map(this.tags, 'name')};
  }

  topHeroes(count) {
    var count = count ? count : 3;

    return this.heroes.slice(0, count);
  }

  hasWinstreak(lastGames) {
    if (
      this.recentMatches == [] ||
      this.recentMatches == null ||
      lastGames == 0
    )
      return false;

    var recent = this.recentMatches.slice(0, lastGames);
    return _.every(recent, this._didWin);
  }

  hasLosestreak(lastGames) {
    if (
      this.recentMatches == [] ||
      this.recentMatches == null ||
      lastGames == 0
    )
      return false;

    var recent = this.recentMatches.slice(0, lastGames);
    return _.every(recent, this._didLose);
  }

  addTags(tag) {
    this.tags.push(tag);
  }

  _didWin(playerMatch) {
    return (
      (playerMatch.player_slot < 100 && playerMatch.radiant_win) ||
      (playerMatch.player_slot > 100 && !playerMatch.radiant_win)
    );
  }
}

module.exports = PlayerStat;
