"use strict";

require("@babel/polyfill")
var OpendotaApi = require('./dist/opendotaApi');

var Dota2ServerLog = require('./dist/dota2ServerLog');

var FetchPlayerStat = require('./dist/fetchPlayerStat').FetchPlayerStat;

var ServerLogPlayerData = require('./dist/serverLogPlayerData.js');

module.exports = {
  OpendotaApi: OpendotaApi,
  Dota2ServerLog: Dota2ServerLog,
  FetchPlayerStat: FetchPlayerStat,
  ServerLogPlayerData: ServerLogPlayerData
};
