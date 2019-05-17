const OpendotaApi = require('./opendotaApi');

class GameActivityTag {
  constructor(name, condition) {
    this.name = name;
    this.condition = condition;
  }

  static predefinedTags() {
    return [
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
