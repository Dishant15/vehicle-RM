var http = require('http');
var dispatcher = require('httpdispatcher');

var Datastore = require('nedb')
  , db = new Datastore({ filename: 'pass.db', autoload: true });

//Lets define a port we want to listen to
const PORT=8080; 

//We need a function which handles requests and send response
function handleRequest(request, response){
      try {
        //log the request on console
        console.log(request.url);
        //Disptach
        dispatcher.dispatch(request, response);
    } catch(err) {
        console.log(err);
    }
}

//For all your static (js/css/images/etc.) set the directory name (relative path).
// dispatcher.setStatic('static');

dispatcher.onGet("/add-entry", function(req, res) {
	db.insert({
		_id:1,
		superuser_hash:"$2a$10$c5F2f/dYJWOFrUw27MKk1Olcd8j9b36u6AHvkcacH4FnJsT3l0RIO", 
		staffuser_hash:"$2a$10$cROLpIwfpQ.ANYoBG0F.UO3D5kbCjCbKNyDJR6iNIJLEd92CIrG7e"
		}, function(err, newDoc) {
			res.writeHead(200, {'Content-Type': 'text/json'});
	    	res.end(JSON.stringify(newDoc));
		}
	);
});

dispatcher.onGet("/get-pass", function(req, res) {
	db.findOne({_id:1}, function(err, newDoc) {
		if(err){console.log("error in password fetch :",err);}
		res.writeHead(200, {'Content-Type': 'text/json'});
    	res.end(JSON.stringify(newDoc));
	});
});


dispatcher.onPost("/change-pass", function(req, res) {
	// get superuser and staffuserhash in req.body post it to database
	var hashData = JSON.parse(req.body);
	if(hashData.level == 1){
		db.update({_id:1}, { $set: {superuser_hash:hashData.hash} }, {returnUpdatedDocs:true}, function(err, numAffected, affectedDocuments) {
				res.writeHead(200, {'Content-Type': 'text/json'});
		    	res.end(JSON.stringify(affectedDocuments));
			}
		);
	} else {
		db.update({_id:1}, { $set: {staffuser_hash:hashData.hash} }, {returnUpdatedDocs:true}, function(err, numAffected, affectedDocuments) {
				res.writeHead(200, {'Content-Type': 'text/json'});
		    	res.end(JSON.stringify(affectedDocuments));
			}
		);
	}
	
});

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening.
    // run electron app
    var app = require('./main.js');
});