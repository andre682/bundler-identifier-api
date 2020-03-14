"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cors = _interopRequireDefault(require("cors"));

var _api = _interopRequireDefault(require("../api"));

var _config = _interopRequireDefault(require("../config"));

var _default = function _default(_ref) {
  var app = _ref.app;
  app.get('/status', function (req, res) {
    res.status(200).end();
  });
  app.head('/status', function (req, res) {
    res.status(200).end();
  });
  app.enable('trust proxy');
  app.use((0, _cors["default"])());
  app.use(require('method-override')());
  app.use(_bodyParser["default"].json());
  app.use(_config["default"].api.prefix, (0, _api["default"])());
  app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err['status'] = 404;
    next(err);
  });
  app.use(function (err, req, res, next) {
    return next(err);
  });
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message
      }
    });
  });
};

exports["default"] = _default;