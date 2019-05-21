"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var util = require('util');

var OpendotaApi = require('./opendotaApi');

var PlayerStat = require('./playerStat');

var GameActivityTag = require('./gameActivityTag');

module.exports = {
  FetchPlayerStat: function () {
    var _FetchPlayerStat = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(playerId, params) {
      var api, playerStatFn, limit, date, tags, recentMatches, winLose, heroes, player, playerStat;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              util.log('Fetching stat for: ' + playerId);
              params = params || {};
              api = params.api || new OpendotaApi();
              playerStatFn = params.statConstructor || PlayerStat;
              limit = params.limit || 20;
              date = params.date;
              tags = params.tags || GameActivityTag.predefinedTags();
              _context2.prev = 7;
              _context2.next = 10;
              return api.recentMatches({
                playerId: playerId,
                limit: limit
              });

            case 10:
              recentMatches = _context2.sent;
              _context2.next = 13;
              return api.winLose({
                playerId: playerId,
                limit: limit
              });

            case 13:
              winLose = _context2.sent;
              _context2.next = 16;
              return api.heroes({
                playerId: playerId,
                limit: limit
              });

            case 16:
              heroes = _context2.sent;
              _context2.next = 19;
              return api.player(playerId);

            case 19:
              player = _context2.sent;
              playerStat = new playerStatFn({
                lose: winLose.lose,
                win: winLose.win,
                player: player,
                recentMatches: recentMatches,
                heroes: heroes
              });
              tags.forEach(
              /*#__PURE__*/
              function () {
                var _ref = _asyncToGenerator(
                /*#__PURE__*/
                regeneratorRuntime.mark(function _callee(tag) {
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          _context.next = 2;
                          return tag.condition(playerStat);

                        case 2:
                          if (!_context.sent) {
                            _context.next = 4;
                            break;
                          }

                          playerStat.addTags(tag);

                        case 4:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee);
                }));

                return function (_x3) {
                  return _ref.apply(this, arguments);
                };
              }());
              if (playerStat.otpHero()) playerStat.addTags(new GameActivityTag(playerStat.otpHero().hero.localized_name + ' OTP'));
              return _context2.abrupt("return", playerStat);

            case 26:
              _context2.prev = 26;
              _context2.t0 = _context2["catch"](7);
              util.log("error fetching playerId: " + playerId);
              return _context2.abrupt("return", {
                playerId: playerId,
                error: _context2.t0
              });

            case 30:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[7, 26]]);
    }));

    function FetchPlayerStat(_x, _x2) {
      return _FetchPlayerStat.apply(this, arguments);
    }

    return FetchPlayerStat;
  }()
};