"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _config = _interopRequireDefault(require("./config"));

var _express = _interopRequireDefault(require("express"));

var _logger = _interopRequireDefault(require("./loaders/logger"));

function startServer() {
  return _startServer.apply(this, arguments);
}

function _startServer() {
  _startServer = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var app;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            app = (0, _express["default"])();
            _context.next = 3;
            return require('./loaders')["default"]({
              expressApp: app
            });

          case 3:
            app.listen(_config["default"].port, function (err) {
              if (err) {
                _logger["default"].error(err);

                process.exit(1);
                return;
              }

              _logger["default"].info("Server listening on port: ".concat(_config["default"].port));
            });

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _startServer.apply(this, arguments);
}

startServer();