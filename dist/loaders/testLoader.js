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

var _bundle = _interopRequireDefault(require("../models/bundle"));

var _bundles = _interopRequireDefault(require("../services/bundles"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _mongodbMemoryServer = require("mongodb-memory-server");

var mongod = new _mongodbMemoryServer.MongoMemoryServer();
/**
 * Connect to the in-memory database.
 */

var connect = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var uri, mongooseOpts, connection;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return mongod.getConnectionString();

          case 2:
            uri = _context.sent;
            mongooseOpts = {
              useNewUrlParser: true,
              autoReconnect: true,
              reconnectTries: Number.MAX_VALUE,
              reconnectInterval: 1000
            };
            _context.next = 6;
            return _mongoose["default"].connect(uri, mongooseOpts);

          case 6:
            connection = _context.sent;
            return _context.abrupt("return", connection.connection.db);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function connect() {
    return _ref.apply(this, arguments);
  };
}();

var closeDatabase = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _mongoose["default"].connection.dropDatabase();

          case 2:
            _context2.next = 4;
            return _mongoose["default"].connection.close();

          case 4:
            _context2.next = 6;
            return mongod.stop();

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function closeDatabase() {
    return _ref2.apply(this, arguments);
  };
}();

var clearDatabase = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
    var collections, key, collection;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            collections = _mongoose["default"].connection.collections;
            _context3.t0 = _regenerator["default"].keys(collections);

          case 2:
            if ((_context3.t1 = _context3.t0()).done) {
              _context3.next = 9;
              break;
            }

            key = _context3.t1.value;
            collection = collections[key];
            _context3.next = 7;
            return collection.deleteMany();

          case 7:
            _context3.next = 2;
            break;

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function clearDatabase() {
    return _ref3.apply(this, arguments);
  };
}();

var _default = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(_ref5) {
    var expressApp, logger, mongoConnection;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            expressApp = _ref5.expressApp;

            // loader logger
            _bottle["default"].factory('logger', function () {
              return _logger["default"];
            });

            logger = _bottle["default"].container.logger;
            _context4.next = 5;
            return connect();

          case 5:
            mongoConnection = _context4.sent;
            logger.info('DB loaded and connected!'); //load express

            _context4.next = 9;
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
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function (_x) {
    return _ref4.apply(this, arguments);
  };
}();

exports["default"] = _default;