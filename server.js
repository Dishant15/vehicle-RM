var http = require('http');
var dispatcher = require('httpdispatcher');

var Datastore = require('nedb')
  , db = {};


db.password = new Datastore({ filename: 'dYJWOFrUw27', autoload: true });
db.vehicles = new Datastore({ filename: 'ANYoBG0F45D', autoload: true });
db.coupons = new Datastore({ filename: 'j9b36u6AHvkc', autoload: true });

//Lets define a port we want to listen to
const PORT=8015; 

//We need a function which handles requests and send response
function handleRequest(request, response){
      try {
        //log the request on console
        // console.log(request.url);
        //Disptach
        dispatcher.dispatch(request, response);
    } catch(err) {
        console.log(err);
    }
}

//For all your static (js/css/images/etc.) set the directory name (relative path).
// dispatcher.setStatic('static');

// All the password routes bellow----

// BackDoor route to reset password
// dispatcher.onGet("/add-entry", function(req, res) {
// 	db.password.insert({
// 		_id:1,
// 		superuser_hash:"$2a$10$QkcIaxq.quqAOEn4stP1I.7S6sarwaAydhXv9oKcG5FvvPHcmaFWK", 
// 		staffuser_hash:"$2a$10$9YK6TAE8oUTbHM8WvCxew.quNAefYFCtAmFiBpcQ5.iwxAYpJFBd2"
// 		}, function(err, newDoc) {
// 			res.writeHead(200, {'Content-Type': 'text/json'});
// 	    	res.end(JSON.stringify(newDoc));
// 		}
// 	);
// });

dispatcher.onGet("/get-pass", function(req, res) {
	db.password.find({_id:1}, function(err, newDoc) {
		if(err){console.log("error in password fetch :",err);}
		if(newDoc.length){
			res.writeHead(200, {'Content-Type': 'text/json'});
    		res.end(JSON.stringify(newDoc[0]));
		} else {
			// this is first time so no password set
			var default_pass_obj = {
				_id:1,
				superuser_hash:"$2a$10$QkcIaxq.quqAOEn4stP1I.7S6sarwaAydhXv9oKcG5FvvPHcmaFWK", 
				staffuser_hash:"$2a$10$9YK6TAE8oUTbHM8WvCxew.quNAefYFCtAmFiBpcQ5.iwxAYpJFBd2"
			};
			db.password.insert(default_pass_obj);
			res.writeHead(200, {'Content-Type': 'text/json'});
    		res.end(JSON.stringify(default_pass_obj));
		}
		
	});
});


dispatcher.onPost("/change-pass", function(req, res) {
	// get superuser and staffuserhash in req.body post it to database
	var hashData = JSON.parse(req.body);
	if(hashData.level == 1){
		// update superuser hash value
		db.password.update({_id:1}, { $set: {superuser_hash:hashData.hash} }, {returnUpdatedDocs:true}, function(err, numAffected, affectedDocuments) {
				res.writeHead(200, {'Content-Type': 'text/json'});
		    	res.end(JSON.stringify(affectedDocuments));
			}
		);
	} else {
		// update staffuser hash value
		db.password.update({_id:1}, { $set: {staffuser_hash:hashData.hash} }, {returnUpdatedDocs:true}, function(err, numAffected, affectedDocuments) {
				res.writeHead(200, {'Content-Type': 'text/json'});
		    	res.end(JSON.stringify(affectedDocuments));
			}
		);
	}
	
});

//All the vehicle routes bellow ----

dispatcher.onPost("/add-vehicle", function(req, res) {
	db.vehicles.insert(JSON.parse(req.body), function(err, newDoc) {
			res.writeHead(200, {'Content-Type': 'text/json'});
	    	res.end(JSON.stringify(newDoc));
	    }
	);
});

dispatcher.onGet("/get-vehicles", function(req, res) {
	db.vehicles.find({}, function(err, newDoc) {
		if(err){console.log("error in password fetch :",err);}
		res.writeHead(200, {'Content-Type': 'text/json'});
    	res.end(JSON.stringify(newDoc));
	});
})

dispatcher.onPost("/edit-vehicle", function(req, res) {
	// update existing doc and return whole new list of docs
	var data = JSON.parse(req.body);
	db.vehicles.update({_id:data._id}, data, {}, function(e, d) {
		db.vehicles.find({}, function(err, newDoc) {
			if(err){console.log("error in password fetch :",err);}
			res.writeHead(200, {'Content-Type': 'text/json'});
	    	res.end(JSON.stringify(newDoc));
		});
	});
})

//All Coupon routes bellow ----

dispatcher.onPost("/add-coupon", function(req, res) {
	db.coupons.insert(JSON.parse(req.body), function(err, newDoc) {
			res.writeHead(200, {'Content-Type': 'text/json'});
	    	res.end(JSON.stringify(newDoc));
	    }
	);
});

dispatcher.onGet("/get-all-coupon", function(req, res) {
	db.coupons.find({}, function(err, newDoc) {
			if(err){console.log("error in password fetch :",err);}
			res.writeHead(200, {'Content-Type': 'text/json'});
	    	res.end(JSON.stringify(newDoc));
	    }
	);
});

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening.
    // run electron app
    var app = require('./main.js');
});