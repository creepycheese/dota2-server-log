# Dota 2 Server Log Parser

Dota 2 server log parser used to retrieve matchmaking stats for players in match

## Install

`npm install --save dota-2-server-log`

## Usage

If you only want to retrieve parsed log data
```javascript
const Dota2ServerLog = require('dota2-server-log').Dota2ServerLog;
const logParser = new Dota2ServerLog();
```