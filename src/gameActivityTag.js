class GameActivityTag {
  constructor(name, condition) {
    this.name = name;
    this.condition = condition;
  }

  isSatisfied(playerStat) {
    this.condition(playerStat);
  }
}

module.exports = GameActivityTag;
