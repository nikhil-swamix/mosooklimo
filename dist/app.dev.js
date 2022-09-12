"use strict";

var _airport = _interopRequireDefault(require("./server/api/routes/airport.js"));

var _axios = _interopRequireDefault(require("axios"));

var _blog = _interopRequireDefault(require("./server/api/routes/blog.js"));

var _chauffeur = _interopRequireDefault(require("./server/api/routes/chauffeur.js"));

require("./server/database/connectDB.js");

var _cors = _interopRequireDefault(require("cors"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _enquiry = _interopRequireDefault(require("./server/api/routes/enquiry.js"));

var _express = _interopRequireDefault(require("express"));

var _order = _interopRequireDefault(require("./server/api/routes/order.js"));

var _orderRental = _interopRequireDefault(require("./server/api/routes/orderRental.js"));

var _path = _interopRequireDefault(require("path"));

var _static = _interopRequireDefault(require("./server/api/routes/static.js"));

var _upload = _interopRequireDefault(require("./server/api/routes/upload.js"));

var _admin = _interopRequireDefault(require("./server/api/routes/admin.js"));

var _error = require("./server/util/error.js");

var _expressFileupload = _interopRequireDefault(require("express-fileupload"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import uploadRoutes from "./routes/uploadRoutes.js";
_dotenv["default"].config();

var app = (0, _express["default"])();

var _dirname = _path["default"].resolve();

app.use(_express["default"].json());
app.use((0, _cors["default"])());
app.get("/api/directions/:p1/:p2", function (req, res) {
  var _req$params = req.params,
      p1 = _req$params.p1,
      p2 = _req$params.p2;

  _axios["default"].get("https://maps.googleapis.com/maps/api/distancematrix/json?destinations=".concat(p1, "&origins=").concat(p2, "&key=").concat(process.env.GMAP_KEY), {
    "Access-Control-Allow-Origin": "*"
  }).then(function (response) {
    // console.log(response)
    res.json({
      duration: response.data.rows[0].elements[0].duration.text,
      distance: response.data.rows[0].elements[0].distance.text.split(" ")[0]
    });
  })["catch"](function (error) {
    console.log(error);
  }).then(function () {// always executed
  });
});
app.use("/api/users", _admin["default"]);
app.use("/api/chauffeurs", _chauffeur["default"]);
app.use("/api/orders", _order["default"]);
app.use("/api/rental", _orderRental["default"]);
app.use("/api/airports", _airport["default"]);
app.use("/api/data", _static["default"]);
app.use("/api/blogs", _blog["default"]);
app.use("/api/enquiries", _enquiry["default"]);
app.get("/api/config/paypal", function (req, res) {
  res.send(process.env.PAYPAL_CLIENT_ID);
});
app.use("/api/upload", _upload["default"]);
app.use("/uploads", _express["default"]["static"](_path["default"].join(_dirname, "/uploads")));
app.get('/uploadtester', function (req, res) {
  res.sendFile(_dirname + '/tests/uploadform.html');
}); // -----PANELS

app.use('/admin', _express["default"]["static"]('./admin')); // frontend admin static folder

app.use('/driver', _express["default"]["static"]('./driver')); // frontend driver static folder

app.use('/utilities', _express["default"]["static"]('./utilities')); // utilities

app.get('/101fd5534aad34d24acdd10fb99d2523.html', function (req, res) {
  return res.status(200).send('');
}); //verification

var frontend_dir = 'home/';

if (process.env.NODE_ENV == 'dev') {
  console.log('THIS IS DEVELOPMENT SERVER');
  app.get('/api/info', function (req, res) {
    return res.send({
      dburl: process.env.MONGO_URI
    });
  }); // frontend_dir='home-src/public/'
} // -----REACT RESOLVER


app.use(_express["default"]["static"](_path["default"].join(_dirname, frontend_dir)));
app.get('*', function (req, res) {
  return res.sendFile(_path["default"].join(_dirname, frontend_dir + 'index.html'));
}); // Custom Error handling

app.use((0, _expressFileupload["default"])());
app.use(_error.notFound);
app.use(_error.errorHandler);
var PORT = process.env.PORT || 5000;
app.listen(PORT, console.log("Server running in ".concat(process.env.NODE_ENV, " mode on port ").concat(PORT)));
//# sourceMappingURL=app.dev.js.map
