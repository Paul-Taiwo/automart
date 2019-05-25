'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Route = _express2.default.Router();

Route.get('/', function (req, res) {
  return res.status(200).json({
    status: 'success',
    message: 'Welcome to Automart API'
  });
});

exports.default = Route;
//# sourceMappingURL=index.js.map