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
  //var searchURL = 'http://www.google.com';
  //var searchURL = 'https://www.baidu.com/' + req.url;
  //req.pipe(request(url)).pipe(res);
});
app.get('/baidu', function (req, res) {
  console.log('URL:' + req.baseUrl);
  res.sendfile(__dirname + '/baidu.html');
});
app.get('/search', function (req, res) {
  var searchtxt = req.query.search;
  console.log('Search data:' + searchtxt);
  var searchURL = 'http://www.google.com/search?&as_epq=' + searchtxt;
  console.log('Search URL:' + searchURL);
  //req.pipe(request(searchURL)).pipe(res);
  //res.redirect(searchURL);
  var req_red = http.request(searchURL, function(res_red){
     res_red.setEncoding('utf8');
     res_red.on('data', function(data){
       console.log(data);
       res.end(data);
     });
  });  
  console.log('Search URL End');
});
app.get('/baidu_search', function (req, res) {
  var searchtxt = req.query.search;
  console.log('Search data:' + searchtxt);
  var searchURL = 'https://www.baidu.com/s?wd=' + searchtxt;
  console.log('Search URL:' + searchURL);
  
  res.redirect(searchURL);
  console.log('Search URL End');
});


// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});
