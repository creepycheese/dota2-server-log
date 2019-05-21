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

    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    return await this._wrapReadlineEvent(rl);
  }

  _isValidGameMode(line) {
    var gameModeString = 'DOTA_GAMEMODE';
    return line.indexOf(gameModeString) > -1;
  }

  _wrapReadlineEvent(rl) {
    return new Promise((resolve, reject) => {
      rl.on('line', line => {
        var entry = this.parseLogEntry(line);
        if (entry && this._isValidGameMode(line)) return resolve(entry);
      });
    });
  }
}

module.exports = Dota2ServerLog;
