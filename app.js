/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();

// serve the files out of ./public as our main files
//app.use(express.static(__dirname + '/public'));
app.get('/', function (req, res) {
  console.log('URL:' + req.baseUrl);
  res.sendfile(__dirname + '/index.html');
});

app.get('/search', function (req, res) {
  var searchtxt = req.query.search;
  console.log('Search data:' + searchtxt);
  var searchURL = 'https://www.baidu.com/s?wd=' + searchtxt;
  res.redirect(searchURL);
});

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});
