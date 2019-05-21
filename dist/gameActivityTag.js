"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var OpendotaApi = require('./opendotaApi');

var heroes = require('./helpers/heroes');

var _ = require('lodash');

var GameActivityTag =
/*#__PURE__*/
function () {
  function GameActivityTag(name, condition) {
    _classCallCheck(this, GameActivityTag);

    this.name = name;
    this.condition = condition;
  }

  _createClass(GameActivityTag, [{
    key: "isSatisfied",
    value: function isSatisfied(playerStat) {
      return this.condition(playerStat);
    }
  }], [{
    key: "getTopHeroTagById",
    value: function getTopHeroTagById(id) {
      var foundTag = _.find(this.heroesTags(), function (tag) {
        return tag.hero.id == id;
      });

      return foundTag ? foundTag.tag : null;
    }
  }, {
    key: "heroesTags",
    value: function heroesTags() {
      return _.map(heroes, function (hero) {
        return {
          hero: hero,
          tag: new GameActivityTag('Zeus OTP', function (p) {
            var otpHero = _.find(p.heroes, function (h) {
              return h.games / p.recentMatches.length >= 0.8;
            });

            return otpHero ? true : false;
          })
        };
      });
    }
  }, {
    key: "predefinedTags",
    value: function predefinedTags() {
      return [new GameActivityTag('Smurf', function (p) {
        return p.winrate >= 85;
      }), new GameActivityTag('Winstreak', function (p) {
        return p.hasWinstreak(3);
      }), new GameActivityTag('Losestreak', function (p) {
        return p.hasLosestreak(3);
      }), new GameActivityTag('Rusty',
      /*#__PURE__*/
      function () {
        var _ref = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee(p) {
          var api, winLose, result;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  api = new OpendotaApi();
                  _context.next = 3;
                  return api.winLose({
                    date: 14,
                    playerId: p.player.profile.account_id
                  });

                case 3:
                  winLose = _context.sent;
                  result = winLose.win + winLose.lose <= 3;
                  return _context.abrupt("return", result);

                case 6:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }())];
    }
  }, {
    key: "getPredefinedTag",
    value: function getPredefinedTag(name) {
      return GameActivityTag.predefinedTags().find(function (p) {
        return p.name == name;
      });
    }
  }]);

  return GameActivityTag;
}();

module.exports = GameActivityTag;