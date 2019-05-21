"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var rp = require('request-promise');

var util = require('util');

var _ = require('lodash');

var OpendotaApi =
/*#__PURE__*/
function () {
  function OpendotaApi(params) {
    _classCallCheck(this, OpendotaApi);

    this.opendotaPlayersUrl = 'https://api.opendota.com/api/players/';

    if (params !== undefined && params.enablelogging !== undefined) {
      this.enableLogging = params.enablelogging;
    } else {
      this.enableLogging = true;
    }
  }

  _createClass(OpendotaApi, [{
    key: "heroes",
    value: function () {
      var _heroes = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(params) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this._loggedRequest(this._constructPlayersRequestUrl(params.playerId, '/heroes', _.assign(params, {
                  significant: 1
                })));

              case 2:
                return _context.abrupt("return", _context.sent);

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function heroes(_x) {
        return _heroes.apply(this, arguments);
      }

      return heroes;
    }()
  }, {
    key: "winLose",
    value: function () {
      var _winLose = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(params) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this._loggedRequest(this._constructPlayersRequestUrl(params.playerId, '/wl', params));

              case 2:
                return _context2.abrupt("return", _context2.sent);

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function winLose(_x2) {
        return _winLose.apply(this, arguments);
      }

      return winLose;
    }()
  }, {
    key: "recentMatches",
    value: function () {
      var _recentMatches = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(params) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this._loggedRequest(this._constructPlayersRequestUrl(params.playerId, '/recentMatches', params));

              case 2:
                return _context3.abrupt("return", _context3.sent);

              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function recentMatches(_x3) {
        return _recentMatches.apply(this, arguments);
      }

      return recentMatches;
    }()
  }, {
    key: "player",
    value: function () {
      var _player = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(id) {
        var url;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                url = util.format('https://api.opendota.com/api/players/' + id);
                _context4.next = 3;
                return this._loggedRequest(url);

              case 3:
                return _context4.abrupt("return", _context4.sent);

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function player(_x4) {
        return _player.apply(this, arguments);
      }

      return player;
    }()
  }, {
    key: "_constructPlayersRequestUrl",
    value: function _constructPlayersRequestUrl(playerId, path, params) {
      var url = new URL(playerId + path, this.opendotaPlayersUrl);
      params = _.omitBy(_.omit(params, ['playerId']), _.isUndefined);

      _.each(params, function (k, v) {
        return url.searchParams.append(v, k);
      });

      return url.href;
    }
  }, {
    key: "_loggedRequest",
    value: function () {
      var _loggedRequest2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(url) {
        var _this = this;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                this.enableLogging && util.log('Requesting: ' + url);
                _context5.next = 3;
                return rp(url, {
                  json: true
                }).then(function (m) {
                  _this.enableLogging && util.log('Success request: ' + url);
                  return m;
                });

              case 3:
                return _context5.abrupt("return", _context5.sent);

              case 4:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function _loggedRequest(_x5) {
        return _loggedRequest2.apply(this, arguments);
      }

      return _loggedRequest;
    }()
  }]);

  return OpendotaApi;
}();

module.exports = OpendotaApi;