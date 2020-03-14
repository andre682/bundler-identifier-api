"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var envFound = _dotenv["default"].config();

if (!envFound) {
  // This error should crash whole process
  throw new Error("Couldn't find .env file");
}

var _default = {
  /**
   * Server port
   */
  port: parseInt(process.env.PORT, 10),

  /**
   * API configs
   */
  api: {
    prefix: '/api'
  },

  /**
   * MongoDB string
   */
  databaseURL: process.env.MONGODB_URI,

  /**
   * winston logger level
   */
  logs: {
    level: process.env.LOG_LEVEL || 'silly'
  }
};
exports["default"] = _default;