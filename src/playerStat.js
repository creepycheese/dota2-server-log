_ = require('lodash');
var heroHelper = require('./helpers/hero');

class PlayerStat {
  constructor(params) {
    this.player = params.player;
    this.win = params.win;
    this.lose = params.lose;
    this.heroes = params.heroes;

    this.winrate = _.round(this.win / (this.lose + this.win), 4) * 100;
    this.nickname = this.player.profile.personaname;
    this.recentMatches = params.recentMatches;
    this._didLose = p => !this._didWin(p);
    this.tags = params.tags || [];
    this.account_id = this.player.profile.account_id;
  }

  KDA() {
    if (this.kda) return this.kda;
    this.kda = {
      kills: _.round(
        _.sumBy(this.recentMatches, 'kills') / this.recentMatches.length,
      ),
      deaths: _.round(
        _.sumBy(this.recentMatches, 'deaths') / this.recentMatches.length,
      ),
      assists: _.round(
        _.sumBy(this.recentMatches, 'assists') / this.recentMatches.length,
      ),
    };
    return this.kda;
  }

  data() {
    return {
      kda: [this.KDA().kills, this.KDA().deaths, this.KDA().assists],
      playerId: this.account_id,
      topHeroes: this.topHeroes(3),
      winrate: this.winrate,
      nickname: this.nickname,
      otpHero: this.otpHero(),
      tags: _.map(this.tags, 'name'),
      opendotaUrl: 'https://www.opendota.com/players/' + this.account_id,
    };
  }

  otpHero() {
    var otpHero = _.find(
      this.heroes,
      h => h.games / this.recentMatches.length >= 0.8,
    );

    // return otpHero ? true : false;
    var isOtp = this.heroes[0].games / this.recentMatches.length >= 0.8;
    return isOtp
      ? {
          heroStat: this.heroes[0],
          hero: heroHelper.heroById(this.heroes[0].hero_id),
        }
      : null;
  }

  topHeroes(count) {
    var count = count ? count : 3;
    var top = this.heroes.slice(0, count);

    return _.map(top, hero => {
      _.set(hero, 'hero_id', parseInt(hero.hero_id));
      console.log(hero.games);
      return _.set(hero, 'win_rate', _.round(hero.win / hero.games, 2) * 100);
    });
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
