'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _fancyLog = require('fancy-log');

var _fancyLog2 = _interopRequireDefault(_fancyLog);

var _index = require('./routes/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
// import dotenv from 'dotenv';


app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use((0, _cors2.default)());
app.use((0, _morgan2.default)('dev'));

var PORT = process.env.port || 8080;

app.use('/api/v1/', _index2.default);
app.all('*', function (req, res) {
  return res.status(404).json({
    status: 404,
    error: 'Bad request'
  });
});
app.all('*', function (req, res) {
  return res.status(404).json({
    status: 404,
    error: 'Bad request'
  });
});

app.listen(PORT, function () {
  return _fancyLog2.default.info('Listening at ' + PORT);
});

exports.default = app;
//# sourceMappingURL=app.js.map