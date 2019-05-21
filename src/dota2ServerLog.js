const fs = require('fs-reverse');
const readline = require('readline');

class Dota2ServerLog {
  constructor() {
    this.entryRegex = /[0-9]:\[U:1:([0-9]*)\]/g;
  }

  parseLogEntry(entry) {
    var ids = [];
    var steamId = null;
    while (null != (steamId = this.entryRegex.exec(entry))) {
      ids.push(parseInt(steamId[1]));
    }

    return ids.length > 0 ? ids : null;
  }

  async lastMatchSteamIds(filePath) {
    const fileStream = fs(filePath);

    const rlInterface = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    for await (const line of rlInterface) {
      var entry = this.parseLogEntry(line);
      if (entry && this._isValidGameMode(line)) return entry;
    }
  }

  _isValidGameMode(line) {
    var gameModeString = 'DOTA_GAMEMODE';
    return line.indexOf(gameModeString) > -1;
  }
}

module.exports = Dota2ServerLog;
