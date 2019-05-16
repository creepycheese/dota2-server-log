# Dota 2 Server Log Parser

Dota 2 server log parser used to retrieve matchmaking stats for players in match
inspired by [DotaLass](https://github.com/heartofimpetus/DotaLass)

Parses `server_log.txt` in dota folder and retrieves info about players.

## Install

`npm install --save dota-2-server-log`

## Usage

If you only want to retrieve parsed log data
```javascript
const Dota2ServerLog = require('dota2-server-log').Dota2ServerLog;
const logParser = new Dota2ServerLog();
```
### Opendota API

```javascript
var api = require('dota2-server-log').OpendotaApi;

(async () => {
  console.log(await api.player(910673288))
})();

// logs
{ tracked_until: null,
  solo_competitive_rank: null,
  competitive_rank: null,
  mmr_estimate: { estimate: 3423 },
  profile:
   { account_id: 910673288,
     personaname: 'я сдыхал , меня лутали',
     name: null,
     plus: false,
     cheese: 0,
     steamid: '76561198870939016',
     avatar:
      'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/59/59f9b55824f8a21fc069f787d13ecd7596653bd5.jpg',
     avatarmedium:
      'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/59/59f9b55824f8a21fc069f787d13ecd7596653bd5_medium.jpg',
     avatarfull:
      'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/59/59f9b55824f8a21fc069f787d13ecd7596653bd5_full.jpg',
     profileurl: 'https://steamcommunity.com/profiles/76561198870939016/',
     last_login: null,
     loccountrycode: null,
     is_contributor: false },
  rank_tier: 66,
  leaderboard_rank: null }
```