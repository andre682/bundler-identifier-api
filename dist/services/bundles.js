"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var BundlesService = /*#__PURE__*/function () {
  function BundlesService(container) {
    (0, _classCallCheck2["default"])(this, BundlesService);
    this.bundlesModel = container.bundlesModel;
    this.logger = container.logger;
  }

  (0, _createClass2["default"])(BundlesService, [{
    key: "readBundleId",
    value: function () {
      var _readBundleId = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref) {
        var bundleId, bundleRecord;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                bundleId = _ref.bundleId;
                this.logger.silly("Reading Bundle Id: ".concat(bundleId));
                _context.prev = 2;
                _context.next = 5;
                return this.bundlesModel.findOne({
                  bundleId: {
                    $regex: new RegExp("^".concat(bundleId.toLowerCase(), "$"), 'i')
                  }
                });

              case 5:
                bundleRecord = _context.sent;
                return _context.abrupt("return", bundleRecord);

              case 9:
                _context.prev = 9;
                _context.t0 = _context["catch"](2);
                this.logger.error(_context.t0);
                throw _context.t0;

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[2, 9]]);
      }));

      function readBundleId(_x) {
        return _readBundleId.apply(this, arguments);
      }

      return readBundleId;
    }()
  }, {
    key: "setBuildNumber",
    value: function () {
      var _setBuildNumber = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(_ref2) {
        var bundleId, newBuildNumber, bundleRecord;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                bundleId = _ref2.bundleId, newBuildNumber = _ref2.newBuildNumber;
                this.logger.silly("Looking for bundle (".concat(bundleId, ")"));
                _context2.prev = 2;
                _context2.next = 5;
                return this.bundlesModel.findOne({
                  bundleId: {
                    $regex: new RegExp("^".concat(bundleId.toLowerCase(), "$"), 'i')
                  }
                });

              case 5:
                bundleRecord = _context2.sent;

                if (bundleRecord) {
                  _context2.next = 12;
                  break;
                }

                _context2.next = 9;
                return this.initBundle({
                  bundleId: bundleId,
                  buildNumber: newBuildNumber
                });

              case 9:
                bundleRecord = _context2.sent;
                _context2.next = 17;
                break;

              case 12:
                if (!(newBuildNumber > bundleRecord.buildNumber)) {
                  _context2.next = 17;
                  break;
                }

                bundleRecord.buildNumber = newBuildNumber;
                _context2.next = 16;
                return bundleRecord.save();

              case 16:
                bundleRecord = _context2.sent;

              case 17:
                return _context2.abrupt("return", bundleRecord);

              case 20:
                _context2.prev = 20;
                _context2.t0 = _context2["catch"](2);
                this.logger.error(_context2.t0);
                throw _context2.t0;

              case 24:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[2, 20]]);
      }));

      function setBuildNumber(_x2) {
        return _setBuildNumber.apply(this, arguments);
      }

      return setBuildNumber;
    }()
  }, {
    key: "initBundle",
    value: function () {
      var _initBundle = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(_ref3) {
        var bundleId, _ref3$buildNumber, buildNumber, bundleRecord;

        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                bundleId = _ref3.bundleId, _ref3$buildNumber = _ref3.buildNumber, buildNumber = _ref3$buildNumber === void 0 ? 0 : _ref3$buildNumber;
                this.logger.silly("Creating new Bundle Identifier: (".concat(bundleId, ")"));
                _context3.prev = 2;
                _context3.next = 5;
                return this.bundlesModel.create({
                  bundleId: bundleId,
                  buildNumber: buildNumber
                });

              case 5:
                bundleRecord = _context3.sent;
                return _context3.abrupt("return", bundleRecord);

              case 9:
                _context3.prev = 9;
                _context3.t0 = _context3["catch"](2);
                this.logger.error(_context3.t0);
                throw _context3.t0;

              case 13:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[2, 9]]);
      }));

      function initBundle(_x3) {
        return _initBundle.apply(this, arguments);
      }

      return initBundle;
    }()
  }, {
    key: "bumpBuild",
    value: function () {
      var _bumpBuild = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(_ref4) {
        var bundleId, bundleRecord;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                bundleId = _ref4.bundleId;
                this.logger.silly("bumping next (".concat(bundleId, ")"));
                _context4.prev = 2;
                _context4.next = 5;
                return this.bundlesModel.findOne({
                  bundleId: {
                    $regex: new RegExp("^".concat(bundleId.toLowerCase(), "$"), 'i')
                  }
                });

              case 5:
                bundleRecord = _context4.sent;

                if (bundleRecord) {
                  _context4.next = 12;
                  break;
                }

                _context4.next = 9;
                return this.initBundle({
                  bundleId: bundleId
                });

              case 9:
                bundleRecord = _context4.sent;
                _context4.next = 16;
                break;

              case 12:
                bundleRecord.buildNumber++;
                _context4.next = 15;
                return bundleRecord.save();

              case 15:
                bundleRecord = _context4.sent;

              case 16:
                return _context4.abrupt("return", bundleRecord);

              case 19:
                _context4.prev = 19;
                _context4.t0 = _context4["catch"](2);
                this.logger.error(_context4.t0);
                throw _context4.t0;

              case 23:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[2, 19]]);
      }));

      function bumpBuild(_x4) {
        return _bumpBuild.apply(this, arguments);
      }

      return bumpBuild;
    }()
  }]);
  return BundlesService;
}();

exports["default"] = BundlesService;