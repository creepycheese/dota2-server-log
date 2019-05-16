_ = require('lodash');

class PlayerStat {
  constructor(params) {
    this.player = params.player;
    this.win = params.win;
    this.lose = params.lose;
    this.heroes = params.heroes;

    this.winrate = _.round(this.win / this.lose, 4) * 100;
    this.nickname = this.player.profile.personaname;
  }

topHeroes(count) {
  var count = count ? count : 3

  return this.heroes.slice(0, count);
  }
}

module.exports = PlayerStat;
