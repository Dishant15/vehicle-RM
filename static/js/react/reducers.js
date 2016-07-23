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
			return initPass;
		}
		case "PASS_CHANGED": {
			console.log("password changed");
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