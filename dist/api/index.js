"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _bundle = _interopRequireDefault(require("./routes/bundle"));

var _default = function _default() {
  var app = (0, _express.Router)();
  (0, _bundle["default"])(app);
  return app;
};

exports["default"] = _default;