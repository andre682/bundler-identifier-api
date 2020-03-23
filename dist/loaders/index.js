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

var _sequelize = _interopRequireDefault(require("./sequelize"));

var _posts = _interopRequireDefault(require("../models/posts"));

var _posts2 = _interopRequireDefault(require("../services/posts"));

// Importing Models & Services
var _default = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref2) {
    var expressApp, logger, sequelizeInstance;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            expressApp = _ref2.expressApp;

            // loader logger
            _bottle["default"].factory('logger', function () {
              return _logger["default"];
            });

            logger = _bottle["default"].container.logger; //load database(

            _context.next = 5;
            return (0, _sequelize["default"])();

          case 5:
            sequelizeInstance = _context.sent;

            _bottle["default"].factory('sequelize', function () {
              return sequelizeInstance;
            }); // Load models
            // Posts


            _bottle["default"].factory('postModel', function (container) {
              return new _posts["default"](container.sequelize);
            }); // Load services
            // Posts


            _bottle["default"].factory('postService', function (container) {
              return new _posts2["default"](container);
            }); //load express


            _context.next = 11;
            return (0, _express["default"])({
              app: expressApp
            });

          case 11:
            logger.info('Express loaded');

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