"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = require("express");

var _bottle = _interopRequireDefault(require("../../loaders/bottle"));

var _celebrate = require("celebrate");

var route = (0, _express.Router)();
var bundleIdentifierRegExp = /^[a-z][a-z0-9_]*(\.[a-z0-9_]+)+[0-9a-z_]$/i;

var _default = function _default(app) {
  app.use(route);
  route.get('/print', /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
      var postServiceInstance, allPosts;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              postServiceInstance = _bottle["default"].container.postService;
              _context.next = 3;
              return postServiceInstance.test();

            case 3:
              allPosts = _context.sent;
              console.log('todas postagens', allPosts);
              req.statusCode(200);

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }());
  route.get('/read', (0, _celebrate.celebrate)({
    query: _celebrate.Joi.object({
      bundle_id: _celebrate.Joi.string().regex(bundleIdentifierRegExp).required()
    })
  }), /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
      var bundle_id, logger, bundlesServiceInstance, bundles;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              bundle_id = req.query.bundle_id;
              logger = _bottle["default"].container.logger;
              logger.debug('Calling read service endpoint');
              _context2.prev = 3;
              bundlesServiceInstance = _bottle["default"].container.bundlesService;
              _context2.next = 7;
              return bundlesServiceInstance.readBundleId({
                bundleId: bundle_id
              });

            case 7:
              bundles = _context2.sent;

              if (!bundles) {
                _context2.next = 12;
                break;
              }

              return _context2.abrupt("return", res.status(200).json(bundles));

            case 12:
              return _context2.abrupt("return", res.status(204).json(bundles));

            case 13:
              _context2.next = 19;
              break;

            case 15:
              _context2.prev = 15;
              _context2.t0 = _context2["catch"](3);
              logger.error('error: %o', _context2.t0);
              return _context2.abrupt("return", next(_context2.t0));

            case 19:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[3, 15]]);
    }));

    return function (_x4, _x5, _x6) {
      return _ref2.apply(this, arguments);
    };
  }());
  route.post('/set', (0, _celebrate.celebrate)({
    query: _celebrate.Joi.object({
      bundle_id: _celebrate.Joi.string().regex(bundleIdentifierRegExp).required(),
      new_build_number: _celebrate.Joi.number().min(0)
    })
  }), /*#__PURE__*/function () {
    var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
      var _req$query, bundle_id, new_build_number, logger, bundlesServiceInstance, bundles;

      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _req$query = req.query, bundle_id = _req$query.bundle_id, new_build_number = _req$query.new_build_number;
              logger = _bottle["default"].container.logger;
              logger.debug('Calling set service endpoint');
              _context3.prev = 3;
              bundlesServiceInstance = _bottle["default"].container.bundlesService;
              _context3.next = 7;
              return bundlesServiceInstance.setBuildNumber({
                bundleId: bundle_id,
                newBuildNumber: new_build_number
              });

            case 7:
              bundles = _context3.sent;
              return _context3.abrupt("return", res.status(200).json(bundles));

            case 11:
              _context3.prev = 11;
              _context3.t0 = _context3["catch"](3);
              logger.error('error: %o', _context3.t0);
              return _context3.abrupt("return", next(_context3.t0));

            case 15:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[3, 11]]);
    }));

    return function (_x7, _x8, _x9) {
      return _ref3.apply(this, arguments);
    };
  }());
  route.post('/bump', (0, _celebrate.celebrate)({
    query: _celebrate.Joi.object({
      bundle_id: _celebrate.Joi.string().regex(bundleIdentifierRegExp).required()
    })
  }), /*#__PURE__*/function () {
    var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
      var bundle_id, logger, bundlesServiceInstance, bundles;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              bundle_id = req.query.bundle_id;
              logger = _bottle["default"].container.logger;
              logger.debug('Calling bump service endpoint');
              _context4.prev = 3;
              bundlesServiceInstance = _bottle["default"].container.bundlesService;
              _context4.next = 7;
              return bundlesServiceInstance.bumpBuild({
                bundleId: bundle_id
              });

            case 7:
              bundles = _context4.sent;
              return _context4.abrupt("return", res.status(201).json(bundles));

            case 11:
              _context4.prev = 11;
              _context4.t0 = _context4["catch"](3);
              logger.error('error: %o', _context4.t0);
              return _context4.abrupt("return", next(_context4.t0));

            case 15:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[3, 11]]);
    }));

    return function (_x10, _x11, _x12) {
      return _ref4.apply(this, arguments);
    };
  }());
};

exports["default"] = _default;