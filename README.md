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

### FetchPlayerStat(playerId, params)
Fetches info about player with given `player_id`

`player_id` - id of player to fetch stat.
`params.limit` - limit of games to fetch stat. Default: `20`

returns instance of `PlayerStat`

```js
var FetchPlayerStat = require('./index.js').FetchPlayerStat;
(async() => {
  console.log(await FetchPlayerStat(910673288).data());
})();

//logs

{ topHeroes:topHeroes:
   [ { hero_id: '27',
       last_played: 1555558497,
       games: 3,
       win: 1,
       with_games: 0,
       with_win: 0,
       against_games: 3,
       against_win: 3 },
     { hero_id: '62',
       last_played: 1555700438,
       games: 3,
       win: 1,
       with_games: 2,
       with_win: 0,
       against_games: 1,
       against_win: 1 },
     { hero_id: '94',
       last_played: 1555601220,
       games: 3,
       win: 1,
       with_games: 0,
       with_win: 0,
       against_games: 0,
       against_win: 0 } ],
   winrate: 66.67,
  nickname: 'nickname',
  tags: [ 'Rusty' ] }
```

### ServerLogPlayerData(logPath)
Fetches data for all playerId entries in latest server log file which is located in `logPath`

```js
var ServerLogPlayerData = require('dota2-server-log').ServerLogPlayerData;
var stat;
var stats;
var allStat;
var successPlayers;
var failedPlayers;
var logPath = './test/server_log.txt'

(async() => {
  allStat = await ServerLogPlayerData(logPath);
  stats = await Promise.all(allStat).then(r => r).catch(e => e);
  // Filter players in case some requests failed to retry later
  successPlayers = _.filter(stats, (s) => !_.hasIn(s, 'error'))
  failedPlayers = _.difference(stats, successPlayers)

  console.log(_.map(successPlayers, s => s.data()));

  console.log("FAILED: ");
  console.log(failedPlayers);
})
```

Outputs: 
```
18 May 12:16:30 - Fetching data for playerIds: [174830156,445444750,27372708,126702952,349919626,412448050,416755244,302693500,910673288,166168942,166168942]
18 May 12:16:30 - Fetching statistics for playerId: 174830156
18 May 12:16:30 - Fetching stat for: 174830156
18 May 12:16:30 - Requesting: https://api.opendota.com/api/players/174830156/recentMatches?limit=20
18 May 12:16:30 - Fetching statistics for playerId: 445444750
18 May 12:16:30 - Fetching stat for: 445444750
18 May 12:16:30 - Requesting: https://api.opendota.com/api/players/445444750/recentMatches?limit=20
18 May 12:16:30 - Fetching statistics for playerId: 27372708
18 May 12:16:30 - Fetching stat for: 27372708
18 May 12:16:30 - Requesting: https://api.opendota.com/api/players/27372708/recentMatches?limit=20
...
18 May 12:16:32 - Success request: https://api.opendota.com/api/players/166168942/wl?date=14
18 May 12:16:32 - Success request: https://api.opendota.com/api/players/174830156/wl?date=14
18 May 12:16:32 - Success request: https://api.opendota.com/api/players/302693500/wl?date=14
```


Logs:
```js
[ { playerId: 174830156,
    topHeroes: [ [Object], [Object], [Object] ],
    winrate: 33.33,
    nickname: 'its over 9000 !',
    tags: [],
    opendotaUrl: 'https://www.opendota.com/players/174830156' },
  { playerId: 445444750,
    topHeroes: [ [Object], [Object], [Object] ],
    winrate: 100,
    nickname: 'Saw',
    tags: [ 'Smurf', 'Losestreak', 'Rusty' ],
    opendotaUrl: 'https://www.opendota.com/players/445444750' },
  { playerId: 27372708,
    topHeroes: [ [Object], [Object], [Object] ],
    winrate: 66.67,
    nickname: 'whatsgoinon',
    tags: [],
    opendotaUrl: 'https://www.opendota.com/players/27372708' },
  { playerId: 126702952,
    topHeroes: [ [Object], [Object], [Object] ],
    winrate: 53.849999999999994,
    nickname: 'DARIDO',
    tags: [],
    opendotaUrl: 'https://www.opendota.com/players/126702952' },
  { playerId: 349919626,
    topHeroes: [ [Object], [Object], [Object] ],
    winrate: 100,
    nickname: '12 Madness',
    tags: [ 'Smurf', 'Losestreak', 'Rusty' ],
    opendotaUrl: 'https://www.opendota.com/players/349919626' },
  { playerId: 412448050,
    topHeroes: [ [Object], [Object], [Object] ],
    winrate: 100,
    nickname: "↓you'r rank down",
    tags: [ 'Smurf', 'Rusty' ],
    opendotaUrl: 'https://www.opendota.com/players/412448050' },
  { playerId: 302693500,
    topHeroes: [ [Object], [Object], [Object] ],
    winrate: 185.71,
    nickname: 'Alice (not coming back soon)',
    tags: [ 'HeroOTP', 'Smurf', 'Losestreak' ],
    opendotaUrl: 'https://www.opendota.com/players/302693500' },
  { playerId: 910673288,
    topHeroes: [ [Object], [Object], [Object] ],
    winrate: 66.67,
    nickname: 'я сдыхал , меня лутали',
    tags: [],
    opendotaUrl: 'https://www.opendota.com/players/910673288' },
  { playerId: 166168942,
    topHeroes: [ [Object], [Object], [Object] ],
    winrate: 53.849999999999994,
    nickname: '.',
    tags: [ 'Losestreak', 'Rusty' ],
    opendotaUrl: 'https://www.opendota.com/players/166168942' },
  { playerId: 166168942,
    topHeroes: [ [Object], [Object], [Object] ],
    winrate: 53.849999999999994,
    nickname: '.',
    tags: [ 'Losestreak', 'Rusty' ],
    opendotaUrl: 'https://www.opendota.com/players/166168942' } ]
```

### PlayerStat

#### data()

returns data about player with given tags.
Tags to be returned:

`Rusty` - have played less than 3 matchmaking games for the period of more than 2 weeks