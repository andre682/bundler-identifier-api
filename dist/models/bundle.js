"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var Bundle = new _mongoose["default"].Schema({
  buildNumber: {
    type: Number,
    required: [true, 'Please enter the build number']
  },
  bundleId: {
    type: String,
    required: [true, 'Please enter bundle identifier'],
    unique: true
  }
}, {
  timestamps: true
});

var _default = _mongoose["default"].model('Bundle', Bundle);

exports["default"] = _default;