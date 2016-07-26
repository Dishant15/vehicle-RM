const initPass = {
	pass_changing: false,
	pass_changed: false,
	superuser_hash: "",
	staffuser_hash: "",
	valide: false,
	level: null
};

export const passReducer = (state=initPass, action) => {
	switch(action.type){
		case "PASSWORD_VALIDATED": {
			return {...state, valide:true, level: action.payload };
		}
		case "PASSWORD_UNVALID": {
			return {...state, valide:false, level: null };
		}
		case "USER_LOGOUT": {
			return {...state, valide:false, level:null};
		}
		case "PASS_REQ_SUCCESS": {
			// got password hashes in the payload
			const superuser_hash = action.payload.superuser_hash;
			const staffuser_hash = action.payload.staffuser_hash;
			return {...state, superuser_hash:superuser_hash, staffuser_hash:staffuser_hash};
		}
		case "PASS_REQ_FAILED": {
			console.log("Some thing went wrong at the server side: ", action.payload);
			return initPass;
		}
		case "PASS_CHANGE_STATE_RESET": {
			return{...state, pass_changing:false, pass_changed:false};
		}
		case "PASSWORD_CHANGED": {
			return{...state, pass_changed:true, pass_changing:false, superuser_hash:action.payload.superuser_hash, staffuser_hash: action.payload.staffuser_hash};
		}
		case "PASSWORD_CHANGING": {
			return{...state, pass_changed:false, pass_changing:true};
		}

		default: {
			return state;
		}
	}
};

export const vehicleReducer = (state=[], action) => {
	switch(action.type){
		case "VEHICLE_ENTRY_CREATED": {
			// some kind of notification?
			state.push(action.payload);
			return state;
		}
		case "VEHICLES_FETCHED": {
			return action.payload;
		}
		case "VEHICLES_FETCH_FAILED": {
			console.log("something with vehicle fetch went wrong on server side:",action.payload);
			return state;
		}
		case "VEHICLE_ENTRY_EDITED": {
			// some kind of notification?
			return action.payload;
		}

		default: {
			return state;
		}
	}
};

export const couponReducer = (state=[], action) => {
	switch(action.type){
		case "COUPON_ADDED": {
			// some kind of notification?
			return state;
		}

		default: {
			return state;
		}
	}
};