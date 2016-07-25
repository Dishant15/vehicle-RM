const initPass = {
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

		default: {
			return state;
		}
	}
};

export const vehicleReducer = (state=[], action) => {
	return state;
};

export const priceReducer = (state=[], action) => {
	return state;
};

export const couponReducer = (state=[], action) => {
	return state;
};