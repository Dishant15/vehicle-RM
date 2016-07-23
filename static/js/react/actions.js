var Datastore = require('nedb');

// db = {};
db = new Datastore({ filename:'password.db', autoload:true });
// db.vehicles = new Datastore({ filename:'vehicles.db', autoload:true });
// db.coupons = new Datastore({ filename:'coupons.db', autoload:true });
// db.prices = new Datastore({ filename:'prices.db', autoload:true });

// db.password.loadDatabase();
// db.vehicles.loadDatabase();
// db.coupons.loadDatabase();
// db.prices.loadDatabase();

export function insertPassHash(input_pass){
	return function(dispatch) {
		dispatch({
			type:"PASS_CHANGED", 
			payload:"newhash"
		});
	}
}

export function logout(level){
	return {
		type: "USER_LOGOUT"
	};
}

export function passwordValidated(level){
	return {
		type: "PASSWORD_VALIDATED",
		payload: level
	};
}

export function passwordUnvalid() {
	return {
		type: "PASSWORD_UNVALID"
	};
}