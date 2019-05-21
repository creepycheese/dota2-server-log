"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _asyncIterator(iterable) { var method; if (typeof Symbol !== "undefined") { if (Symbol.asyncIterator) { method = iterable[Symbol.asyncIterator]; if (method != null) return method.call(iterable); } if (Symbol.iterator) { method = iterable[Symbol.iterator]; if (method != null) return method.call(iterable); } } throw new TypeError("Object is not async iterable"); }

var fs = require('fs-reverse');

var readline = require('readline');

var Dota2ServerLog =
/*#__PURE__*/
function () {
  function Dota2ServerLog() {
    _classCallCheck(this, Dota2ServerLog);

    this.entryRegex = /[0-9]:\[U:1:([0-9]*)\]/g;
  }

  _createClass(Dota2ServerLog, [{
    key: "parseLogEntry",
    value: function parseLogEntry(entry) {
      var ids = [];
      var steamId = null;

      while (null != (steamId = this.entryRegex.exec(entry))) {
        ids.push(parseInt(steamId[1]));
      }

      return ids.length > 0 ? ids : null;
    }
  }, {
    key: "lastMatchSteamIds",
    value: function () {
      var _lastMatchSteamIds = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(filePath) {
        var fileStream, rlInterface, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _value, line, entry;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                fileStream = fs(filePath);
                rlInterface = readline.createInterface({
                  input: fileStream,
                  crlfDelay: Infinity
                });
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _context.prev = 4;
                _iterator = _asyncIterator(rlInterface);

              case 6:
                _context.next = 8;
                return _iterator.next();

              case 8:
                _step = _context.sent;
                _iteratorNormalCompletion = _step.done;
                _context.next = 12;
                return _step.value;

              case 12:
                _value = _context.sent;

                if (_iteratorNormalCompletion) {
                  _context.next = 21;
                  break;
                }

                line = _value;
                entry = this.parseLogEntry(line);

                if (!(entry && this._isValidGameMode(line))) {
                  _context.next = 18;
                  break;
                }

                return _context.abrupt("return", entry);

              case 18:
                _iteratorNormalCompletion = true;
                _context.next = 6;
                break;

              case 21:
                _context.next = 27;
                break;

              case 23:
                _context.prev = 23;
                _context.t0 = _context["catch"](4);
                _didIteratorError = true;
                _iteratorError = _context.t0;

              case 27:
                _context.prev = 27;
                _context.prev = 28;

                if (!(!_iteratorNormalCompletion && _iterator["return"] != null)) {
                  _context.next = 32;
                  break;
                }

                _context.next = 32;
                return _iterator["return"]();

              case 32:
                _context.prev = 32;

                if (!_didIteratorError) {
                  _context.next = 35;
                  break;
                }

                throw _iteratorError;

              case 35:
                return _context.finish(32);

              case 36:
                return _context.finish(27);

              case 37:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[4, 23, 27, 37], [28,, 32, 36]]);
      }));

      function lastMatchSteamIds(_x) {
        return _lastMatchSteamIds.apply(this, arguments);
      }

      return lastMatchSteamIds;
    }()
  }, {
    key: "_isValidGameMode",
    value: function _isValidGameMode(line) {
      var gameModeString = 'DOTA_GAMEMODE';
      return line.indexOf(gameModeString) > -1;
    }
  }]);

  return Dota2ServerLog;
}();

module.exports = Dota2ServerLog;