const OpendotaApi = require('./opendotaApi');
const heroes = require('./helpers/heroes');
const _ = require('lodash');

class GameActivityTag {
  constructor(name, condition) {
    this.name = name;
    this.condition = condition;
  }

  static getTopHeroTagById(id) {
    var foundTag = _.find(this.heroesTags(), tag => tag.hero.id == id);
    return foundTag ? foundTag.tag : null;
  }

  static heroesTags() {
    return _.map(heroes, function(hero) {
      return {
        hero: hero,
        tag: new GameActivityTag('Zeus OTP', function(p) {
          var otpHero = _.find(
            p.heroes,
            h => h.games / p.recentMatches.length >= 0.8,
          );

          return otpHero ? true : false;
        }),
      };
    });
  }
  static predefinedTags() {
    return [
      new GameActivityTag('Smurf', function(p) {
        return p.winrate >= 85;
      }),

      new GameActivityTag('Winstreak', function(p) {
        return p.hasWinstreak(3);
      }),

      new GameActivityTag('Losestreak', function(p) {
        return p.hasLosestreak(3);
      }),

      new GameActivityTag('Rusty', async function(p) {
        var api = new OpendotaApi();
        var winLose = await api.winLose({
          date: 14,
          playerId: p.player.profile.account_id,
        });
        var result = winLose.win + winLose.lose <= 3;

        return result;
      }),
    ];
  }

  static getPredefinedTag(name) {
    return GameActivityTag.predefinedTags().find(p => p.name == name);
  }

  isSatisfied(playerStat) {
    return this.condition(playerStat);
  }
}

module.exports = GameActivityTag;
