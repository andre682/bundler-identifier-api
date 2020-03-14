"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("./express"));

var _bottle = _interopRequireDefault(require("./bottle"));

var _logger = _interopRequireDefault(require("./logger"));

var _mongoose = _interopRequireDefault(require("./mongoose"));

var _bundle = _interopRequireDefault(require("../models/bundle"));

var _bundles = _interopRequireDefault(require("../services/bundles"));

var _default = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref2) {
    var expressApp, logger, mongoConnection;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            expressApp = _ref2.expressApp;

            // loader logger
            _bottle["default"].factory('logger', function () {
              return _logger["default"];
            });

            logger = _bottle["default"].container.logger;
            _context.next = 5;
            return (0, _mongoose["default"])();

          case 5:
            mongoConnection = _context.sent;
            logger.info('DB loaded and connected!'); //load express

            _context.next = 9;
            return (0, _express["default"])({
              app: expressApp
            });

          case 9:
            logger.info('Express loaded'); // Load models

            _bottle["default"].factory('bundlesModel', function () {
              return _bundle["default"];
            }); // Load services


            _bottle["default"].factory('bundlesService', function (container) {
              return new _bundles["default"](container);
            });

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

exports["default"] = _default;