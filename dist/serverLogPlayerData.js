"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Dota2ServerLog = require('./dota2ServerLog');

var FetchPlayerStat = require('./fetchPlayerStat').FetchPlayerStat;

var util = require('util');

module.exports =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(logPath) {
    var fetcher,
        logParser,
        ids,
        allData,
        _args2 = arguments;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            fetcher = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : FetchPlayerStat;
            logParser = new Dota2ServerLog();
            _context2.next = 4;
            return logParser.lastMatchSteamIds(logPath);

          case 4:
            ids = _context2.sent;
            util.log('Fetching data for playerIds: [%s]', ids);
            allData = _.map(ids,
            /*#__PURE__*/
            function () {
              var _ref2 = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee(id) {
                var result;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.prev = 0;
                        util.log('Fetching statistics for playerId: %s', id);
                        _context.next = 4;
                        return fetcher(id);

                      case 4:
                        result = _context.sent;
                        util.log('SUCCESS Fetching statistics for playerId: %s', id);
                        return _context.abrupt("return", result);

                      case 9:
                        _context.prev = 9;
                        _context.t0 = _context["catch"](0);
                        util.log('FAILED to fetch statistics for playerId: %s\n Error: %s', id, _context.t0);
                        return _context.abrupt("return", {
                          error: _context.t0
                        });

                      case 13:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee, null, [[0, 9]]);
              }));

              return function (_x2) {
                return _ref2.apply(this, arguments);
              };
            }());
            return _context2.abrupt("return", allData);

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();