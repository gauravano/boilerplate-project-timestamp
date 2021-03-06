var express = require('express');
var app = express();

// enabling CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});
 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/timestamp",(req, res) => {
  res.json({"unix": new Date().getTime(), "utc" : new Date().toUTCString() })
})

app.get("/api/timestamp/:datestring", function(req, res){
  var dating = req.params.datestring;

  var date = new Date(dating);
  console.log(date);
  if(date == "Invalid Date"){
    res.json({"error:": "Invalid Date"});
  }else{
    res.json({"unix": date.getTime(), "utc" : date.toUTCString() })
  } 

})

// listen for requests :)

var port = process.env.PORT || 4000;

var listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});