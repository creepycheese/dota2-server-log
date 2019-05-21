"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

_ = require('lodash');

var heroHelper = require('./helpers/hero');

var PlayerStat =
/*#__PURE__*/
function () {
  function PlayerStat(params) {
    var _this = this;

    _classCallCheck(this, PlayerStat);

    this.player = params.player;
    this.win = params.win;
    this.lose = params.lose;
    this.heroes = params.heroes;
    this.winrate = _.round(this.win / (this.lose + this.win), 4) * 100;
    this.nickname = this.player.profile.personaname;
    this.recentMatches = params.recentMatches;

    this._didLose = function (p) {
      return !_this._didWin(p);
    };

    this.tags = params.tags || [];
    this.account_id = this.player.profile.account_id;
  }

  _createClass(PlayerStat, [{
    key: "KDA",
    value: function KDA() {
      if (this.kda) return this.kda;
      this.kda = {
        kills: _.round(_.sumBy(this.recentMatches, 'kills') / this.recentMatches.length),
        deaths: _.round(_.sumBy(this.recentMatches, 'deaths') / this.recentMatches.length),
        assists: _.round(_.sumBy(this.recentMatches, 'assists') / this.recentMatches.length)
      };
      return this.kda;
    }
  }, {
    key: "data",
    value: function data() {
      return {
        kda: [this.KDA().kills, this.KDA().deaths, this.KDA().assists],
        playerId: this.account_id,
        topHeroes: this.topHeroes(3),
        winrate: this.winrate,
        nickname: this.nickname,
        otpHero: this.otpHero(),
        tags: _.map(this.tags, 'name'),
        opendotaUrl: 'https://www.opendota.com/players/' + this.account_id
      };
    }
  }, {
    key: "otpHero",
    value: function otpHero() {
      var _this2 = this;

      var otpHero = _.find(this.heroes, function (h) {
        return h.games / _this2.recentMatches.length >= 0.8;
      }); // return otpHero ? true : false;


      var isOtp = this.heroes[0].games / this.recentMatches.length >= 0.8;
      return isOtp ? {
        heroStat: this.heroes[0],
        hero: heroHelper.heroById(this.heroes[0].hero_id)
      } : null;
    }
  }, {
    key: "topHeroes",
    value: function topHeroes(count) {
      var count = count ? count : 3;
      var top = this.heroes.slice(0, count);
      return _.map(top, function (hero) {
        _.set(hero, 'hero_id', parseInt(hero.hero_id));

        return _.set(hero, 'win_rate', _.round(hero.win / hero.games, 2) * 100);
      });
    }
  }, {
    key: "hasWinstreak",
    value: function hasWinstreak(lastGames) {
      if (this.recentMatches == [] || this.recentMatches == null || lastGames == 0) return false;
      var recent = this.recentMatches.slice(0, lastGames);
      return _.every(recent, this._didWin);
    }
  }, {
    key: "hasLosestreak",
    value: function hasLosestreak(lastGames) {
      if (this.recentMatches == [] || this.recentMatches == null || lastGames == 0) return false;
      var recent = this.recentMatches.slice(0, lastGames);
      return _.every(recent, this._didLose);
    }
  }, {
    key: "addTags",
    value: function addTags(tag) {
      this.tags.push(tag);
    }
  }, {
    key: "_didWin",
    value: function _didWin(playerMatch) {
      return playerMatch.player_slot < 100 && playerMatch.radiant_win || playerMatch.player_slot > 100 && !playerMatch.radiant_win;
    }
  }]);

  return PlayerStat;
}();

module.exports = PlayerStat;